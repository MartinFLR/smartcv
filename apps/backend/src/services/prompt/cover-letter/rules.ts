import { PromptLanguage } from '@smartcv/shared';

const strictCoverLetterRulesTexts: Record<PromptLanguage, string> = {
  english: `Strict rules:
- Write in first person with a professional IT tone.
- Focus on achievements, skills, and technologies present in the CV.
- Follow a clear structure: introduction, motivation, relevant experience, and closing.
- Demonstrate genuine interest in the company and role.
- Highlight results and contributions relevant to the job.
- Avoid generic phrases; use confident and authentic language.
- Ensure correct spelling, grammar, and punctuation.
- Output must be strict valid JSON, no markdown, bold, emojis, or extra text.
- Keep it concise: ideally under 300 words, one page.
- Naturally integrate key terms from the job description without keyword stuffing.`,

  spanish: `Reglas estrictas:
- Escribe en primera persona, tono profesional IT.
- Enfócate en logros, skills y tecnologías presentes en el CV.
- Usa una estructura clara: introducción, motivación, experiencia relevante y cierre.
- Demuestra interés genuino en la empresa y el puesto.
- Destaca resultados y contribuciones relevantes para el puesto.
- Evita frases genéricas; usa un lenguaje seguro y auténtico.
- Asegúrate de ortografía, gramática y puntuación correctas.
- Salida sin markdown, negritas, emojis ni texto extra.
- Sé conciso: idealmente menos de 300 palabras.
- Integra palabras clave de la oferta de manera natural, sin forzar keywords.`,
};

export function getCoverLetterStrictRules(lang: PromptLanguage) {
  return strictCoverLetterRulesTexts[lang];
}
