import { Injectable } from '@nestjs/common';
import { AiSettings, CoverLetterPayload } from '@smartcv/types';
import { PromptService } from '../../core/prompt/prompt.service';
import { AIFactory, AIModel } from '../../core/ai/ai.factory';

@Injectable()
export class CoverLetterService {
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private readonly promptService: PromptService) {}

  async generateCoverLetterStream(
    body: CoverLetterPayload,
    headerSettings: AiSettings,
  ): Promise<AsyncIterable<string> | undefined> {
    const { baseCv, jobDesc, promptOption } = body;
    const promptType = 'coverLetter';

    const generator = this.promptService.getGenerator(promptType);

    const systemPrompt = generator.buildSystemPrompt(
      promptOption?.lang || 'spanish',
      promptOption?.temperature || 'low',
      { ...promptOption, tone: promptOption?.tone },
    );
    const userPrompt = generator.buildUserPrompt(
      JSON.stringify(baseCv, null, 2),
      jobDesc,
      promptOption?.lang || 'spanish',
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
}
