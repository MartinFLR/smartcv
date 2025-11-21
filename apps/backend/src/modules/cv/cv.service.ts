import { AiSettings, CvPayload, CvResponse } from '@smartcv/types';
import { buildPrompt } from '../../core/prompt/prompt-builder';
import { AIFactory, AIModel } from '../../core/ai/ai.factory';
import { cleanJson } from '../../core/utils/json-cleaner';
import { normalizeCv } from '../../core/utils/normalizer';

export async function generateTailoredCv(
  body: CvPayload,
  headerSettings: AiSettings,
): Promise<CvResponse> {
  const { baseCv, jobDesc, promptOption } = body;

  const { systemPrompt, userPrompt } = buildPrompt(
    JSON.stringify(baseCv, null, 2),
    jobDesc,
    headerSettings,
    promptOption,
  );

  const ai: AIModel = AIFactory.create({
    modelProvider: headerSettings.modelProvider!,
    modelVersion: headerSettings.modelVersion,
    systemPrompt,
  });

  const text = await ai.generate(userPrompt);

  const parsed = cleanJson<CvResponse>(text);

  return normalizeCv(parsed);
}
