import { CvResponse, TransformedCvResponse } from '@smartcv/types';

export const MOCK_CV_RESPONSE: CvResponse = {
  profileSummary:
    'Ingeniero Frontend Senior altamente cualificado con experiencia probada en Angular y liderazgo técnico. Experto en optimización de rendimiento y arquitecturas escalables.',
  job: 'Senior Frontend Engineer',
  experience: [
    {
      role: 'Tech Lead Frontend',
      company: 'Tech Solutions Inc.',
      dateIn: '2021-03',
      dateFin: 'Presente',
      bullets: [
        'Orquesté la migración exitosa a micro-frontends, reduciendo el tiempo de despliegue en un 50%.',
        'Optimicé las métricas Core Web Vitals, logrando una mejora del 40% en LCP y CLS.',
        'Capacité y mentoreé a un equipo de 3 desarrolladores junior, promoviendo mejores prácticas de código.',
      ],
    },
  ],
  projects: [
    {
      name: 'SmartCV',
      subtitle: 'SaaS de Optimización de Talento',
      dateIn: '2023',
      dateFin: 'Presente',
      bullets: [
        'Diseñé y desarrollé una plataforma integral utilizando Angular y NestJS.',
        'Integré modelos de LLM para análisis de texto en tiempo real.',
      ],
    },
  ],
  education: [
    {
      title: 'Ingeniería en Sistemas',
      institution: 'UTN',
      dateIn: '2014',
      dateFin: '2019',
      bullets: ['Especialización en Ingeniería de Software.'],
    },
  ],
  skills: [
    {
      skills: ['Angular', 'Node.js', 'AWS', 'Docker'],
      languages: ['English (Professional)', 'Spanish (Native)'],
      certifications: [{ name: 'AWS Certified', date: '2023' }],
      additional: ['Agile Methodologies'],
    },
  ],
};

export const MOCK_TRANSFORMED_RESPONSE: TransformedCvResponse = {
  ...MOCK_CV_RESPONSE,
  experience: [
    {
      role: 'Tech Lead Frontend',
      company: 'Tech Solutions Inc.',
      bullets: 'Orquesté la migración...\nOptimicé las métricas...', // String unido
      dateIn: '2021-03',
      dateFin: null,
    },
  ],
  education: [],
  project: [],
};
