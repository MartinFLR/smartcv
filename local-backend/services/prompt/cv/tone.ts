import { PromptLanguage, ToneLevel } from '../../../../shared/types/PromptTypes';

const coverLetterToneTexts: Record<ToneLevel, Record<PromptLanguage, string>> = {
  formal: {
    en: `Use a formal and respectful tone, with precise wording and structured sentences. Avoid contractions and maintain a professional distance. Ideal for traditional corporate roles.`,
    es: `Usa un tono formal y respetuoso, con un lenguaje preciso y oraciones bien estructuradas. Evita contracciones y mantén una distancia profesional. Ideal para puestos corporativos tradicionales.`,
  },

  enthusiast: {
    en: `Use an enthusiastic and positive tone that conveys genuine motivation and excitement about the role. Keep it professional but lively, showing passion and drive.`,
    es: `Usa un tono entusiasta y positivo que transmita motivación genuina y entusiasmo por el puesto. Mantén la profesionalidad pero con energía, mostrando pasión y compromiso.`,
  },

  casual: {
    en: `Use a relaxed and friendly tone, similar to natural conversation. Avoid excessive formality while keeping professionalism. Best suited for startups or creative environments.`,
    es: `Usa un tono relajado y cercano, similar a una conversación natural. Evita la formalidad excesiva sin perder profesionalismo. Ideal para startups o entornos creativos.`,
  },

  neutral: {
    en: `Use a balanced and neutral tone — polite, professional, and straightforward. Avoid emotional extremes and maintain clarity and objectivity throughout.`,
    es: `Usa un tono equilibrado y neutro: cortés, profesional y directo. Evita los extremos emocionales y mantén claridad y objetividad en todo momento.`,
  },

  confident: {
    en: `Use a confident and assertive tone that reflects self-assurance and credibility. Highlight achievements and strengths naturally, without arrogance.`,
    es: `Usa un tono seguro y asertivo que refleje confianza y credibilidad. Destaca logros y fortalezas de forma natural, sin sonar arrogante.`,
  },
};

export function getCoverLetterToneText(
  lang: PromptLanguage,
  tone: ToneLevel
): string {
  const toneText = coverLetterToneTexts[tone];
  return toneText?.[lang] ?? coverLetterToneTexts.neutral[lang];
}
