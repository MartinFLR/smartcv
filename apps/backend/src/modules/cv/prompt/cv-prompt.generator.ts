import { Injectable } from '@nestjs/common';
import { PromptGenerator } from '../../../core/prompt/prompt.interface';
import { BuildPromptOptions, PromptLanguage, TemperatureLevel } from '@smartcv/types';
import { getExaggeration } from './exaggeration';
import { getCVMainTasks } from './tasks';
import { getCVStrictRules } from './rules';
import { buildCvHeader } from './header';
import { buildOutputBlock } from '../../../core/prompt/output-block';
import { buildContextBlock } from '../../../core/prompt/context-block';

@Injectable()
export class CvPromptGenerator implements PromptGenerator {
  buildSystemPrompt(
    lang: PromptLanguage,
    temperature: TemperatureLevel,
    options?: BuildPromptOptions,
  ): string {
    const exaggeration = getExaggeration(temperature, lang);
    const tasks = getCVMainTasks(lang);
    const rules = getCVStrictRules(lang);
    const userContext = options?.userContext;

    const t = {
      instructions: lang === 'spanish' ? 'INSTRUCCIONES' : 'INSTRUCTIONS',
      mainTasks: lang === 'spanish' ? 'Tareas Principales' : 'Main Tasks',
      strictRules: lang === 'spanish' ? 'Reglas Estrictas' : 'Strict Rules',
      exaggerationLevel: lang === 'spanish' ? 'Nivel de exageración' : 'Exaggeration Level',
    };

    const instructionsBlock = `
==== ${t.instructions} ====
${t.exaggerationLevel}: ${exaggeration}

${t.mainTasks}:
${tasks.trim()}

${t.strictRules}:
${rules.trim()}

==== END ${t.instructions} ====
`.trim();

    const outputBlock = buildOutputBlock('tailoredCv', lang);
    const headerBlock = buildCvHeader(lang, userContext);

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
