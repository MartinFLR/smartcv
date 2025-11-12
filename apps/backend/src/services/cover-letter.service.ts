import { CoverLetterPayload } from '@smartcv/types';
import { Response } from 'express';
import { buildPrompt } from './prompt/prompt-builder';
import { AIFactory, AIModel } from './ai/ai.factory';

export async function generateCoverLetterStream(
  body: CoverLetterPayload,
  res: Response,
): Promise<void> {
  const { baseCv, jobDesc, promptOption, aiSettings } = body;
  const prompt = buildPrompt(JSON.stringify(baseCv, null, 2), jobDesc, promptOption);

  const ai: AIModel = AIFactory.create({
    provider: aiSettings?.modelProvider ?? 'gemini',
    version: aiSettings?.modelVersion,
  });

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Transfer-Encoding', 'chunked');

  if (ai.generateStream) {
    for await (const chunk of ai.generateStream(prompt)) {
      res.write(chunk);
    }
  } else {
    const text = await ai.generate(prompt);
    res.write(text);
  }

  res.end();
}
