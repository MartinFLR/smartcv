import Anthropic from '@anthropic-ai/sdk';
import { AIModel } from './ai.factory';

export class AnthropicService implements AIModel {
  private client: Anthropic;
  private model: string;

  constructor(apiKey: string, model: string = 'claude-3-5-sonnet-latest') {
    this.client = new Anthropic({ apiKey });
    this.model = model;
  }

  async generate(prompt: string): Promise<string> {
    try {
      const response = await this.client.messages.create({
        model: this.model,
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      });

      // normalizar la salida a string
      if (Array.isArray(response.content)) {
        // solo extraemos los bloques tipo "output_text"
        return response.content
          .filter((block: any) => block.type === 'output_text')
          .map((block: any) => block.text || block.content || '')
          .join('\n');
      }

      return typeof response.content === 'string'
        ? response.content
        : '';
    } catch (err: any) {
      console.error('Error en AnthropicService.generate:', err);
      throw new Error('Error al generar texto con Anthropic');
    }
  }
}
