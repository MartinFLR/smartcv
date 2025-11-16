import { Request, Response } from 'express';
import { generateCoverLetterStream } from './cover-letter.service';
import { AiSettings } from '@smartcv/types';

export async function generateCoverLetterController(req: Request, res: Response) {
  try {
    const provider = req.headers['x-ai-provider'] as string;
    const model = req.headers['x-ai-model'] as string;

    const headerSettings: AiSettings = {
      modelProvider: provider,
      modelVersion: model,
      systemPrompt: '',
    };
    console.log(headerSettings.modelVersion);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    const stream = await generateCoverLetterStream(req.body, headerSettings);

    if (!stream) {
      throw new Error('No se pudo generar el stream.');
    }
    for await (const chunk of stream) {
      res.write(chunk);
    }

    res.end();
  } catch (err: unknown) {
    console.error('❌ Error en generateCoverLetterController:', err);

    if (!res.headersSent) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      res.status(500).json({ error: message });
    } else {
      res.end();
    }
  }
}
