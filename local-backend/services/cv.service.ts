import { AIFactory } from './ai/ai.factory';
import { Response } from 'express';
import { buildPrompt } from './prompt/prompt-builder';
import { cleanJson } from '../utils/json-cleaner';
import { normalizeCv} from '../utils/normalizer';
import {
  CoverLetterPayload,
  CvPayload,
  TailoredCvResponse,
} from '../../shared/types/types';

export async function generateTailoredCv(body: CvPayload): Promise<TailoredCvResponse> {
  const { baseCv, jobDesc, modelProvider = 'gemini', modelVersion , promptOption } = body;

  const jobTitle = baseCv.personalInfo.job || 'Puesto sin especificar';
  const prompt = buildPrompt(JSON.stringify(baseCv, null, 2), jobDesc, jobTitle, promptOption);

  const ai = AIFactory.create({ provider: modelProvider, version: modelVersion });

  const text = await ai.generate(prompt);
  const parsed = cleanJson<TailoredCvResponse>(text);

  return normalizeCv(parsed);
}

export async function generateCoverLetterStream(
  body: CoverLetterPayload,
  res: Response
) {
  const { baseCv, jobDesc, promptOption, modelProvider = 'gemini', modelVersion } = body;
  const jobTitle = baseCv.personalInfo.job || 'Puesto sin especificar';
  const prompt = buildPrompt(JSON.stringify(baseCv, null, 2), jobDesc, jobTitle,promptOption);

  const ai = AIFactory.create({ provider: modelProvider, version: modelVersion });

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');

  if (typeof (ai as any).generateStream === 'function') {
    for await (const chunk of (ai as any).generateStream(prompt)) {
      res.write(chunk);
    }
  } else {
    const text = await ai.generate(prompt);
    res.write(text);
  }

  res.end();
}
