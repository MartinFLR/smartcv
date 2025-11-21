import OpenAI from 'openai';
import { AIModel } from './ai.factory';
import type {
  ChatCompletionSystemMessageParam,
  ChatCompletionUserMessageParam,
} from 'openai/resources/chat/completions';

export class OpenAIService implements AIModel {
  private client: OpenAI;
  private model: string;
  private systemPrompt: string;

  constructor(apiKey: string, model = 'gpt-3.5-turbo', systemPrompt = '') {
    this.client = new OpenAI({ apiKey });
    this.model = model;
    this.systemPrompt = systemPrompt;
  }

  async generate(userPrompt: string): Promise<string> {
    const messages: (ChatCompletionSystemMessageParam | ChatCompletionUserMessageParam)[] = [
      { role: 'system', content: this.systemPrompt } as const,
      { role: 'user', content: userPrompt } as const,
    ];

    const response = await this.client.chat.completions.create({
      model: this.model,
      messages,
    });

    return response.choices[0]?.message?.content ?? '';
  }

  async *generateStream(userPrompt: string): AsyncGenerator<string> {
    const messages: (ChatCompletionSystemMessageParam | ChatCompletionUserMessageParam)[] = [
      { role: 'system', content: this.systemPrompt } as const,
      { role: 'user', content: userPrompt } as const,
    ];

    const stream = await this.client.chat.completions.create({
      model: this.model,
      messages,
      stream: true,
    });

    for await (const chunk of stream) {
      const delta = chunk.choices?.[0]?.delta?.content;
      if (delta) yield delta;
    }
  }
}
