import { AIFactory, AIModel } from '../../core/ai/ai.factory';
import { buildPrompt } from '../../core/prompt/prompt-builder';
import { cleanJson } from '../../core/utils/json-cleaner';
import { normalizeCv } from '../../core/utils/normalizer';
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
