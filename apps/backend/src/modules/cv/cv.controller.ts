import { Request, Response } from 'express';
import { generateTailoredCv } from './cv.service';
import { AiSettings } from '@smartcv/types';

export async function generateCvController(req: Request, res: Response) {
  try {
    const provider = req.headers['x-ai-provider'] as string;
    const model = req.headers['x-ai-model'] as string;

    const headerSettings: AiSettings = {
      modelProvider: provider,
      modelVersion: model,
      systemPrompt: '',
    };

    const cv = await generateTailoredCv(req.body, headerSettings);

    res.status(200).json(cv);
  } catch (err: unknown) {
    console.error('❌ Error en generateCvController:', err);
    const message = err instanceof Error ? err.message : 'Error desconocido';
    res.status(500).json({ error: message });
  }
}
