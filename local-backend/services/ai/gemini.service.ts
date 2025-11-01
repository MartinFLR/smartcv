import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIModel } from './ai.factory';

export class GeminiService implements AIModel {
  private model;

  constructor(private apiKey: string, private geminiModel: string = 'gemini-2.5-flash') {
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: this.geminiModel });
  }

  async generate(prompt: string): Promise<string> {
    const result = await this.model.generateContent(prompt);
    return result.response.text();
  }
}
