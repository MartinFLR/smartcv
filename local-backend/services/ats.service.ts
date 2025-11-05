import { AIFactory } from './ai/ai.factory';
import { cleanJson } from '../utils/json-cleaner';
import { } from '../../shared/types/Types';
import * as pdfParse from 'pdf-parse';
import {buildATSPrompt} from './prompt/cover-letter/cover-letter-builder';
import {CvAtsPayload, CvAtsResponse} from '../../shared/types/AtsTypes';


export async function analyzeCvAts(body: CvAtsPayload): Promise<CvAtsResponse> {
  const {
    file,
    modelProvider = 'gemini',
    jobDesc,
    modelVersion,
    promptOption,
  } = body;

  let pdfBuffer: Buffer;
  if (typeof file === 'string' && file.startsWith('data:application/pdf;base64,')) {
    pdfBuffer = Buffer.from(file.split(',')[1], 'base64');
  } else if (typeof file === 'string') {
    pdfBuffer = Buffer.from(file, 'base64');
  } else {
    pdfBuffer = Buffer.from(file as ArrayBuffer);
  }

  const parsed = await (pdfParse as any)(pdfBuffer);
  const cvText = parsed.text.slice(0, 15000);

  const prompt = buildATSPrompt(cvText, jobDesc, promptOption);

  const ai = AIFactory.create({ provider: modelProvider, version: modelVersion });
  const text = await ai.generate(prompt);

  const parsedJson = cleanJson<CvAtsResponse>(text);
  return parsedJson;
}
