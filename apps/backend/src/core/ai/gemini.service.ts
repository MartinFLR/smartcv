import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { AIModel } from './ai.factory';

// Definí tipos exactos según el SDK
interface Part {
  text: string;
}
interface Message {
  role: 'user';
  parts: Part[];
}
interface SystemInstruction {
  role: 'system';
  parts: Part[];
}

interface GenerateContentRequest {
  contents: Message[];
  systemInstruction?: SystemInstruction;
}

export class GeminiService implements AIModel {
  private model: GenerativeModel;
  private systemInstruction?: SystemInstruction;

  constructor(apiKey: string, version = 'gemini-2.0-flash', systemPrompt: string) {
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: version });

    if (systemPrompt) {
      this.systemInstruction = {
        role: 'system',
        parts: [{ text: systemPrompt }],
      };
    }
  }

  async generate(userPrompt: string): Promise<string> {
    const request: GenerateContentRequest = {
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      systemInstruction: this.systemInstruction,
    };

    const result = await this.model.generateContent(request);
    return result.response.text();
  }

  async *generateStream(userPrompt: string): AsyncGenerator<string> {
    const request: GenerateContentRequest = {
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      systemInstruction: this.systemInstruction,
    };

    const result = await this.model.generateContentStream(request);

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) yield text;
    }
  }
}
