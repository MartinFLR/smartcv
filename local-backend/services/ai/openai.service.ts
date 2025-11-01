// En lugar de importar CreateChatCompletionRequest:
import OpenAI from 'openai';
import {AIModel} from './ai.factory';

export class OpenAIService implements AIModel {
  private client: OpenAI;
  private model: string;

  constructor(apiKey: string, model: string = 'gpt-3.5‑turbo') {
    this.client = new OpenAI({ apiKey });
    this.model = model;
  }

  async generate(prompt: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        { role: 'user', content: prompt }
      ],
    });

    return response.choices[0]?.message?.content || '';
  }
}
