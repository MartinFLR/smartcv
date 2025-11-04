import { Request, Response } from 'express';
import {generateCoverLetter, generateTailoredCv} from '../services/cv.service';

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
    const cv = await generateCoverLetter(req.body);
    res.status(200).json(cv);
  } catch (err: any) {
    console.error('❌ Error en generateCoverLetter:', err);
    res.status(500).json({ error: err.message });
  }
}
