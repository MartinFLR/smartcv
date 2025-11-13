import { getExaggeration } from '../../modules/cv/prompt/exaggeration';
import { getCVStrictRules } from '../../modules/cv/prompt/rules';
import { getCVMainTasks } from '../../modules/cv/prompt/tasks';
import { getCvInputOutputTemplate } from '../../modules/cv/prompt/inputOutput';
import { getCoverLetterDeliveryChannelText } from '../../modules/cover-letter/prompt/deliveryChannel';
import { getCoverLetterToneText } from '../../modules/cover-letter/prompt/tone';
import { buildCvHeader } from '../../modules/cv/prompt/header';
import { buildCoverLetterHeader } from '../../modules/cover-letter/prompt/header';
import { getCoverLetterMainTasks } from '../../modules/cover-letter/prompt/tasks';
import { getCoverLetterStrictRules } from '../../modules/cover-letter/prompt/rules';
import { getCoverLetterInputOutputTemplate } from '../../modules/cover-letter/prompt/inputOutput';
import { getATStrictRules } from '../../modules/ats/prompt/rules';
import { getATSInputOutputTemplate } from '../../modules/ats/prompt/inputOutput';
import { getATSMainTasks } from '../../modules/ats/prompt/tasks';
import { buildATSHeader } from '../../modules/ats/prompt/header';
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
    console.log(
      buildCoverLetterHeader(lang, userContext, recruiterName, referralName, companyName),
      getCoverLetterToneText(lang, tone),
      getCoverLetterDeliveryChannelText(lang, deliveryChannel),
      getCoverLetterMainTasks(lang),
      getCoverLetterStrictRules(lang),
      getCoverLetterInputOutputTemplate(baseCv, jobDesc, lang),
    );

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
