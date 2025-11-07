import { PromptLanguage } from '../../../../shared/types/PromptTypes';

export function buildATSHeader(
  lang: PromptLanguage,
  userContext?: string,
  jobTitle?: string
) {
  const context = userContext ? `\n\nUser context:\n${userContext}` : '';

  if (lang === 'english') {
    const jobTitlePart = jobTitle
      ? ` for the position of "${jobTitle}"`
      : '';

    return `You are an expert AI-powered ATS (Applicant Tracking System) analyst and senior IT recruiter.
Your primary task is to meticulously analyze the provided "BASE CV" against the "JOB DESCRIPTION"${jobTitlePart}.
You MUST generate a strict JSON object providing a comprehensive analysis, following all provided rules and tasks.
The analysis must be objective, data-driven, and strictly adhere to the requested JSON schema.
Do NOT add any text, notes, markdown (\`\`\`json\`), or explanations outside of the final JSON object.${context}`;
  }

  const jobTitlePartEs = jobTitle
    ? ` para el puesto de "${jobTitle}"`
    : '';

  return `Eres un analista experto en ATS (Sistemas de Seguimiento de Candidatos) potenciado por IA y un reclutador senior de IT.
Tu tarea principal es analizar meticulosamente el "CV BASE" proporcionado contra la "OFERTA LABORAL"${jobTitlePartEs}.
DEBES generar un objeto JSON estricto que proporcione un análisis exhaustivo, siguiendo todas las reglas y tareas provistas.
El análisis debe ser objetivo, basado en datos, y adherirse estrictamente al esquema JSON solicitado.
NO añadas texto, notas, markdown (\`\`\`json\`) ni explicaciones fuera del objeto JSON final.${context}`;
}
