import { AiSettings, CoverLetterPayload } from '@smartcv/types';
import { buildPrompt } from '../../core/prompt/prompt-builder';
import { AIFactory, AIModel } from '../../core/ai/ai.factory';

export async function generateCoverLetterStream(
  body: CoverLetterPayload,
  headerSettings: AiSettings,
): Promise<AsyncIterable<string> | undefined> {
  const { baseCv, jobDesc, promptOption } = body;

  const { systemPrompt, userPrompt } = buildPrompt(
    JSON.stringify(baseCv, null, 2),
    jobDesc,
    headerSettings,
    promptOption,
  );

  console.log('Cover letter Prompts');
  console.log('SystemPrompts', systemPrompt);
  console.log('userPrompts', userPrompt);

  const ai: AIModel = AIFactory.create({
    modelProvider: headerSettings.modelProvider!,
    modelVersion: headerSettings.modelVersion,
    systemPrompt,
  });

  if (ai.generateStream) {
    return ai.generateStream(userPrompt);
  }

  const text = await ai.generate(userPrompt);
  return (async function* () {
    yield text;
  })();
}
