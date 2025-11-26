import { PromptLanguage } from '@smartcv/types';

export function getATSInputOutputTemplate(lang: PromptLanguage) {
  if (lang === 'english') {
    return `
Output (strict JSON only):
{
  "text": "A brief (2-3 sentences) AI analysis summary, highlighting the candidate's overall fit for the offer.",
  "matchScore": "An integer between 0 and 100 representing the overall match score.",
  "matchedKeywords": ["List of 5-10 key keywords from the job offer found in the CV"],
  "missingKeywords": ["List of 3-5 key keywords from the job offer NOT found in the CV"],
  "sections": {
    "summary": {
      "content": "The 'summary' or 'profile' text extracted verbatim from the CV.",
      "score": "Score (0-100) for this section based on relevance to the job description.",
      "highlights": ["1-2 positive points about this section."],
      "issues": ["1-2 weak points or missing elements in this section."]
    },
    "experience": {
      "content": "The 'experience' text extracted verbatim from the CV.",
      "score": "Score (0-100) for this section.",
      "highlights": ["Positive point (e.g., 'Quantifies achievements')."],
      "issues": ["Weak point (e.g., 'Inconsistent dates')."]
    },
    "education": {
      "content": "The 'education' text extracted verbatim from the CV.",
      "score": "Score (0-100) for this section.",
      "highlights": [],
      "issues": []
    },
    "skills": {
      "content": "The 'skills' text extracted verbatim from the CV.",
      "score": "Score (0-100) for this section.",
      "highlights": ["Good balance of hard/soft skills."],
      "issues": ["Missing key skills from the job offer."]
    }
  },
  "sectionScores": {
    "summary": "The same integer (int) as 'sections.summary.score'",
    "experience": "The same integer (int) as 'sections.experience.score'",
    "education": "The same integer (int) as 'sections.education.score' (or 0 if non-existent)",
    "skills": "The same integer (int) as 'sections.skills.score'"
  },
  "recommendations": [
    "Actionable recommendation 1 to improve the 'matchScore'.",
    "Actionable recommendation 2.",
    "Actionable recommendation 3."
  ],
  "warnings": [
    "Warning 1 about formatting or inconsistencies (e.g., 'Inconsistent dates').",
    "Warning 2 (if applicable)."
  ],
  "fitLevel": "One of: 'Low', 'Medium', 'High' (based on matchScore).",
  "skillAnalysis": {
    "hardSkills": ["List of relevant hard skills detected."],
    "softSkills": ["List of relevant soft skills detected."],
    "languageSkills": ["List of languages detected (if applicable)."]
  }
}`;
  } else {
    return `
Salida (solo JSON válido):
{
  "text": "Un resumen breve (2-3 frases) del análisis, destacando el 'fit' general del candidato para la oferta.",
  "matchScore": "Un número entero entre 0 y 100 que represente el 'match' general.",
  "matchedKeywords": ["Lista de 5-10 keywords clave de la oferta encontradas en el CV"],
  "missingKeywords": ["Lista de 3-5 keywords clave de la oferta NO encontradas en el CV"],
  "sections": {
    "summary": {
      "content": "El texto del 'resumen' o 'perfil' extraído textualmente del CV.",
      "score": "Puntuación (0-100) para esta sección basada en la relevancia para la oferta.",
      "highlights": ["1-2 puntos positivos de esta sección."],
      "issues": ["1-2 puntos débiles o faltantes de esta sección."]
    },
    "experience": {
      "content": "El texto de 'experiencia' extraído textualmente del CV.",
      "score": "Puntuación (0-100) para esta sección.",
      "highlights": ["Punto positivo (ej. 'Cuantifica logros')."],
      "issues": ["Punto débil (ej. 'Fechas inconsistentes')."]
    },
    "education": {
      "content": "El texto de 'educación' extraído textualmente del CV.",
      "score": "Puntuación (0-100) para esta sección.",
      "highlights": [],
      "issues": []
    },
    "skills": {
      "content": "El texto de 'habilidades' extraído textualmente del CV.",
      "score": "Puntuación (0-100) para esta sección.",
      "highlights": ["Buen balance de hard/soft skills."],
      "issues": ["Faltan skills clave de la oferta."]
    }
  },
  "sectionScores": {
    "summary": "El mismo número (int) que 'sections.summary.score'",
    "experience": "El mismo número (int) que 'sections.experience.score'",
    "education": "El mismo número (int) que 'sections.education.score' (o 0 si no existe)",
    "skills": "El mismo número (int) que 'sections.skills.score'"
  },
  "recommendations": [
    "Recomendación accionable 1 para mejorar el 'matchScore'.",
    "Recomendación accionable 2.",
    "Recomendación accionable 3."
  ],
  "warnings": [
    "Alerta 1 sobre formato o inconsistencias (ej. 'Fechas inconsistentes').",
    "Alerta 2 (si aplica)."
  ],
  "fitLevel": "Uno de: 'Low', 'Medium', 'High' (basado en el matchScore).",
  "skillAnalysis": {
    "hardSkills": ["Lista de hard skills relevantes detectadas."],
    "softSkills": ["Lista de soft skills relevantes detectadas."],
    "languageSkills": ["Lista de idiomas detectados (si aplica)."]
  }
}`;
  }
}
