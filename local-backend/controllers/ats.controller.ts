import { Request, Response } from 'express';
import { analyzeCvAts } from '../services/ats.service';
import multer from 'multer';
import {CvAtsPayload} from '../../shared/types/AtsTypes';
import {BuildPromptOptions} from '../../shared/types/PromptTypes';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export async function analyzeCvAtsController(
  req: MulterRequest,
  res: Response
): Promise<void> {
  try {
    const { jobDesc, modelProvider, modelVersion } = req.body;
    const file = req.file;

    if (!file || !file.buffer) {
      res.status(400).json({ error: 'No se envió ningún archivo (file) o el buffer está vacío.' });
      return;
    }

    if (!jobDesc) {
      res.status(400).json({ error: 'Falta la descripción del puesto (jobDesc) en el formulario.' });
      return;
    }

    let promptOption: BuildPromptOptions | undefined;
    try {
      // 👇 si viene stringificado (FormData), lo parseamos
      promptOption =
        typeof req.body.promptOption === 'string'
          ? (JSON.parse(req.body.promptOption) as BuildPromptOptions)
          : (req.body.promptOption as BuildPromptOptions);
    } catch (err) {
      console.warn('⚠️ No se pudo parsear promptOption:', err);
      promptOption = undefined;
    }

    const payload: CvAtsPayload = {
      file: file.buffer,
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
