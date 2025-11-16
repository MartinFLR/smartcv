import { Request, Response } from 'express';
import { analyzeCvAts } from './ats.service';
import { AiSettings, CvAtsPayload, BuildPromptOptions } from '@smartcv/types';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export async function analyzeCvAtsController(req: MulterRequest, res: Response): Promise<void> {
  try {
    const provider = req.headers['x-ai-provider'] as string;
    const model = req.headers['x-ai-model'] as string;

    const headerSettings: AiSettings = {
      modelProvider: provider,
      modelVersion: model,
      systemPrompt: '',
    };

    const { jobDesc, aiSettings } = req.body;
    const file = req.file;

    if (!file || !file.buffer) {
      res.status(400).json({ error: 'No se envió ningún archivo (file) o el buffer está vacío.' });
      return;
    }
    if (!jobDesc) {
      res
        .status(400)
        .json({ error: 'Falta la descripción del puesto (jobDesc) en el formulario.' });
      return;
    }
    let promptOption: BuildPromptOptions | undefined;
    try {
      promptOption =
        typeof req.body.promptOption === 'string'
          ? (JSON.parse(req.body.promptOption) as BuildPromptOptions)
          : (req.body.promptOption as BuildPromptOptions);
    } catch (err) {
      console.warn('No se pudo parsear promptOption:', err);
      promptOption = undefined;
    }

    const payload: CvAtsPayload = {
      file: file.buffer,
      jobDesc,
      aiSettings,
      promptOption,
    };

    const result = await analyzeCvAts(payload, headerSettings);
    res.status(200).json(result);
  } catch (err: unknown) {
    console.error('❌ Error en analyzeCvAtsController:', err);
    const message = err instanceof Error ? err.message : 'Error desconocido';
    res.status(500).json({ error: message });
  }
}
