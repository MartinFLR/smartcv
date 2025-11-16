import { AiSettings, CoverLetterPayload } from '@smartcv/types';
import { buildPrompt } from '../../core/prompt/prompt-builder';
import { AIFactory, AIModel } from '../../core/ai/ai.factory';

export async function generateCoverLetterStream(
  body: CoverLetterPayload,
  headerSettings: AiSettings,
): Promise<AsyncIterable<string> | undefined> {
  const { baseCv, jobDesc, promptOption } = body;

  const finalAiSettings: AiSettings = {
    modelProvider: headerSettings.modelProvider,
    modelVersion: headerSettings.modelVersion,
    systemPrompt: headerSettings.systemPrompt,
  };

  const prompt = buildPrompt(
    JSON.stringify(baseCv, null, 2),
    jobDesc,
    finalAiSettings,
    promptOption,
  );

  const ai: AIModel = AIFactory.create({
    modelProvider: finalAiSettings.modelProvider!,
    modelVersion: finalAiSettings.modelVersion,
    systemPrompt: finalAiSettings.systemPrompt,
  });

  if (ai.generateStream) {
    return ai.generateStream(prompt);
  }
  const text = await ai.generate(prompt);
  return (async function* () {
    yield text;
  })();
}
