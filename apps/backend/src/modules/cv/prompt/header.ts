import { PromptLanguage } from '@smartcv/types';

const CV_HEADERS: Record<PromptLanguage, string> = {
  english: `Act as an IT recruitment expert and ATS-friendly CV optimizer.`,
  spanish: `Actúa como un experto en reclutamiento IT y optimización de CVs para sistemas ATS.`,
};

export function buildCvHeader(lang: PromptLanguage, userContext?: string) {
  const context = userContext ? `\n\nUser context:\n${userContext}` : '';
  return `${CV_HEADERS[lang]}${context}`;
}
