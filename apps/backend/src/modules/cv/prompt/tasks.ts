import { PromptLanguage } from '@smartcv/types';

export function getCVMainTasks(lang: PromptLanguage) {
  if (lang === 'english') {
    return `
Main tasks:
1. Carefully analyze the base CV and the job description.
2. Optimize the CV according to exaggeration instructions.
3. Include measurable results whenever possible.
4. Adapt achievements and skills for compatibility with the job.
5. Rewrite achievements using Action + Technology + Result.
6. Prioritize exact keywords from the job description to pass ATS filters.
7. Place keywords strategically in profile, experience, and education bullets.
8. Ensure clarity and ATS readability.
9. Keep the professional profile concise (80–150 words), emphasizing relevant experience, key skills, and achievements aligned with the job description.
10. Ensure the CV reads naturally and convincingly, like it was written by a human. Avoid overly generic phrases or AI-like patterns, while keeping information truthful.
`;
  } else {
    return `
**Tareas principales:**
1. Analiza cuidadosamente el CV base y la descripción del puesto.
2. Optimiza el CV según las instrucciones de exageración.
3. Introduce métricas cuantificables siempre que sea posible.
4. Adapta logros y habilidades para reflejar compatibilidad con el puesto.
5. Reescribe logros usando Acción + Tecnología + Resultado.
6. Prioriza keywords exactas de la oferta para pasar filtros ATS.
7. Coloca keywords estratégicamente en perfil, experiencia y educación.
8. Prioriza claridad y legibilidad ATS.
9. Mantén la seccion "perfil profesional" concisa, de 120 a 150 palabras y con forma de "narracion" de experiencias.
10. Asegúrate de que el CV se lea de manera natural y convincente, como si lo hubiera escrito una persona. Evita frases genéricas o patrones típicos de IA, manteniendo la información veraz.
`;
  }
}
