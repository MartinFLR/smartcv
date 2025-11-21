import { buildContextBlock } from './context-block';
import { buildInstructionsBlock } from './instruction-block';
import { buildOutputBlock } from './output-block';
import { buildCoverLetterHeader } from '../../modules/cover-letter/prompt/header';
import { buildCvHeader } from '../../modules/cv/prompt/header';
import { buildATSHeader } from '../../modules/ats/prompt/header';
import {
  AiSettings,
  BuildPromptOptions,
  PromptLanguage,
  PromptType,
  TemperatureLevel,
} from '@smartcv/types';

export function buildSystemPrompt(
  type: PromptType,
  lang: PromptLanguage,
  temperature: TemperatureLevel,
  options?: BuildPromptOptions,
): string {
  const userContext = options?.userContext;
  const recruiterName = options?.recruiterName || '';
  const companyName = options?.companyName || '';
  const referralName = options?.referralName || '';

  const blocks: string[] = [];

  if (type === 'coverLetter') {
    blocks.push(
      buildCoverLetterHeader(lang, userContext, recruiterName, referralName, companyName),
    );
  } else if (type === 'tailoredCv') {
    blocks.push(buildCvHeader(lang, userContext));
  } else if (type === 'ats') {
    blocks.push(buildATSHeader(lang));
  }
  blocks.push(buildInstructionsBlock(type, lang, temperature, options));

  blocks.push(buildOutputBlock(type, lang));

  return blocks.join('\n\n');
}

export function buildUserPrompt(
  baseCv: string,
  jobDesc: string,
  lang: PromptLanguage,
  options?: BuildPromptOptions,
): string {
  return buildContextBlock(baseCv, jobDesc, lang, options);
}

export function buildPrompt(
  baseCv: string,
  jobDesc: string,
  aiSettings: AiSettings,
  options?: BuildPromptOptions,
): { systemPrompt: string; userPrompt: string } {
  const lang: PromptLanguage = options?.lang ?? 'spanish';
  const type: PromptType = options?.type ?? 'tailoredCv';
  const temperature: TemperatureLevel = options?.temperature ?? 'low';

  const systemPrompt = buildSystemPrompt(type, lang, temperature, options);
  const userPrompt = buildUserPrompt(baseCv, jobDesc, lang, options);

  return { systemPrompt, userPrompt };
}
