import { Injectable } from '@nestjs/common';
import { AiSettings, CvPayload, CvResponse } from '@smartcv/types';
import { PromptService } from '../../core/prompt/prompt.service';
import { AIFactory, AIModel } from '../../core/ai/ai.factory';
import { cleanJson } from '../../core/utils/json-cleaner';
import { normalizeCv } from '../../core/utils/normalizer';

@Injectable()
export class CvService {
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private readonly promptService: PromptService) {}

  async generateTailoredCv(body: CvPayload, headerSettings: AiSettings): Promise<CvResponse> {
    const { baseCv, jobDesc, promptOption } = body;
    const promptType = 'tailoredCv';

    const generator = this.promptService.getGenerator(promptType);

    const systemPrompt = generator.buildSystemPrompt(
      promptOption?.lang || 'spanish',
      promptOption?.temperature || 'low',
      promptOption,
    );

    const userPrompt = generator.buildUserPrompt(
      JSON.stringify(baseCv, null, 2),
      jobDesc,
      promptOption?.lang || 'spanish',
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
}
