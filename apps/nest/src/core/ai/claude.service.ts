import Anthropic from '@anthropic-ai/sdk';
import { AIModel } from './ai.factory';
import type { MessageCreateParams, Message, TextBlock } from '@anthropic-ai/sdk/resources/messages';

export class ClaudeService implements AIModel {
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

      // Manejo estricto del contenido
      if (Array.isArray(response.content)) {
        const textBlocks = response.content.filter(
          (block): block is TextBlock => block.type === 'text',
        );
        return textBlocks.map((block) => block.text).join('');
      }

      // Fallback por si en el futuro cambia la API, aunque hoy siempre devuelve array
      if (typeof response.content === 'string') {
        return response.content;
      }

      return JSON.stringify(response.content);
    } catch (err: unknown) {
      console.error('❌ Error in ClaudeService.generate:', err);
      const message = err instanceof Error ? err.message : 'Unknown error';
      throw new Error(`Error generating text with Claude: ${message}`);
    }
  }

  async *generateStream(prompt: string): AsyncGenerator<string> {
    try {
      const stream = await this.client.messages.stream({
        model: this.model,
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      });

      // Iteramos sobre los eventos tipados del stream
      for await (const event of stream) {
        // TypeScript sabe que 'event' es un MessageStreamEvent
        // Usamos el discriminador 'type' para filtrar
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
          // Acá TS ya sabe con 100% de certeza que .text existe
          yield event.delta.text;
        }
      }
    } catch (err: unknown) {
      console.error('❌ Error in ClaudeService.generateStream:', err);
      const message = err instanceof Error ? err.message : 'Unknown error';
      throw new Error(`Error generating streaming text with Claude: ${message}`);
    }
  }
}
