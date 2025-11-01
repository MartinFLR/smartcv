import { GeminiService } from './gemini.service';
import { OpenAIService } from './openai.service';
import { ClaudeService } from './claude.service';
import { AnthropicService } from './anthropic.service';
import { MistralService } from './mistral.service';
import { config } from '../../config/env';

export interface AIModel {
  generate(prompt: string): Promise<string>;
}

export interface ModelOptions {
  provider: string;
  version?: string;
}

export class AIFactory {
  static create(options: ModelOptions): AIModel {
    const provider = (options.provider || 'gemini').toLowerCase();
    const version = options.version;

    switch (provider) {
      case 'gemini':
        if (!config.geminiApiKey) throw new Error('GEMINI_API_KEY no configurada');
        return new GeminiService(config.geminiApiKey, version);
      case 'openai':
        if (!config.openaiApiKey) throw new Error('OPENAI_API_KEY no configurada');
        return new OpenAIService(config.openaiApiKey, version);
      case 'claude':
        if (!config.claudeApiKey) throw new Error('CLAUDE_API_KEY no configurada');
        return new ClaudeService(config.claudeApiKey, version);
      case 'anthropic':
        if (!config.anthropicApiKey) throw new Error('ANTHROPIC_API_KEY no configurada');
        return new AnthropicService(config.anthropicApiKey, version);
      case 'mistral':
        if (!config.mistralApiKey) throw new Error('MISTRAL_API_KEY no configurada');
        return new MistralService(version);
      default:
        throw new Error(`Proveedor de IA no soportado: ${provider}`);
    }
  }
}
