import { PromptLanguage } from '@smartcv/types';

export function getCoverLetterMainTasks(lang: PromptLanguage) {
  if (lang === 'english') {
    return `
1. Carefully analyze the base CV and the job description.
2. Write a professional cover letter aligned with the target role.
3. Use a clear structure: introduction, motivation, relevant experience, and closing.
4. Highlight achievements and skills most relevant to the job.
5. Demonstrate genuine interest in the company and role.
6. Maintain a positive, and authentic tone.
7. Integrate key terms from the job description naturally (for ATS compatibility).
8. Ensure coherence, readability, and grammatical accuracy.
9. Ensure the cover letter feels personal and human, written as if directly to the recruiter. Avoid generic or AI-like phrasing while remaining professional and truthful.
`;
  } else {
    return `
1. Analiza cuidadosamente el CV base y la descripción del puesto.
2. Redacta una carta de presentación profesional alineada con el puesto objetivo y el canal de comunicación.
3. Destaca logros y habilidades más relevantes para el puesto.
4. Demuestra interés genuino en la empresa y el rol.
5. Integra palabras clave de la oferta de manera natural (compatible con filtros ATS).
6. Asegura coherencia, buena legibilidad y corrección gramatical.
7. Haz que la carta de presentación se sienta personal y humana, escrita como si fuera dirigida directamente al reclutador. Evita frases genéricas o que parezcan generadas por IA, manteniendo profesionalismo y veracidad.
`;
  }
}
