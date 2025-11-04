import Anthropic from '@anthropic-ai/sdk';
import {
  ContentBlock,
  Message, Messages,
} from '@anthropic-ai/sdk/resources/messages';
import { AIModel } from './ai.factory';

export class ClaudeService implements AIModel {
  private client: Anthropic;
  private model: string;

  constructor(apiKey: string, model: string = 'claude-3-5-sonnet-latest') {
    this.client = new Anthropic({ apiKey });
    this.model = model;
  }

  /**
   * Modo estándar: genera toda la respuesta completa.
   */
  async generate(prompt: string): Promise<string> {
    try {
      const response: Messages.Message = await this.client.messages.create({
        model: this.model,
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      });

      // Filtramos sólo los bloques de texto
      if (Array.isArray(response.content)) {
        const textBlocks = response.content.filter(
          (block: ContentBlock): block is ContentBlock & { type: 'text'; text: string } =>
            block.type === 'text'
        );
        return textBlocks.map(block => block.text).join('');
      }

      return typeof response.content === 'string'
        ? response.content
        : JSON.stringify(response.content);
    } catch (error) {
      console.error('❌ Error en ClaudeService.generate:', error);
      throw new Error('Error al generar texto con Claude');
    }
  }

  /**
   * Modo streaming: devuelve chunks de texto progresivamente.
   */
  async *generateStream(prompt: string): AsyncGenerator<string> {
    try {
      // Creamos el stream de respuesta
      const stream = await this.client.messages.stream({
        model: this.model,
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      });

      // Recorremos los eventos emitidos en tiempo real
      for await (const event of stream) {
        if (event.type === 'content_block_delta' && 'text' in event.delta && event.delta?.text) {
          if ('text' in event.delta) {
            yield event.delta.text;
          }
        }
      }
    } catch (error) {
      console.error('❌ Error en ClaudeService.generateStream:', error);
      throw new Error('Error al generar texto en streaming con Claude');
    }
  }
}
