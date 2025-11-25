import { AIFactory, AIModel } from '../../core/ai/ai.factory';
import { cleanJson } from '../../core/utils/json-cleaner';
import { AiSettings, CvAtsPayload, CvAtsResponse } from '@smartcv/types';
import { buildPrompt } from '../../core/prompt/prompt-builder';
import * as pdfParse from 'pdf-parse';

export async function analyzeCvAts(
  body: CvAtsPayload,
  headerSettings: AiSettings,
): Promise<CvAtsResponse> {
  const { file, jobDesc, promptOption } = body;

  let pdfBuffer: Buffer;
  if (typeof file === 'string' && file.startsWith('data:application/pdf;base64,')) {
    pdfBuffer = Buffer.from(file.split(',')[1], 'base64');
  } else if (typeof file === 'string') {
    pdfBuffer = Buffer.from(file, 'base64');
  } else {
    pdfBuffer = Buffer.from(file as ArrayBuffer);
  }
  const pdfParser = new pdfParse.PDFParse({ data: pdfBuffer });
  const parsed: pdfParse.TextResult = await pdfParser.getText();
  const cvText = parsed.text.slice(0, 15000);

  if (!jobDesc) {
    throw new Error('jobDesc no puede ser undefined en ats.analysis');
  }

  const finalAiSettings: AiSettings = {
    modelProvider: headerSettings.modelProvider,
    modelVersion: headerSettings.modelVersion,
    systemPrompt: headerSettings.systemPrompt,
  };

  const { systemPrompt, userPrompt } = buildPrompt(cvText, jobDesc, headerSettings, promptOption);

  const ai: AIModel = AIFactory.create({
    modelProvider: finalAiSettings.modelProvider!,
    modelVersion: finalAiSettings.modelVersion,
    systemPrompt: systemPrompt,
  });

  const text = await ai.generate(userPrompt);

  const parsedJson = cleanJson<CvAtsResponse>(text);

  return parsedJson;
}
