import axios, { AxiosResponse } from 'axios';
import { AIModel } from './ai.factory';
import { config } from '../../config/env';
import { IncomingMessage } from 'http';

interface MistralChoice {
  index: number;
  message: { role: string; content: string };
  finish_reason: string | null;
}

interface MistralResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: MistralChoice[];
}

interface MistralStreamDelta {
  choices?: {
    delta?: { content?: string };
  }[];
}

export class MistralService implements AIModel {
  private model: string;
  private endpoint: string;

  constructor(model = 'mistral-medium') {
    this.model = model;
    this.endpoint = 'https://api.mistral.ai/v1/chat/completions';
  }

  async generate(prompt: string): Promise<string> {
    try {
      const res: AxiosResponse<MistralResponse> = await axios.post(
        this.endpoint,
        {
          model: this.model,
          messages: [{ role: 'user', content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${config.mistralApiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return res.data.choices?.[0]?.message?.content ?? '';
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          '❌ Error en MistralService.generate:',
          error.response?.data || error.message,
        );
      } else {
        console.error('❌ Error en MistralService.generate:', error);
      }
      throw new Error('Error al generar texto con Mistral');
    }
  }

  async *generateStream(prompt: string): AsyncGenerator<string> {
    const response = await axios.post<IncomingMessage>(
      this.endpoint,
      {
        model: this.model,
        stream: true,
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${config.mistralApiKey}`,
          'Content-Type': 'application/json',
        },
        responseType: 'stream',
      },
    );

    const stream = response.data;

    for await (const chunk of stream) {
      const text = chunk.toString();
      const lines = text.split('\n').filter((line: string) => line.trim().startsWith('data: '));

      for (const line of lines) {
        if (line.includes('[DONE]')) return;

        try {
          const json: MistralStreamDelta = JSON.parse(line.replace('data: ', ''));
          const delta = json.choices?.[0]?.delta?.content;
          if (delta) yield delta;
        } catch {
          console.error('generateStream Error', line);
        }
      }
    }
  }
}
