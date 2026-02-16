import { Injectable } from '@nestjs/common';
import { PromptGenerator } from '../../../core/prompt/prompt.interface';
import { BuildPromptOptions, PromptLanguage } from '@smartcv/types';
import { getATSMainTasks } from './tasks';
import { getATStrictRules } from './rules';
import { buildATSHeader } from './header';
import { buildOutputBlock } from '../../../core/prompt/output-block';
import { buildContextBlock } from '../../../core/prompt/context-block';

@Injectable()
export class AtsPromptGenerator implements PromptGenerator {
  buildSystemPrompt(lang: PromptLanguage): string {
    const tasks = getATSMainTasks(lang);
    const rules = getATStrictRules(lang);

    const t = {
      instructions: lang === 'spanish' ? 'INSTRUCCIONES' : 'INSTRUCTIONS',
      mainTasks: lang === 'spanish' ? 'Tareas Principales' : 'Main Tasks',
      strictRules: lang === 'spanish' ? 'Reglas Estrictas' : 'Strict Rules',
    };

    const instructionsBlock = `
==== ${t.instructions} ====
${t.mainTasks}:
${tasks.trim()}

${t.strictRules}:
${rules.trim()}

==== END ${t.instructions} ====
`.trim();

    const outputBlock = buildOutputBlock('ats', lang);
    const headerBlock = buildATSHeader(lang);

    return [headerBlock, instructionsBlock, outputBlock].join('\n\n');
  }

  buildUserPrompt(
    baseCv: string,
    jobDesc: string,
    lang: PromptLanguage,
    options?: BuildPromptOptions,
  ): string {
    return buildContextBlock(baseCv, jobDesc, lang, options);
  }
}
