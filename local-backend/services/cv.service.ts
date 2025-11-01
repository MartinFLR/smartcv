import { AIFactory } from './ai/ai.factory';
import { buildPrompt } from './prompt/prompt-builder';
import { cleanJson } from '../utils/json-cleaner';
import { normalizeCv } from '../utils/normalizer';
import { CvPayload, TailoredCvResponse } from '../../shared/types/types';

export async function generateTailoredCv(body: CvPayload): Promise<TailoredCvResponse> {
  const { baseCv, jobDesc, modelProvider = 'gemini', modelVersion } = body;

  const jobTitle = baseCv.personalInfo.job || 'Puesto sin especificar';
  const prompt = buildPrompt(JSON.stringify(baseCv, null, 2), jobDesc, jobTitle);

  const ai = AIFactory.create({ provider: modelProvider, version: modelVersion });

  const text = await ai.generate(prompt);
  const parsed = cleanJson<TailoredCvResponse>(text);

  return normalizeCv(parsed);
}
