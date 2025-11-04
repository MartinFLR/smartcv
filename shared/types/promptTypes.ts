export type PromptLanguage = 'es' | 'en';
export type PromptType = 'tailoredCv' | 'coverLetter' | 'summary';
export type TemperatureLevel = 'low' | 'medium' | 'high';
export type ToneLevel = 'formal' | 'enthusiast' | 'casual' | 'neutral' | 'confident';

export interface BuildPromptOptions {
  lang?: PromptLanguage;
  userContext?: string;
  type?: PromptType;
  temperature?: TemperatureLevel;
  tone?: ToneLevel;
  recruiterName?: string;     // Nombre de la persona a la que va dirigida la cover
  companyName?: string;
}
