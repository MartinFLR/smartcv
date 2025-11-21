import { PromptLanguage } from '@smartcv/types';

export function getCoverLetterInputOutputTemplate(lang: PromptLanguage) {
  if (lang === 'english') {
    return `
`;
  } else {
    return `
`;
  }
}
