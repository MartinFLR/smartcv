import { PromptLanguage, TemperatureLevel } from '../../../shared/types/promptTypes';

const exaggerationTexts: Record<PromptLanguage, Record<TemperatureLevel, string>> = {
  en: {
    low: 'Be faithful to the CV, do not invent achievements.',
    medium: 'Highlight existing achievements and slightly adapt the text to emphasize impact.',
    high: 'Maximize CV impact, exaggerate achievements and skills plausibly.',
  },
  es: {
    low: 'Sé fiel al CV, no inventes logros.',
    medium: 'Resalta logros existentes y adapta ligeramente la redacción para enfatizar impacto.',
    high: 'Maximiza el impacto del CV, exagera logros y habilidades de manera plausible.',
  },
};

export function getExaggeration(level: TemperatureLevel, lang: PromptLanguage) {
  return exaggerationTexts[lang][level];
}
