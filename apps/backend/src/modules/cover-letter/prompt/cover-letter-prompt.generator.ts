import { Injectable } from '@nestjs/common';
import { PromptGenerator } from '../../../core/prompt/prompt.interface';
import { BuildPromptOptions, PromptLanguage, TemperatureLevel } from '@smartcv/types';
import { getCoverLetterMainTasks } from './tasks';
import { getCoverLetterStrictRules } from './rules';
import { getCoverLetterToneText } from './tone';
import { getCoverLetterDeliveryChannelText } from './deliveryChannel';
import { buildCoverLetterHeader } from './header';
import { buildOutputBlock } from '../../../core/prompt/output-block';
import { buildContextBlock } from '../../../core/prompt/context-block';

@Injectable()
export class CoverLetterPromptGenerator implements PromptGenerator {
  buildSystemPrompt(
    lang: PromptLanguage,
    temperature: TemperatureLevel,
    options?: BuildPromptOptions,
  ): string {
    const tone = options?.tone || 'formal';
    const deliveryChannel = options?.deliveryChannel || 'linkedinMessage';
    const userContext = options?.userContext;
    const recruiterName = options?.recruiterName || '';
    const companyName = options?.companyName || '';
    const referralName = options?.referralName || '';

    const tasks = getCoverLetterMainTasks(lang);
    const rules = getCoverLetterStrictRules(lang);
    const tones = getCoverLetterToneText(lang, tone);
    const delivery = getCoverLetterDeliveryChannelText(lang, deliveryChannel);

    const t = {
      instructions: lang === 'spanish' ? 'INSTRUCCIONES' : 'INSTRUCTIONS',
      tone: lang === 'spanish' ? 'Tono' : 'Tone',
      mainTasks: lang === 'spanish' ? 'Tareas Principales' : 'Main Tasks',
      strictRules: lang === 'spanish' ? 'Reglas Estrictas' : 'Strict Rules',
      deliveryLabel: lang === 'spanish' ? 'Canal de entrega' : 'Delivery Channel',
    };

    const instructionsBlock = `
==== ${t.instructions} ====
${t.tone}: ${t.tone}
${tones}
${t.deliveryLabel}: ${delivery}

${t.mainTasks}:
${tasks.trim()}

${t.strictRules}:
${rules.trim()}

==== END ${t.instructions} ====
`.trim();

    const outputBlock = buildOutputBlock('coverLetter', lang);
    const headerBlock = buildCoverLetterHeader(
      lang,
      userContext,
      recruiterName,
      referralName,
      companyName,
    );

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
