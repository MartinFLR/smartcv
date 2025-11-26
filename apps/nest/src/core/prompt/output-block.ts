import { PromptLanguage, PromptType } from '@smartcv/types';
import { getCvInputOutputTemplate } from '../../modules/cv/prompt/inputOutput';
import { getCoverLetterInputOutputTemplate } from '../../modules/cover-letter/prompt/inputOutput';
import { getATSInputOutputTemplate } from '../../modules/ats/prompt/inputOutput';

export function buildOutputBlock(type: PromptType, lang: PromptLanguage): string {
  switch (type) {
    case 'tailoredCv':
      return `[OUTPUT FORMAT - ${lang === 'spanish' ? 'FORMATO DE SALIDA' : 'OUTPUT FORMAT'}]
${getCvInputOutputTemplate(lang)}`;

    case 'coverLetter':
      return `[OUTPUT FORMAT - ${lang === 'spanish' ? 'FORMATO DE SALIDA' : 'OUTPUT FORMAT'}]
${getCoverLetterInputOutputTemplate(lang)}`;

    case 'ats':
      return `[OUTPUT FORMAT - ${lang === 'spanish' ? 'FORMATO DE SALIDA' : 'OUTPUT FORMAT'}]
${getATSInputOutputTemplate(lang)}`;

    default:
      throw new Error(
        lang === 'spanish'
          ? `Formato de salida no implementado para tipo "${type}"`
          : `Output format not implemented for type "${type}"`,
      );
  }
}
