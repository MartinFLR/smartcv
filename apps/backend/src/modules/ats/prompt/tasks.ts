import { PromptLanguage } from '@smartcv/types';

const atsTasks: Record<PromptLanguage, () => string> = {
  english: () => `
Main Tasks:
1. Perform a deep comparative analysis between the "BASE CV" and the "JOB DESCRIPTION".
2. Calculate a "matchScore" (integer 0-100) based on the overall match (experience, skills, education, and keywords).
3. Extract "matchedKeywords" (key requirements from the job description that ARE present in the CV) and "missingKeywords" (key requirements from the job description that are NOT present in the CV).
4. For each main section (summary, experience, education, skills, projects):
    a. Extract the exact "content" (verbatim text) from the CV for that section.
    b. Assign a "score" (integer 0-100) based on its relevance, quality, and alignment with the job description.
    c. Write 1-2 objective "highlights" (positive points) and "issues" (weak points or gaps).
    d. If a section is not found in the CV (e.g., 'projects'), omit it from the "sections" object.
5. Populate the "sectionScores" object. The values MUST exactly match the scores generated in Task 4.
6. Determine the "fitLevel" ('Low', 'Medium', or 'High') based on the "matchScore".
7. Generate 2-3 highly specific, actionable "recommendations" for the candidate to improve their CV *for this specific job*.
8. Identify objective "warnings" only related to ATS formatting or critical inconsistencies (e.g., "Inconsistent date formats").
9. Populate "skillAnalysis" by categorizing skills found in the CV into "hardSkills" and "softSkills".
10. Ensure the final output is *only* the strict JSON object requested, adhering to all rules.`,

  spanish: () => `
**Tareas principales:**
1. Realizar un análisis comparativo profundo entre el "CV BASE" y la "OFERTA LABORAL".
2. Calcular un "matchScore" (entero 0-100) basado en la coincidencia general (experiencia, habilidades, educación y palabras clave).
3. Extraer "matchedKeywords" (palabras clave de la oferta que SÍ están en el CV) y "missingKeywords" (palabras clave de la oferta que NO están en el CV).
4. Para cada sección principal (summary, experience, education, skills, projects):
    a. Extraer el "content" (texto *verbatim*) del CV para esa sección.
    b. Asignar un "score" (entero 0-100) basado en su relevancia, calidad y alineación con la oferta.
    c. Escribir 1-2 "highlights" (puntos positivos) y "issues" (puntos a mejorar) objetivos.
    d. Si una sección no se encuentra en el CV (ej. 'projects'), omitirla del objeto "sections".
5. Rellenar el objeto "sectionScores". Los valores DEBEN coincidir exactamente con los "score" generados en la Tarea 4.
6. Determinar el "fitLevel" ('Low', 'Medium', o 'High') basado en el "matchScore".
7. Generar 2-3 "recommendations" específicas y accionables para que el candidato mejore su CV *para esta oferta concreta*.
8. Identificar "warnings" objetivos, solo relacionados con formato ATS o inconsistencias críticas (ej. "Formatos de fecha inconsistentes").
9. Rellenar "skillAnalysis" categorizando las habilidades encontradas en el CV en "hardSkills" y "softSkills".
10. Asegurar que la salida final sea *únicamente* el objeto JSON estricto solicitado, adhiriéndose a todas las reglas.`,
};

export function getATSMainTasks(lang: PromptLanguage): string {
  return atsTasks[lang]();
}
