import { PromptLanguage } from '../../../../shared/types/PromptTypes';

export function getCoverLetterInputOutputTemplate(
  baseCv: string,
  jobDesc: string,
  lang: PromptLanguage,
) {
  if (lang === 'english') {
    return `
Input:
---BASE CV---
${baseCv}
---END BASE CV---

---JOB DESCRIPTION---
${jobDesc}
---END JOB DESCRIPTION---
`;
  } else {
    return `
Entrada:
---CV BASE---
${baseCv}
---FIN CV BASE---

---OFERTA LABORAL---
${jobDesc}
---FIN OFERTA LABORAL---
`;
  }
}
