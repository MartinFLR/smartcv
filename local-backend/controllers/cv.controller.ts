import { Request, Response } from 'express';
import {generateCoverLetterStream, generateTailoredCv} from '../services/cv.service';

export async function generateCvController(req: Request, res: Response) {
  try {
    const cv = await generateTailoredCv(req.body);
    res.status(200).json(cv);
  } catch (err: any) {
    console.error('❌ Error en generateCvController:', err);
    res.status(500).json({ error: err.message });
  }
}

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
