import { PromptLanguage } from '../../../../shared/types/PromptTypes';

const strictCVRulesTexts: Record<PromptLanguage, string> = {
  english: `Strict rules:
- Write in first person, professional IT tone.
- Only include skills, achievements, and technologies present in the CV.
- Each bullet must start with an action verb and express a measurable result.
- Avoid weak verbs like "helped" or "participated"; use "designed", "implemented", "optimized".
- Ensure there are no spelling or grammar mistakes.
- Output must be strict valid JSON, no markdown, bold, emojis, or extra text.
- Max 25 words per bullet.
- Maintain semantic density and consistency in dates/titles.`,
  spanish: `Reglas estrictas:
- Escribe en primera persona, tono profesional IT.
- Incluye solo skills, logros y tecnologías presentes en el CV.
- Cada bullet debe iniciar con verbo de acción y expresar resultado medible.
- Evita verbos débiles como "ayudé" o "participé"; usa "diseñé", "implementé", "optimizé".
- Asegúrate de que no haya errores ortográficos ni gramaticales.
- Salida en JSON válido estricto, sin markdown, negritas, emojis ni texto extra.
- Máx. 25 palabras por bullet.
- Mantén consistencia en fechas y títulos.`,
};



export function getCVStrictRules(lang: PromptLanguage) {
  return strictCVRulesTexts[lang];
}



