import { AIFactory } from './ai/ai.factory';
import { buildPrompt } from './prompt/prompt-builder';
import { cleanJson } from '../utils/json-cleaner';
import { normalizeCv } from '../utils/normalizer';
import { CvPayload, CvResponse } from '../../shared/types/Types';

export async function generateTailoredCv(body: CvPayload): Promise<CvResponse> {
  const { baseCv, jobDesc, modelProvider = 'gemini', modelVersion, promptOption } = body;
  const prompt = buildPrompt(JSON.stringify(baseCv, null, 2), jobDesc, promptOption);

  const ai = AIFactory.create({ provider: modelProvider, version: modelVersion });

  const text = await ai.generate(prompt);
  const parsed = cleanJson<CvResponse>(text);

  return normalizeCv(parsed);
}
