import Anthropic from '@anthropic-ai/sdk';
import type {
  MessageCreateParams,
  Message,
  ContentBlock,
} from '@anthropic-ai/sdk/resources/messages';
import { AIModel } from './ai.factory';

export class AnthropicService implements AIModel {
  private client: Anthropic;
  private model: string;

  constructor(apiKey: string, model = 'claude-3-5-sonnet-latest') {
    this.client = new Anthropic({ apiKey });
    this.model = model;
  }

  async generate(prompt: string): Promise<string> {
    try {
      const params: MessageCreateParams = {
        model: this.model,
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      };

      const response: Message = await this.client.messages.create(params);

      if (Array.isArray(response.content)) {
        // Filtrar sólo los bloques de tipo texto (‘text’) según la tipología oficial
        const textBlocks = response.content.filter(
          (block): block is ContentBlock & { text: string } => block.type === 'text',
        );

        return textBlocks.map((block) => block.text).join('\n');
      }

      // Si content no es array, podría tratarse como string o algún otro tipo
      if (typeof response.content === 'string') {
        return response.content;
      }

      // En caso inesperado, devolvemos cadena vacía
      return '';
    } catch (err: unknown) {
      console.error('Error en AnthropicService.generate:', err);
      const message = err instanceof Error ? err.message : 'Unknown error';
      throw new Error(`Error al generar texto con Anthropic: ${message}`);
    }
  }
}
