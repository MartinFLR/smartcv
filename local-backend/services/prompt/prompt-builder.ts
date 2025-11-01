import { BuildPromptOptions, PromptLanguage, PromptType, TemperatureLevel } from '../../../shared/types/promptTypes';
import { getExaggeration } from './exaggeration';
import { getStrictRules } from './rules';
import { getMainTasks } from './tasks';
import { getInputOutputTemplate } from './inputOutput';

export function buildHeader(lang: PromptLanguage, userContext?: string) {
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
  const userContext = options?.userContext;

  const exaggeration = getExaggeration(temperature, lang);

  if (type === 'tailoredCv') {
    return [
      buildHeader(lang, userContext),
      `Exaggeration instructions: ${exaggeration}`,
      getMainTasks(lang, jobTitle),
      getStrictRules(lang),
      getInputOutputTemplate(baseCv, jobDesc, lang)
    ].join('\n\n');
  }

  return `Error: prompt type "${type}" or language "${lang}" not implemented.`;
}
