export type PromptLanguage = 'spanish' | 'english';
export type PromptType = 'tailoredCv' | 'coverLetter' | 'summary' | 'ats';
export type TemperatureLevel = 'low' | 'medium' | 'high';
export type ToneLevel = 'formal' | 'enthusiast' | 'casual' | 'neutral' | 'confident';
export type DeliveryChannel = 'email' | 'linkedinMessage' | 'applicationForm' | 'internalReferral';

export type AiProviderModels = Record<string, string[]>;

export interface BuildPromptOptions {
  lang?: PromptLanguage;
  userContext?: string;
  type?: PromptType;
  temperature?: TemperatureLevel;
  tone?: ToneLevel;
  recruiterName?: string; // Nombre de la persona a la que va dirigida la cover
  companyName?: string;
  referralName?: string;
  deliveryChannel?: DeliveryChannel;
}
