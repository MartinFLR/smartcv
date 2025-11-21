import { getExaggeration } from '../../modules/cv/prompt/exaggeration';
import { getCVMainTasks } from '../../modules/cv/prompt/tasks';
import { getCVStrictRules } from '../../modules/cv/prompt/rules';
import { BuildPromptOptions, PromptLanguage, PromptType, TemperatureLevel } from '@smartcv/types';
import { getCoverLetterMainTasks } from '../../modules/cover-letter/prompt/tasks';
import { getCoverLetterStrictRules } from '../../modules/cover-letter/prompt/rules';
import { getCoverLetterToneText } from '../../modules/cover-letter/prompt/tone';
import { getCoverLetterDeliveryChannelText } from '../../modules/cover-letter/prompt/deliveryChannel';
import { getATSMainTasks } from '../../modules/ats/prompt/tasks';
import { getATStrictRules } from '../../modules/ats/prompt/rules';

export function buildInstructionsBlock(
  type: PromptType,
  lang: PromptLanguage,
  temperature: TemperatureLevel,
  options?: BuildPromptOptions,
): string {
  const deliveryChannel = options?.deliveryChannel || 'linkedinMessage';

  let exaggeration = '';
  let tasks = '';
  let rules = '';
  let tones = '';
  let delivery = '';

  switch (type) {
    case 'tailoredCv':
      exaggeration = getExaggeration(temperature, lang);
      tasks = getCVMainTasks(lang);
      rules = getCVStrictRules(lang);
      break;

    case 'coverLetter': {
      const tone = options?.tone || 'formal';
      tasks = getCoverLetterMainTasks(lang);
      rules = getCoverLetterStrictRules(lang);
      tones = getCoverLetterToneText(lang, tone);
      delivery = getCoverLetterDeliveryChannelText(lang, deliveryChannel);
      break;
    }

    case 'ats':
      tasks = getATSMainTasks(lang);
      rules = getATStrictRules(lang);
      break;

    default:
      throw new Error(
        lang === 'spanish'
          ? `Tipo de prompt no soportado: ${type}`
          : `Unsupported prompt type: ${type}`,
      );
  }

  const t = {
    instructions: lang === 'spanish' ? 'INSTRUCCIONES' : 'INSTRUCTIONS',
    tone: lang === 'spanish' ? 'Tono' : 'Tone',
    mainTasks: lang === 'spanish' ? 'Tareas Principales' : 'Main Tasks',
    strictRules: lang === 'spanish' ? 'Reglas Estrictas' : 'Strict Rules',
    exaggerationLevel: lang === 'spanish' ? 'Nivel de exageración' : 'Exaggeration Level',
    deliveryLabel: lang === 'spanish' ? 'Canal de entrega' : 'Delivery Channel',
  };

  return `
==== ${t.instructions} ====
${type === 'coverLetter' && t.tone ? `${t.tone}: ${t.tone}` : ''}
${tones ? `${tones}` : ''}
${type === 'coverLetter' && delivery ? `${t.deliveryLabel}: ${delivery}` : ''}
${type === 'tailoredCv' ? `${t.exaggerationLevel}: ${exaggeration}` : ''}

${t.mainTasks}:
${tasks.trim()}

${t.strictRules}:
${rules.trim()}

==== END ${t.instructions} ====
`.trim();
}
