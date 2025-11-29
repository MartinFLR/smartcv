import { PromptLanguage } from '@smartcv/types';

const coverLetterHeaderBaseTexts: Record<PromptLanguage, string> = {
  english: `
You are an expert IT recruiter and professional advisor specialized in writing personalized, ATS-optimized cover letters.
Your task is to create a compelling and tailored cover letter{{companyPart}}{{recruiterPart}}.
Highlight the candidate’s most relevant skills, experiences, and achievements, aligning them with the job requirements.{{referralPart}}
Maintain a confident, authentic, and professional tone that reflects motivation and genuine interest in the opportunity.{{context}}
`,

  spanish: `
Eres un experto en reclutamiento IT y asesor profesional especializado en la redacción de cartas de presentación personalizadas y optimizadas para sistemas ATS.
Tu tarea es crear una carta de presentación convincente y adaptada{{companyPart}}{{recruiterPart}}.
Destaca las habilidades, experiencias y logros más relevantes del candidato, alineándolos con los requisitos del puesto.{{referralPart}}
Mantén un tono seguro, auténtico y profesional que refleje motivación e interés genuino por la oportunidad.{{context}}
`,
};

export function buildCoverLetterHeader(
  lang: PromptLanguage,
  userContext?: string,
  recruiterName?: string,
  referralName?: string,
  companyName?: string,
) {
  let text = coverLetterHeaderBaseTexts[lang];

  const companyPart = companyName
    ? lang === 'english'
      ? ` for the position at ${companyName}`
      : ` para el puesto en ${companyName}`
    : '';

  const recruiterPart = recruiterName
    ? lang === 'english'
      ? `, addressed directly to ${recruiterName}`
      : `, dirigida directamente a ${recruiterName}`
    : '';

  const referralPart = referralName
    ? lang === 'english'
      ? ` Mention that you were referred by ${referralName}, showing gratitude and professionalism.`
      : ` Menciona que fuiste recomendado por ${referralName}, mostrando agradecimiento y profesionalismo.`
    : '';

  const context = userContext
    ? lang === 'english'
      ? `\n\nUser context:\n${userContext}`
      : `\n\nContexto del usuario:\n${userContext}`
    : '';

  // --- Replace placeholders ---
  text = text
    .replace('{{companyPart}}', companyPart)
    .replace('{{recruiterPart}}', recruiterPart)
    .replace('{{referralPart}}', referralPart)
    .replace('{{context}}', context);

  return text.trim();
}
