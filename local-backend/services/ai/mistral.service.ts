import axios from 'axios';
import { AIModel } from './ai.factory';
import { config } from '../../config/env';

export class MistralService implements AIModel {
  private model: string;
  private endpoint: string;

  constructor(model: string = 'mistral-7b') {
    this.model = model;
    this.endpoint = `https://api.mistral.ai/v1/models/${this.model}/generate`;
  }

  async generate(prompt: string): Promise<string> {
    try {
      const res = await axios.post(
        this.endpoint,
        { prompt, max_tokens: 1024 },
        { headers: { Authorization: `Bearer ${config.mistralApiKey}` } }
      );
      return res.data.output_text || '';
    } catch (err: any) {
      console.error('Error en MistralService.generate:', err);
      throw new Error('Error al generar texto con Mistral');
    }
  }
}
