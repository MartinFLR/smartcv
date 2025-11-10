import { Request, Response } from 'express';
import { generateCoverLetterStream } from '../services/cover-letter.service';

export async function generateCoverLetterController(req: Request, res: Response) {
  try {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    await generateCoverLetterStream(req.body, res);
  } catch (err: unknown) {
    console.error('❌ Error en generateCoverLetterController:', err);
    const message = err instanceof Error ? err.message : 'Error desconocido';
    res.status(500).json({ error: message });
  }
}
