import { AIFactory, AIModel } from '../../core/ai/ai.factory';
import { cleanJson } from '../../core/utils/json-cleaner';
import { CvAtsPayload, CvAtsResponse } from '@smartcv/types';
import { buildPrompt } from '../../core/prompt/prompt-builder';

import * as pdfParse from 'pdf-parse';

export async function analyzeCvAts(body: CvAtsPayload): Promise<CvAtsResponse> {
  const { file, jobDesc, aiSettings, promptOption } = body;

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
    throw new Error('jobDesc no puede ser undefined en ats.service');
  }

  const prompt = buildPrompt(cvText, jobDesc, promptOption);

  const ai: AIModel = AIFactory.create({
    provider: aiSettings?.modelProvider ?? 'gemini',
    version: aiSettings?.modelVersion,
  });

  const text = await ai.generate(prompt);

  const parsedJson = cleanJson<CvAtsResponse>(text);
  return parsedJson;
}
