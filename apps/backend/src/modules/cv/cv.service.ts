import { Injectable } from '@nestjs/common';
import { AiSettings, CvPayload, CvResponse } from '@smartcv/types';
import { PromptService } from '../../core/prompt/prompt.service';
import { AIFactory, AIModel } from '../../core/ai/ai.factory';
import { cleanJson } from '../../core/utils/json-cleaner';
import { normalizeCv } from '../../core/utils/normalizer';
import { ConfigService } from '../../modules/config/config.service';

@Injectable()
export class CvService {
  constructor(
    private readonly promptService: PromptService,
    private readonly configService: ConfigService,
  ) {}

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

    const apiKeys = await this.configService.getAll();

    const ai: AIModel = AIFactory.create({
      modelProvider: headerSettings.modelProvider!,
      modelVersion: headerSettings.modelVersion,
      systemPrompt,
      apiKeys,
    });

    const text = await ai.generate(userPrompt);

    const parsed = cleanJson<CvResponse>(text);

    return normalizeCv(parsed);
  }
}
