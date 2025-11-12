import { PromptLanguage } from '@smartcv/types';

/**
 * Define las reglas estrictas que la IA debe seguir para generar un JSON
 * que coincida con la interfaz 'CvAtsResponse'.
 */
const strictATSRulesTexts: Record<PromptLanguage, string> = {
  english: `Strict rules:
- The output MUST be only a strict, valid JSON object, without any introductory text, markdown formatting ("\`\`\`json"), notes, or trailing explanations.
- The tone must be that of a professional recruiter/analyst (third person). The goal is to analyze the CV against the job, not rewrite the CV.
- All analysis ("highlights", "issues", "recommendations") must be based *strictly* on the provided "BASE CV" and "JOB DESCRIPTION". Do not invent skills or experiences.
- "matchScore" must be a single integer (0-100) representing the overall fit.
- "fitLevel" must be one of 'Low', 'Medium', or 'High', based on the "matchScore".
- "matchedKeywords" must be keywords from the "JOB DESCRIPTION" that were found in the "BASE CV".
- "missingKeywords" must be important keywords from the "JOB DESCRIPTION" that were NOT found in the "BASE CV".
- In the "sections" object:
  - "content" MUST be the exact, verbatim text extracted from the corresponding CV section.
  - "score" MUST be an integer (0-100) analyzing that specific section against the job description.
  - "highlights" and "issues" must be short analysis phrases, not CV achievement bullets.
- The values in the "sectionScores" object (e.g., "sectionScores.summary") MUST exactly match the "score" values inside the "sections" object (e.g., "sections.summary.score").
- "recommendations" must be 2-3 actionable tips for the user to improve their CV *for this specific job*.
- "warnings" must only list objective issues regarding ATS formatting (e.g., "Inconsistent date format in experience").
- If a section (like "education" or "projects") is not found in the CV, omit it from the "sections" and "sectionScores" objects.`,

  spanish: `Reglas estrictas:
- La salida DEBE ser únicamente un objeto JSON válido y estricto, sin texto introductorio, formato markdown ("\`\`\`json"), notas o explicaciones finales.
- El tono debe ser de un analista/reclutador profesional (tercera persona). El objetivo es analizar el CV contra la oferta, no reescribir el CV.
- Todo el análisis ("highlights", "issues", "recommendations") debe basarse *estrictamente* en el "CV BASE" y la "OFERTA LABORAL" provistos. No inventes habilidades o experiencias.
- "matchScore" debe ser un único número entero (0-100) que represente el 'fit' general.
- "fitLevel" debe ser uno de: 'Low', 'Medium', 'High', basado en el "matchScore".
- "matchedKeywords" debe ser una lista de palabras clave de la "OFERTA LABORAL" que SÍ se encontraron en el "CV BASE".
- "missingKeywords" debe ser una lista de palabras clave importantes de la "OFERTA LABORAL" que NO se encontraron en el "CV BASE".
- En el objeto "sections":
  - La clave "content" DEBE ser el texto EXACTO (verbatim) extraído de la sección correspondiente del CV.
  - La clave "score" DEBE ser un entero (0-100) que analiza esa sección específica contra la oferta.
  - "highlights" (puntos positivos) y "issues" (puntos a mejorar) deben ser frases de análisis cortas, no bullets de logros del CV.
- Los valores en el objeto "sectionScores" (ej. "sectionScores.summary") DEBEN coincidir exactamente con los valores "score" dentro de cada objeto en "sections" (ej. "sections.summary.score").
- "recommendations" deben ser 2-3 consejos accionables para que el usuario mejore su CV *para esta oferta específica*.
- "warnings" debe listar solo problemas objetivos de formato ATS (ej. "Formato de fechas inconsistente en experiencia").
- Si una sección (como "education" o "projects") no se encuentra en el CV, omítela de los objetos "sections" y "sectionScores".`,
};

/**
 * Obtiene las reglas estrictas para el prompt de ATS en el idioma especificado.
 * @param lang Idioma ('es' o 'en')
 * @returns Un string con las reglas.
 */
export function getATStrictRules(lang: PromptLanguage): string {
  return strictATSRulesTexts[lang];
}
