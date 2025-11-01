import Anthropic from '@anthropic-ai/sdk';
import { AIModel } from './ai.factory';

export class ClaudeService implements AIModel {
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
        messages: [
          { role: 'user', content: prompt }
        ],
      });

      if (Array.isArray(response.content)) {
        return response.content
          .map((block: any) => block.text)
          .join('\n');
      }

      return response.content; // fallback si ya es string
    } catch (error: any) {
      console.error('Error en ClaudeService.generate:', error);
      throw new Error('Error al generar texto con Claude');
    }
  }

}
