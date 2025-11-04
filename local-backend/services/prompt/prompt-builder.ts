import { BuildPromptOptions, PromptLanguage, PromptType, TemperatureLevel } from '../../../shared/types/promptTypes';
import { getExaggeration } from './exaggeration';
import {getCoverLetterStrictRules, getCVStrictRules} from './rules';
import {getCoverLetterMainTasks, getCVMainTasks} from './tasks';
import {getCoverLetterInputOutputTemplate, getInputOutputTemplate} from './inputOutput';

export function buildHeader(lang: PromptLanguage, userContext?: string) {
  const context = userContext ? `\n\nUser context:\n${userContext}` : '';
  if (lang === 'en') return `Act as an IT recruitment expert and ATS-friendly CV optimizer.${context}`;
  return `Actúa como un experto en reclutamiento IT y optimización de CVs para sistemas ATS.${context}`;
}

export function buildCoverLetterHeader(lang: PromptLanguage, userContext?: string) {
  const context = userContext ? `\n\nUser context:\n${userContext}` : '';
  if (lang === 'en') return `Act as an IT recruitment expert and ATS-friendly CV optimizer.${context}`;
  return `Actúa como un experto en reclutamiento IT y optimización de CVs para sistemas ATS.${context}`;
}

export function buildPrompt(
  baseCv: string,
  jobDesc: string,
  jobTitle: string,
  options?: BuildPromptOptions
): string {
  const lang: PromptLanguage = options?.lang || 'es';
  const type: PromptType = options?.type || 'tailoredCv';
  const temperature: TemperatureLevel = options?.temperature || 'low';

  const tone = options?.tone || 'formal';
  const recruiterNamer = options?.recruiterName || '';
  const companyName = options?.recruiterName || '';
  const userContext = options?.userContext;

  const exaggeration = getExaggeration(temperature, lang);

  if (type === 'tailoredCv') {
    return [
      buildHeader(lang, userContext),
      `Exaggeration instructions: ${exaggeration}`,
      getCVMainTasks(lang, jobTitle),
      getCVStrictRules(lang),
      getInputOutputTemplate(baseCv, jobDesc, lang)
    ].join('\n\n');
  }
  if (type === 'coverLetter') {
    return [
      buildCoverLetterHeader(lang, userContext),
      `Tone instructions: ${tone}`,
      getCoverLetterMainTasks(lang, jobTitle),
      getCoverLetterStrictRules(lang),
      getCoverLetterInputOutputTemplate(baseCv, jobDesc, lang)
    ].join('\n\n');
  }

  return `Error: prompt type "${type}" or language "${lang}" not implemented.`;
}
