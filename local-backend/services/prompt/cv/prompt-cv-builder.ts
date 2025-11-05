import {
  BuildPromptOptions,
  DeliveryChannel,
  PromptLanguage,
  PromptType,
  TemperatureLevel
} from '../../../../shared/types/PromptTypes';
import { getExaggeration } from './exaggeration';
import {getCoverLetterStrictRules, getCVStrictRules} from './rules';
import {getCoverLetterMainTasks, getCVMainTasks} from './tasks';
import {getCoverLetterInputOutputTemplate, getInputOutputTemplate} from './inputOutput';
import {getCoverLetterDeliveryChannelText} from './deliveryChannel';
import {getCoverLetterToneText} from './tone';

export function buildHeader(lang: PromptLanguage, userContext?: string) {
  const context = userContext ? `\n\nUser context:\n${userContext}` : '';
  if (lang === 'en') return `Act as an IT recruitment expert and ATS-friendly CV optimizer.${context}`;
  return `Actúa como un experto en reclutamiento IT y optimización de CVs para sistemas ATS.${context}`;
}

export function buildCoverLetterHeader(
  lang: PromptLanguage,
  userContext?: string,
  recruiterName?: string,
  referralName?: string,
  companyName?: string
) {
  const context = userContext ? `\n\nUser context:\n${userContext}` : '';

  // --- ENGLISH VERSION ---
  if (lang === 'en') {
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



export function buildPrompt(
  baseCv: string,
  jobDesc: string,
  jobTitle: string,
  options?: BuildPromptOptions
): string {
  const lang: PromptLanguage = options?.lang || 'es';
  const type: PromptType = options?.type || 'tailoredCv';
  const temperature: TemperatureLevel = options?.temperature || 'low';
  const deliveryChannel: DeliveryChannel = options?.deliveryChannel || 'linkedinMessage';

  const tone = options?.tone || 'formal';
  const recruiterName = options?.recruiterName || '';
  const companyName = options?.companyName || '';
  const referralName = options?.referralName || '';

  const userContext = options?.userContext;

  const exaggeration = getExaggeration(temperature, lang);

  if (type === 'tailoredCv') {
    return [
      buildHeader(lang, userContext),
      `Exaggeration instructions: ${exaggeration}`,
      getCVMainTasks(lang, jobTitle),
      getCVStrictRules(lang),
      getInputOutputTemplate(baseCv, jobDesc, lang)
    ].join('\n\n');
  }
  if (type === 'coverLetter') {
    console.log(buildCoverLetterHeader(lang, userContext,recruiterName,referralName,companyName),
      getCoverLetterToneText(lang,tone),
      getCoverLetterDeliveryChannelText(lang,deliveryChannel),
      getCoverLetterMainTasks(lang, jobTitle),
      getCoverLetterStrictRules(lang),
      getCoverLetterInputOutputTemplate(baseCv, jobDesc, lang))
    return [
      buildCoverLetterHeader(lang, userContext,recruiterName,referralName,companyName),
      getCoverLetterToneText(lang,tone),
      getCoverLetterDeliveryChannelText(lang,deliveryChannel),
      getCoverLetterMainTasks(lang, jobTitle),
      getCoverLetterStrictRules(lang),
      getCoverLetterInputOutputTemplate(baseCv, jobDesc, lang)
    ].join('\n\n');
  }

  return `Error: prompt type "${type}" or language "${lang}" not implemented.`;
}
