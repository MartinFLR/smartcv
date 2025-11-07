import {Request, Response} from 'express';
import {generateCoverLetterStream} from '../services/cv.service';

export async function generateCoverLetterController(req: Request, res: Response) {
  try {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    await generateCoverLetterStream(req.body, res);
  } catch (err: any) {
    console.error('❌ Error en generateCoverLetter:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  }
}
