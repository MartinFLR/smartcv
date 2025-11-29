import { PromptLanguage } from '@smartcv/types';

const strictCoverLetterRulesTexts: Record<PromptLanguage, string> = {
  english: `
- Write in first person, with a professional IT tone.
- Focus on achievements, skills, and technologies present in the CV.
- Use a clear structure: introduction, motivation, relevant experience, and closing.
- Demonstrate genuine interest in the company and the role.
- Avoid generic phrases; use confident and authentic language.
- Ensure correct spelling, grammar, and punctuation.
- Output must not contain markdown, bold text, emojis, or extra content.
- Integrate keywords from the job description naturally, without forcing them.
- Respect the ideal word count for the delivery channel used.
`,

  spanish: `
- Escribe en primera persona, tono profesional IT.
- Enfócate en logros, skills y tecnologías presentes en el CV.
- Usa una estructura clara: introducción, motivación, experiencia relevante y cierre.
- Demuestra interés genuino en la empresa y el puesto.
- Evita frases genéricas; usa un lenguaje seguro y auténtico.
- Asegúrate de ortografía, gramática y puntuación correctas.
- Salida sin markdown, negritas, emojis ni texto extra.
- Integra palabras clave de la oferta de manera natural, sin forzar keywords.
- Respeta la cantidad de palabras del canal de comunicacion al que se va a enviar.
`,
};

export function getCoverLetterStrictRules(lang: PromptLanguage) {
  return strictCoverLetterRulesTexts[lang];
}
