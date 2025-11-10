import { PromptLanguage } from '@smartcv/shared';

export function buildCoverLetterHeader(
  lang: PromptLanguage,
  userContext?: string,
  recruiterName?: string,
  referralName?: string,
  companyName?: string,
) {
  const context = userContext ? `\n\nUser context:\n${userContext}` : '';

  // --- ENGLISH VERSION ---
  if (lang === 'english') {
    const companyPart = companyName ? ` for the position at ${companyName}` : '';
    const recruiterPart = recruiterName ? `, addressing it directly to ${recruiterName}` : '';
    const referralPart = referralName
      ? ` Mention that you were referred by ${referralName}, showing gratitude and professionalism.`
      : '';

    return `You are an expert IT recruiter and professional career coach specialized in writing personalized, ATS-optimized cover letters.
Your task is to craft a compelling and tailored cover letter${companyPart}${recruiterPart}.
Highlight the candidate’s most relevant skills, experiences, and achievements, aligning them with the job requirements.${referralPart}
Maintain a confident, authentic, and professional tone that reflects motivation and genuine interest in the role.${context}`;
  }

  // --- SPANISH VERSION ---
  const companyPartEs = companyName ? ` para el puesto en ${companyName}` : '';
  const recruiterPartEs = recruiterName ? `, dirigida directamente a ${recruiterName}` : '';
  const referralPartEs = referralName
    ? ` Menciona que fuiste recomendado por ${referralName}, mostrando agradecimiento y profesionalismo.`
    : '';

  return `Eres un experto en reclutamiento IT y asesor profesional especializado en la redacción de cartas de presentación personalizadas y optimizadas para sistemas ATS.
Tu tarea es crear una carta de presentación convincente y adaptada${companyPartEs}${recruiterPartEs}.
Destaca las habilidades, experiencias y logros más relevantes del candidato, alineándolos con los requisitos del puesto.${referralPartEs}
Mantén un tono seguro, auténtico y profesional que refleje motivación e interés genuino por la oportunidad.${context}`;
}
