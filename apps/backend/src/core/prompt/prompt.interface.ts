import { BuildPromptOptions, PromptLanguage, TemperatureLevel } from '@smartcv/types';

export interface PromptGenerator {
  buildSystemPrompt(
    lang: PromptLanguage,
    temperature: TemperatureLevel,
    options?: BuildPromptOptions,
  ): string;

  buildUserPrompt(
    baseCv: string,
    jobDesc: string,
    lang: PromptLanguage,
    options?: BuildPromptOptions,
  ): string;
}
