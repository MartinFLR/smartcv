import { getExaggeration } from './cv/exaggeration';
import { getCVStrictRules } from './cv/rules';
import { getCVMainTasks } from './cv/tasks';
import { getCvInputOutputTemplate } from './cv/inputOutput';
import { getCoverLetterDeliveryChannelText } from './cv/deliveryChannel';
import { getCoverLetterToneText } from './cover-letter/tone';
import { buildCvHeader } from './cv/header';
import { buildCoverLetterHeader } from './cover-letter/header';
import { getCoverLetterMainTasks } from './cover-letter/tasks';
import { getCoverLetterStrictRules } from './cover-letter/rules';
import { getCoverLetterInputOutputTemplate } from './cover-letter/inputOutput';
import { getATStrictRules } from './ats/rules';
import { getATSInputOutputTemplate } from './ats/inputOutput';
import { getATSMainTasks } from './ats/tasks';
import { buildATSHeader } from './ats/header';
import {
  BuildPromptOptions,
  DeliveryChannel,
  PromptLanguage,
  PromptType,
  TemperatureLevel,
} from '@smartcv/types';

export function buildPrompt(baseCv: string, jobDesc: string, options?: BuildPromptOptions): string {
  console.log(options);

  const lang: PromptLanguage = options?.lang || 'spanish';
  const type: PromptType = options?.type || 'tailoredCv';
  const temperature: TemperatureLevel = options?.temperature || 'low';
  const deliveryChannel: DeliveryChannel = options?.deliveryChannel || 'linkedinMessage';

  const tone = options?.tone || 'formal';
  const recruiterName = options?.recruiterName || '';
  const companyName = options?.companyName || '';
  const referralName = options?.referralName || '';

  const userContext = options?.userContext;

  const exaggeration = getExaggeration(temperature, lang);

  if (type === 'tailoredCv') {
    return [
      buildCvHeader(lang, userContext),
      `Exaggeration instructions: ${exaggeration}`,
      getCVMainTasks(lang),
      getCVStrictRules(lang),
      getCvInputOutputTemplate(baseCv, jobDesc, lang),
    ].join('\n\n');
  }
  if (type === 'coverLetter') {
    return [
      buildCoverLetterHeader(lang, userContext, recruiterName, referralName, companyName),
      getCoverLetterToneText(lang, tone),
      getCoverLetterDeliveryChannelText(lang, deliveryChannel),
      getCoverLetterMainTasks(lang),
      getCoverLetterStrictRules(lang),
      getCoverLetterInputOutputTemplate(baseCv, jobDesc, lang),
    ].join('\n\n');
  }
  if (type === 'ats') {
    return [
      buildATSHeader(lang),
      getATSMainTasks(lang),
      getATStrictRules(lang),
      getATSInputOutputTemplate(baseCv, jobDesc, lang),
    ].join('\n\n');
  }

  return `Error: prompt type "${type}" or language "${lang}" not implemented.`;
}
