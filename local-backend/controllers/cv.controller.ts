import { Request, Response } from 'express';
import { generateCoverLetterStream, generateTailoredCv } from '../services/cv.service';
import { analyzeCvAts } from '../services/ats.service';
import multer from 'multer';
import {CvAtsPayload} from '../../shared/types/AtsTypes';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

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

export async function analyzeCvAtsController(
  req: MulterRequest,
  res: Response
): Promise<void> {
  try {
    const { jobDesc, modelProvider, modelVersion, promptOption } = req.body;
    const file = req.file || req.body.file;

    if (!file) {
      res.status(400).json({ error: 'No se envió ningún archivo PDF' });
      return;
    }

    const payload: CvAtsPayload = {
      file: typeof file === 'string' ? file : file.buffer,
      jobDesc,
      modelProvider,
      modelVersion,
      promptOption,
    };

    const result = await analyzeCvAts(payload);
    res.status(200).json(result);
  } catch (err: any) {
    console.error('❌ Error en analyzeCvAtsController:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  }
}

