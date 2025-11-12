import { AIFactory, AIModel } from './ai/ai.factory';
import { buildPrompt } from './prompt/prompt-builder';
import { cleanJson } from '../utils/json-cleaner';
import { normalizeCv } from '../utils/normalizer';
import { CvPayload, CvResponse } from '@smartcv/types';

export async function generateTailoredCv(body: CvPayload): Promise<CvResponse> {
  const { baseCv, jobDesc, aiSettings, promptOption } = body;
  const prompt = buildPrompt(JSON.stringify(baseCv, null, 2), jobDesc, promptOption);

  const ai: AIModel = AIFactory.create({
    provider: aiSettings?.modelProvider ?? 'gemini',
    version: aiSettings?.modelVersion,
  });

  const text = await ai.generate(prompt);
  const parsed = cleanJson<CvResponse>(text);

  return normalizeCv(parsed);
}
