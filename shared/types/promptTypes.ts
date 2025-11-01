export type PromptLanguage = 'es' | 'en';
export type PromptType = 'tailoredCv' | 'coverLetter' | 'summary';
export type TemperatureLevel = 'low' | 'medium' | 'high';

export interface BuildPromptOptions {
  lang?: PromptLanguage;
  userContext?: string;
  type?: PromptType;
  temperature?: TemperatureLevel;
}
