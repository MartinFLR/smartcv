import { GeminiService } from './gemini.service';
import { OpenAIService } from './openai.service';
import { ClaudeService } from './claude.service';
import { MistralService } from './mistral.service';
import { config } from '../../config/env';
import { logger } from '../logger';
import { AiSettings } from '@smartcv/types';
import { AI_MODELS_DATA } from '@smartcv/shared';

export interface AIModel {
  generate(prompt: string): Promise<string>;
  generateStream?(prompt: string): AsyncGenerator<string>;
}

type AIServiceConstructor = new (apiKey: string, version: string, systemPrompt: string) => AIModel;

type ProviderKey = keyof typeof AI_MODELS_DATA;

const PROVIDER_SERVICES: Record<ProviderKey, AIServiceConstructor> = {
  google: GeminiService,
  openai: OpenAIService,
  anthropic: ClaudeService,
  groq: MistralService,
};

const PROVIDER_API_KEYS: Record<ProviderKey, keyof typeof config> = {
  google: 'geminiApiKey',
  openai: 'openaiApiKey',
  anthropic: 'claudeApiKey',
  groq: 'mistralApiKey',
};

export class AIFactory {
  static create(options: AiSettings): AIModel {
    const provider = (options.modelProvider || 'google').toLowerCase() as ProviderKey;
    const version = options.modelVersion;
    const systemPrompt = options.systemPrompt || '';

    logger.info(`AIFactory create → provider=${provider}, version=${version}`);

    if (!AI_MODELS_DATA[provider]) {
      throw new Error(`Proveedor de IA no soportado: ${provider}`);
    }

    if (!AI_MODELS_DATA[provider].includes(version!)) {
      throw new Error(
        `El modelo "${version}" no existe para el proveedor "${provider}". Modelos válidos: ${AI_MODELS_DATA[provider].join(', ')}`,
      );
    }

    const ServiceClass = PROVIDER_SERVICES[provider];
    const apiKeyField = PROVIDER_API_KEYS[provider];
    const apiKey = config[apiKeyField];

    if (!apiKey) {
      throw new Error(`${apiKeyField.toUpperCase()} no configurada`);
    }

    return new ServiceClass(String(apiKey), String(version), systemPrompt);
  }
}
