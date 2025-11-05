import {
  BuildPromptOptions,
  PromptLanguage,
} from '../../../../shared/types/PromptTypes';
import {getATStrictRules} from './rules';
import {getATSMainTasks} from './tasks';
import {getATSInputOutputTemplate} from './inputOutput';


export function buildATSHeader(lang: PromptLanguage) {
  if (lang === 'en') return `Act as an IT recruitment expert and ATS-friendly CV optimizer.`;
  return `Actúa como un experto en reclutamiento IT y optimización de CVs para sistemas ATS.`;
}

export function buildATSPrompt(
  textCv: string,
  jobDesc: string,
  options?: BuildPromptOptions
): string {
  const lang: PromptLanguage = options?.lang || 'es';
    return [
      buildATSHeader(lang),
      getATSMainTasks(lang),
      getATStrictRules(lang),
      getATSInputOutputTemplate(textCv, jobDesc, lang)
    ].join('\n\n');
}
