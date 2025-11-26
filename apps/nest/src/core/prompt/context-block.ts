import { BuildPromptOptions, PromptLanguage } from '@smartcv/types';

export function buildContextBlock(
  baseCv: string,
  jobDesc: string,
  lang: PromptLanguage,
  options?: BuildPromptOptions,
): string {
  const userContext = options?.userContext ?? {};

  const safeBaseCv = baseCv.trim();
  const safeJobDesc = jobDesc.trim();
  const safeUserContext = JSON.stringify(userContext, null, 2);

  return `
==== [CONTEXT] ====
Language: ${lang}

Job Description:
${safeJobDesc}

Base CV (JSON):
${safeBaseCv}

User Extra Context:
${safeUserContext}
==== END [CONTEXT] ====
`.trim();
}
