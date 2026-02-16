import { CvForm, CvProfile } from '@smartcv/types'; // Ajusta el import según tu alias

export const MOCK_CV_FORM: CvForm = {
  personalInfo: {
    name: 'Martín Desarrollador',
    job: 'Senior Frontend Engineer',
    email: 'martin@example.com',
    phone: '+54 9 11 1234 5678',
    location: 'Buenos Aires, Argentina',
    linkedin: 'linkedin.com/in/martin-dev',
    github: 'github.com/martin-dev',
    web: 'martindev.com',
    photo: null,
    profileSummary:
      'Ingeniero de software con más de 6 años de experiencia especializado en Angular y ecosistemas modernos de JavaScript. Apasionado por la UI/UX y la optimización de rendimiento.',
  },
  experience: [
    {
      role: 'Tech Lead Frontend',
      company: 'Tech Solutions Inc.',
      dateIn: '2021-03',
      dateFin: null, // Actualmente trabajando
      bullets:
        'Lideré la migración de una aplicación monolítica a micro-frontends.\nMejoré el Core Web Vitals en un 40%.\nMentoreé a 3 desarrolladores junior.',
    },
    {
      role: 'Frontend Developer',
      company: 'StartUp Veloz',
      dateIn: '2018-06',
      dateFin: '2021-02',
      bullets:
        'Desarrollé componentes reutilizables con Angular Material.\nImplementé NgRx para la gestión de estado global.',
    },
  ],
  education: [
    {
      title: 'Ingeniería en Sistemas',
      institution: 'Universidad Tecnológica Nacional',
      dateIn: '2014',
      dateFin: '2019',
      bullets: 'Promedio: 8.5. Tesis sobre Inteligencia Artificial aplicada a finanzas.',
    },
  ],
  projects: [
    {
      name: 'SmartCV',
      subtitle: 'Optimizador de CV con IA',
      dateIn: '2023-01',
      dateFin: null,
      bullets:
        'Aplicación fullstack utilizando Angular 18, NestJS y OpenAI API.\nImplementación de arquitectura hexagonal.',
    },
  ],
  skills: [
    {
      skills: ['Angular', 'TypeScript', 'RxJS', 'Tailwind CSS', 'Jest'],
      languages: ['Español (Nativo)', 'Inglés (C1)'],
      certifications: [
        {
          name: 'Google Cloud Associate Engineer',
          date: '2022',
        },
      ],
      additional: ['Scrum Master Certified', 'Public Speaking'],
    },
  ],
};

export const MOCK_CV_PROFILE: CvProfile = {
  id: 'uuid-1234-5678',
  name: 'Perfil Fullstack',
  jobTitle: 'Senior Developer',
  data: MOCK_CV_FORM,
};
