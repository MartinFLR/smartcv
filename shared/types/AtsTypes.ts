import { BuildPromptOptions } from './PromptTypes';

export type SectionScoreItem = [string, number];

export interface CvAtsPayload {
  file: string | ArrayBuffer;
  jobDesc: string;
  modelProvider?: string;
  modelVersion?: string;
  promptOption?: BuildPromptOptions;
}

export interface CvAtsResponse {
  text: string;
  matchScore: number; // 0-100

  matchedKeywords: string[];
  missingKeywords: string[];

  sections: {
    summary: SectionAnalysis;
    experience: SectionAnalysis;
    education?: SectionAnalysis;
    skills: SectionAnalysis;
    projects?: SectionAnalysis;
    certifications?: SectionAnalysis;
    additional?: SectionAnalysis;
  };

  sectionScores: {
    summary: number;
    experience: number;
    education?: number;
    skills: number;
    projects?: number;
    certifications?: number;
    additional?: number;
  };

  recommendations: string[];

  warnings: string[];

  fitLevel?: 'Low' | 'Medium' | 'High';

  skillAnalysis?: {
    hardSkills: string[];
    softSkills: string[];
    languageSkills?: string[];
  };
}

export interface SectionAnalysis {
  content: string;
  score: number;
  highlights: string[];
  issues: string[];
}
