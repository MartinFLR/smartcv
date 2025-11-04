import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { AIModel } from './ai.factory.js';

export class GeminiService implements AIModel {
  private model: GenerativeModel;

  constructor(
    private apiKey: string,
    private geminiModel: string = 'gemini-2.0-flash'
  ) {
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: this.geminiModel });
  }

  async generate(prompt: string): Promise<string> {
    const result = await this.model.generateContent(prompt);
    return result.response.text();
  }

  async *generateStream(prompt: string): AsyncGenerator<string> {
    const result = await this.model.generateContentStream(prompt);

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) yield text;
    }
  }
}
