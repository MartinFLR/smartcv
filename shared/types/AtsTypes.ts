import {BuildPromptOptions} from './PromptTypes';

export type SectionScoreItem = [string, number];

export interface CvAtsPayload{
  file: string | ArrayBuffer;
  jobDesc: string,
  modelProvider?: string,
  modelVersion?: string,
  promptOption? :BuildPromptOptions
}

export interface CvAtsResponse {
  text: string;

  // Coincidencia general con la oferta (%)
  matchScore: number; // 0-100

  // Keywords detectadas en el CV vs oferta
  matchedKeywords: string[];   // palabras clave encontradas en el CV
  missingKeywords: string[];   // palabras clave importantes de la oferta que no aparecen

  // Evaluación de secciones del CV
  sections: {
    summary: SectionAnalysis;
    experience: SectionAnalysis;
    education?: SectionAnalysis;
    skills: SectionAnalysis;
    projects?: SectionAnalysis;
    certifications?: SectionAnalysis;
    additional?: SectionAnalysis;
  };

  // Puntuación de cada sección (0-100)
  sectionScores: {
    summary: number;
    experience: number;
    education?: number;
    skills: number;
    projects?: number;
    certifications?: number;
    additional?: number;
  };

  // Recomendaciones concretas de mejora
  recommendations: string[];

  // Alertas de formato o ATS-friendliness
  warnings: string[];

  // Nivel de adecuación al puesto
  fitLevel?: 'Low' | 'Medium' | 'High';

  // Habilidades soft / hard categorizadas (opcional)
  skillAnalysis?: {
    hardSkills: string[];
    softSkills: string[];
    languageSkills?: string[];
  };
}

export interface SectionAnalysis {
  content: string;        // el texto que se analizó de esa sección
  score: number;          // puntuación de 0-100
  highlights: string[];   // puntos positivos detectados
  issues: string[];       // puntos negativos detectados
}
