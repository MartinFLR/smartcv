import { PromptLanguage } from '../../../shared/types/promptTypes';

export function getMainTasks(lang: PromptLanguage, jobTitle: string) {
  if (lang === 'en') {
    return `
Main tasks:
1. Carefully analyze the base CV and the job description "${jobTitle}".
2. Optimize the CV according to exaggeration instructions.
3. Include measurable results whenever possible.
4. Adapt achievements and skills for compatibility with the job.
5. Rewrite achievements using Action + Technology + Result.
6. Prioritize exact keywords from the job description to pass ATS filters.
7. Place keywords strategically in profile, experience, and education bullets.
8. Ensure clarity and ATS readability.
9. Fit content in a single page and maintain chronological consistency.`;
  } else {
    return `
**Tareas principales:**
1. Analiza cuidadosamente el CV base y la descripción del puesto "${jobTitle}".
2. Optimiza el CV según las instrucciones de exageración.
3. Introduce métricas cuantificables siempre que sea posible.
4. Adapta logros y habilidades para reflejar compatibilidad con el puesto.
5. Reescribe logros usando Acción + Tecnología + Resultado.
6. Prioriza keywords exactas de la oferta para pasar filtros ATS.
7. Coloca keywords estratégicamente en perfil, experiencia y educación.
8. Prioriza claridad y legibilidad ATS.
9. Todo el contenido debe caber en una sola página y mantener coherencia temporal.`;
  }
}
