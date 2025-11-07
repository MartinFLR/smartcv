import {PromptLanguage} from '../../../../shared/types/PromptTypes';

export function buildCvHeader(lang: PromptLanguage, userContext?: string) {
  const context = userContext ? `\n\nUser context:\n${userContext}` : '';
  if (lang === 'english') return `Act as an IT recruitment expert and ATS-friendly CV optimizer.${context}`;
  return `Actúa como un experto en reclutamiento IT y optimización de CVs para sistemas ATS.${context}`;
}
