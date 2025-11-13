import { PromptLanguage } from '@smartcv/types';

export function getCvInputOutputTemplate(baseCv: string, jobDesc: string, lang: PromptLanguage) {
  if (lang === 'english') {
    return `
Input:
---BASE CV---
${baseCv}
---END BASE CV---

---JOB DESCRIPTION---
${jobDesc}
---END JOB DESCRIPTION---

Output (strict JSON):
{
  "profileSummary": "Brief optimized professional summary tailored to the job.",
  "job": "Job title optimized based on CV and job description.",
  "experience": [
    {
      "role": "Base CV role",
      "company": "Company name from base CV",
      "bullets": [
        "Relevant achievement adapted to the job.",
        "Another relevant achievement."
      ],
      "dateIn": "Start date",
      "dateFin": "End date"
    }
  ],
  "projects": [
    {
      "name": "Project name",
      "subtitle": "Optional subtitle or brief description",
      "bullets": [
        "Relevant result with technology used.",
        "Another relevant achievement."
      ],
      "dateIn": "Start date",
      "dateFin": "End date"
    }
  ],
  "education": [
    {
      "title": "Degree title",
      "institution": "Institution name",
      "bullets": [
        "Relevant detail adapted to the job."
      ],
      "dateIn": "Start date",
      "dateFin": "End date"
    }
  ],
  "skills": [
    {
      "skills": ["Relevant skill 1", "Relevant skill 2"],
      "languages": ["Language 1 from CV", "Language 2 from CV"],
      "certifications": [
        { "name": "Certification A", "date": "2024" },
        { "name": "Certification B", "date": "2023" }
      ],
      "additional": ["Methodologies, tools, or others"]
    }
  ]
}`;
  } else {
    return `
**Entrada**
---CV BASE---
${baseCv}
---FIN CV BASE---

---OFERTA LABORAL---
${jobDesc}
---FIN OFERTA LABORAL---

**Salida (solo JSON válido):**
{
  "profileSummary": "Resumen breve y optimizado del perfil profesional enfocado al puesto.",
  "job": "Título del puesto optimizado según oferta y perfil del candidato.",
  "experience": [
    {
      "role": "Título del puesto del CV base",
      "company": "Nombre de la empresa del CV base",
      "bullets": [
        "Logro relevante adaptado a la oferta.",
        "Otro logro relevante adaptado a la oferta."
      ],
      "dateIn": "Fecha de inicio del CV base",
      "dateFin": "Fecha de fin del CV base"
    }
  ],
  "projects": [
    {
      "name": "Nombre del proyecto",
      "subtitle": "Subtítulo opcional o breve descripción",
      "bullets": [
        "Logro o resultado relevante del proyecto con tecnología usada.",
        "Otro logro relevante del proyecto."
      ],
      "dateIn": "Fecha de inicio del proyecto",
      "dateFin": "Fecha de fin del proyecto"
    }
  ],
  "education": [
    {
      "title": "Título del grado",
      "institution": "Nombre de la institución",
      "bullets": [
        "Detalle relevante adaptado a la oferta."
      ],
      "dateIn": "Fecha de inicio del CV base",
      "dateFin": "Fecha de fin del CV base"
    }
  ],
  "skills": [
    {
      "skills": ["Skill1 relevante", "Skill2 relevante"],
      "languages": ["Lenguaje del CV base 1", "Lenguaje del CV base 2"],
      "certifications": [
        { "name": "Certificación A", "date": "2024" },
        { "name": "Certificación B", "date": "2023" }
      ],
      "additional": ["Metodologías, herramientas u otros"]
    }
  ]
}`;
  }
}
