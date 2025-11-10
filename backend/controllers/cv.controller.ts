import { Request, Response } from 'express';
import { generateTailoredCv } from '../services/cv.service';

export async function generateCvController(req: Request, res: Response) {
  try {
    const cv = await generateTailoredCv(req.body);
    res.status(200).json(cv);
  } catch (err: unknown) {
    console.error('❌ Error en generateCvController:', err);
    const message = err instanceof Error ? err.message : 'Error desconocido';
    res.status(500).json({ error: message });
  }
}
