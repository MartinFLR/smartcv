import { PromptLanguage, ToneLevel } from '@smartcv/types';

const coverLetterToneTexts: Record<ToneLevel, Record<PromptLanguage, string>> = {
  formal: {
    english: `Use a formal and respectful tone, with precise language and well-structured sentences. Avoid contractions and maintain a professional distance. Ideal for traditional corporate positions.`,
    spanish: `Usa un tono formal y respetuoso, con un lenguaje preciso y oraciones bien estructuradas. Evita contracciones y mantén una distancia profesional. Ideal para puestos corporativos tradicionales.`,
  },

  enthusiast: {
    english: `Use an enthusiastic and positive tone that conveys genuine motivation and enthusiasm for the position. Keep it professional but energetic, showing passion and commitment.`,
    spanish: `Usa un tono entusiasta y positivo que transmita motivación genuina y entusiasmo por el puesto. Mantén la profesionalidad pero con energía, mostrando pasión y compromiso.`,
  },

  casual: {
    english: `Use a relaxed and approachable tone, similar to a natural conversation. Avoid excessive formality without losing professionalism. Ideal for startups or creative environments.`,
    spanish: `Usa un tono relajado y cercano, similar a una conversación natural. Evita la formalidad excesiva sin perder profesionalismo. Ideal para startups o entornos creativos.`,
  },

  neutral: {
    english: `Use a balanced and neutral tone: polite, professional, and direct. Avoid emotional extremes and maintain clarity and objectivity at all times.`,
    spanish: `Usa un tono equilibrado y neutro: cortés, profesional y directo. Evita los extremos emocionales y mantén claridad y objetividad en todo momento.`,
  },

  confident: {
    english: `Use a confident and assertive tone that reflects confidence and credibility. Highlight achievements and strengths naturally, without sounding arrogant.`,
    spanish: `Usa un tono seguro y asertivo que refleje confianza y credibilidad. Destaca logros y fortalezas de forma natural, sin sonar arrogante.`,
  },
};

export function getCoverLetterToneText(lang: PromptLanguage, tone: ToneLevel): string {
  const toneText = coverLetterToneTexts[tone];
  return toneText?.[lang] ?? coverLetterToneTexts.neutral[lang];
}
