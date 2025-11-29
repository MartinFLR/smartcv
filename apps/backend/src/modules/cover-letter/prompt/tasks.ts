import { PromptLanguage } from '@smartcv/types';

const coverLetterMainTasksTexts: Record<PromptLanguage, string> = {
  english: `
- Carefully analyze the base CV and the job description.
- Write a professional cover letter aligned with the target role and the communication channel.
- Highlight the achievements and skills most relevant to the position.
- Demonstrate genuine interest in the company and the role.
- Integrate keywords from the job description naturally (ATS-friendly).
- Ensure coherence, readability, and grammatical accuracy.
- Make the cover letter feel personal and human, as if written directly to the recruiter. Avoid generic or AI-like phrasing while maintaining professionalism and truthfulness.
`,

  spanish: `
- Analiza cuidadosamente el CV base y la descripción del puesto.
- Redacta una carta de presentación profesional alineada con el puesto objetivo y el canal de comunicación.
- Destaca logros y habilidades más relevantes para el puesto.
- Demuestra interés genuino en la empresa y el rol.
- Integra palabras clave de la oferta de manera natural (compatible con filtros ATS).
- Asegura coherencia, buena legibilidad y corrección gramatical.
- Haz que la carta de presentación se sienta personal y humana, escrita como si fuera dirigida directamente al reclutador. Evita frases genéricas o que parezcan generadas por IA, manteniendo profesionalismo y veracidad.
`,
};

export function getCoverLetterMainTasks(lang: PromptLanguage) {
  return coverLetterMainTasksTexts[lang];
}
