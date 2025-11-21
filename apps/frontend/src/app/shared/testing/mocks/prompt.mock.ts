import { CvAtsPayload, CvAtsResponse } from '@smartcv/types';

export const MOCK_CV_ATS_PAYLOAD: CvAtsPayload = {
  file: 'base64string...',
  jobDesc: 'We are looking for an Angular expert...',
  aiSettings: {
    modelProvider: 'openai',
    modelVersion: 'gpt-4o',
  },
};

export const MOCK_CV_ATS_RESPONSE: CvAtsResponse = {
  text: 'Texto extraído del PDF...',
  matchScore: 85,
  fitLevel: 'High',
  matchedKeywords: ['Angular', 'TypeScript', 'Micro-frontends', 'Performance'],
  missingKeywords: ['GraphQL', 'CI/CD Pipelines', 'Kubernetes'],

  sections: {
    summary: {
      content: 'El resumen es fuerte pero podría enfatizar más resultados de negocio.',
      score: 90,
      highlights: ['Clara propuesta de valor', 'Mención de años de experiencia'],
      issues: ['Falta mencionar logros cuantificables en dólares'],
    },
    experience: {
      content: 'La experiencia es relevante pero los bullets son muy largos.',
      score: 80,
      highlights: ['Uso de verbos de acción'],
      issues: ['Algunas fechas no tienen formato estándar'],
    },
    skills: {
      content: 'Buena lista de habilidades técnicas.',
      score: 95,
      highlights: ['Coincidencia exacta con la JD'],
      issues: [],
    },
    education: {
      content: 'Educación universitaria presente.',
      score: 100,
      highlights: [],
      issues: [],
    },
  },

  sectionScores: {
    summary: 90,
    experience: 80,
    education: 100,
    skills: 95,
    projects: 0,
    certifications: 70,
    additional: 60,
  },

  recommendations: [
    'Agregar palabras clave como Kubernetes para mejorar el match.',
    'Cuantificar el impacto en el proyecto SmartCV.',
    'Asegurar que el formato de fecha sea MM/YYYY consistentemente.',
  ],

  warnings: ['El documento contiene tablas que pueden confundir a algunos ATS antiguos.'],

  skillAnalysis: {
    hardSkills: ['Angular', 'TypeScript', 'NestJS', 'Docker'],
    softSkills: ['Liderazgo', 'Comunicación', 'Mentoring'],
    languageSkills: ['Inglés', 'Español'],
  },
};
