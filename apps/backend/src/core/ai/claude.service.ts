import Anthropic from '@anthropic-ai/sdk';
import type {
  MessageCreateParams,
  Message,
  ContentBlock,
} from '@anthropic-ai/sdk/resources/messages';
import { AIModel } from './ai.factory';

export class ClaudeService implements AIModel {
  private client: Anthropic;
  private model: string;

  constructor(apiKey: string, model = 'claude-3-5-sonnet-latest') {
    this.client = new Anthropic({ apiKey });
    this.model = model;
  }

  /**
   * 🔹 Genera una respuesta completa (modo estándar)
   */
  async generate(prompt: string): Promise<string> {
    try {
      const params: MessageCreateParams = {
        model: this.model,
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      };

      const response: Message = await this.client.messages.create(params);

      if (Array.isArray(response.content)) {
        const textBlocks = response.content.filter(
          (block): block is ContentBlock & { text: string } => block.type === 'text',
        );

        return textBlocks.map((block) => block.text).join('');
      }

      if (typeof response.content === 'string') {
        return response.content;
      }

      return JSON.stringify(response.content);
    } catch (err: unknown) {
      console.error('❌ Error en ClaudeService.generate:', err);
      const message = err instanceof Error ? err.message : 'Unknown error';
      throw new Error(`Error al generar texto con Claude: ${message}`);
    }
  }

  /**
   * 🔹 Genera respuesta progresiva (modo streaming)
   */
  async *generateStream(prompt: string): AsyncGenerator<string> {
    try {
      const stream = await this.client.messages.stream({
        model: this.model,
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      });

      for await (const event of stream) {
        // Tipado correcto según SDK (MessageStreamEvent)
        if (
          event.type === 'content_block_delta' &&
          'delta' in event &&
          event.delta?.type === 'text_delta' &&
          event.delta.text
        ) {
          yield event.delta.text;
        }
      }
    } catch (err: unknown) {
      console.error('❌ Error en ClaudeService.generateStream:', err);
      const message = err instanceof Error ? err.message : 'Unknown error';
      throw new Error(`Error al generar texto en streaming con Claude: ${message}`);
    }
  }
}
