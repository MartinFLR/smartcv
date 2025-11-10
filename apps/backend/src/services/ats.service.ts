import { AIFactory } from './ai/ai.factory';
import { cleanJson } from '../utils/json-cleaner';
import { CvAtsPayload, CvAtsResponse } from '@smartcv/shared';
import { buildPrompt } from './prompt/prompt-builder';

import pdfParse = require('pdf-parse');

export async function analyzeCvAts(body: CvAtsPayload): Promise<CvAtsResponse> {
  const { file, modelProvider = 'gemini', jobDesc, modelVersion, promptOption } = body;

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

  const ai = AIFactory.create({ provider: modelProvider, version: modelVersion });
  const text = await ai.generate(prompt);

  const parsedJson = cleanJson<CvAtsResponse>(text);
  return parsedJson;
}
