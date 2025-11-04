import axios from 'axios';
import { AIModel } from './ai.factory';
import { config } from '../../config/env';

export class MistralService implements AIModel {
  private model: string;
  private endpoint: string;

  constructor(model: string = 'mistral-medium') {
    this.model = model;
    this.endpoint = 'https://api.mistral.ai/v1/chat/completions';
  }

  async generate(prompt: string): Promise<string> {
    try {
      const res = await axios.post(
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
        }
      );

      return res.data.choices?.[0]?.message?.content || '';
    } catch (err: any) {
      console.error('❌ Error en MistralService.generate:', err.response?.data || err.message);
      throw new Error('Error al generar texto con Mistral');
    }
  }


  async *generateStream(prompt: string): AsyncGenerator<string> {
    const response = await axios.post(
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
      }
    );

    const stream = response.data;
    for await (const chunk of stream) {
      const text = chunk.toString();

      const lines: string[] = text
        .split('\n')
        .filter((line: string) => line.trim().startsWith('data: '));

      for (const line of lines) {
        if (line.includes('[DONE]')) return;

        try {
          const json = JSON.parse(line.replace('data: ', ''));
          const delta = json.choices?.[0]?.delta?.content;
          if (delta) yield delta;
        } catch {
        }
      }
      }
    }
  }

