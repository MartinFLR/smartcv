import { PromptLanguage } from '../../../../shared/types/PromptTypes';

export function getCoverLetterMainTasks(lang: PromptLanguage) {
  if (lang === 'english') {
    return `
Main tasks:
1. Carefully analyze the base CV and the job description.
2. Write a professional cover letter aligned with the target role.
3. Use a clear structure: introduction, motivation, relevant experience, and closing.
4. Highlight achievements and skills most relevant to the job.
5. Demonstrate genuine interest in the company and role.
6. Maintain a confident, positive, and authentic tone.
7. Integrate key terms from the job description naturally (for ATS compatibility).
8. Keep it concise — ideally under 300 words and one page.
9. Ensure coherence, readability, and grammatical accuracy.`;
  } else {
    return `
**Tareas principales:**
1. Analiza cuidadosamente el CV base y la descripción del puesto.
2. Redacta una carta de presentación profesional alineada con el puesto objetivo.
3. Usa una estructura clara: introducción, motivación, experiencia relevante y cierre.
4. Destaca logros y habilidades más relevantes para el puesto.
5. Demuestra interés genuino en la empresa y el rol.
6. Mantén un tono seguro, positivo y auténtico.
7. Integra palabras clave de la oferta de manera natural (compatible con filtros ATS).
8. Sé conciso: idealmente menos de 300 palabras y una sola página.
9. Asegura coherencia, buena legibilidad y corrección gramatical.`;
  }
}
