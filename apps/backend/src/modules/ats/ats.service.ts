import { Injectable } from '@nestjs/common';
import { AIFactory, AIModel } from '../../core/ai/ai.factory';
import { cleanJson } from '../../core/utils/json-cleaner';
import { AiSettings, CvAtsPayload, CvAtsResponse } from '@smartcv/types';
import { PromptService } from '../../core/prompt/prompt.service';
import * as pdfParse from 'pdf-parse';

@Injectable()
export class AtsService {
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private readonly promptService: PromptService) {}

  async analyzeCvAts(body: CvAtsPayload, headerSettings: AiSettings): Promise<CvAtsResponse> {
    const { file, jobDesc, promptOption } = body;

    let pdfBuffer: Buffer;
    if (typeof file === 'string' && file.startsWith('data:application/pdf;base64,')) {
      pdfBuffer = Buffer.from(file.split(',')[1], 'base64');
    } else if (typeof file === 'string') {
      pdfBuffer = Buffer.from(file, 'base64');
    } else {
      pdfBuffer = Buffer.from(file as unknown as string, 'base64');
    }
    const pdfParser = new pdfParse.PDFParse({ data: pdfBuffer });
    const parsed: pdfParse.TextResult = await pdfParser.getText();
    const cvText = parsed.text.slice(0, 15000);

    if (!jobDesc) {
      throw new Error('jobDesc no puede ser undefined en ats.analysis');
    }

    const generator = this.promptService.getGenerator('ats');

    const systemPrompt = generator.buildSystemPrompt(
      promptOption?.lang || 'spanish',
      promptOption?.temperature || 'low',
      promptOption,
    );

    const userPrompt = generator.buildUserPrompt(
      cvText, // Use extracted text as baseCv
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

    return cleanJson<CvAtsResponse>(text);
  }
}
