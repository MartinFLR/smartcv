import { PromptLanguage } from '../../../../shared/types/PromptTypes';
import { DeliveryChannel } from '../../../../shared/types/PromptTypes';

const coverLetterDeliveryChannelTexts: Record<
  DeliveryChannel,
  Record<PromptLanguage, string>
> = {
  email: {
    en: `This cover letter will be sent as an email. It should sound professional, respectful, and well-structured, with a clear greeting, body, and closing. Ideal length: 3–4 short paragraphs (around 250–300 words).`,
    es: `Esta carta de presentación se enviará por correo electrónico. Debe sonar profesional, respetuosa y bien estructurada, con un saludo, cuerpo y cierre claros. Longitud ideal: 3–4 párrafos cortos (alrededor de 250–300 palabras).`,
  },

  linkedinMessage: {
    en: `This message will be sent privately on LinkedIn. It should be short, conversational, and engaging — focused on sparking interest rather than full details. Ideal length: 3–5 sentences (under 120 words).`,
    es: `Este mensaje se enviará de forma privada en LinkedIn. Debe ser breve, conversacional y atractivo, enfocado en generar interés más que en detallar todo. Longitud ideal: 3–5 oraciones (menos de 120 palabras).`,
  },

  applicationForm: {
    en: `This text will be submitted through an online job application form. It should be concise, ATS-friendly, and focus directly on relevant achievements. Ideal length: 2–3 paragraphs (around 180–220 words).`,
    es: `Este texto se enviará a través de un formulario de postulación en línea. Debe ser conciso, compatible con sistemas ATS y centrado en logros relevantes. Longitud ideal: 2–3 párrafos (alrededor de 180–220 palabras).`,
  },

  internalReferral: {
    en: `This letter is for an internal referral. It should sound warm, confident, and highlight both professional fit and shared company values. Ideal length: 2–3 short paragraphs (around 200 words).`,
    es: `Esta carta es para un referido interno. Debe sonar cordial, segura y resaltar tanto la afinidad profesional como los valores compartidos con la empresa. Longitud ideal: 2–3 párrafos cortos (alrededor de 200 palabras).`,
  },
};

export function getCoverLetterDeliveryChannelText(
  lang: PromptLanguage,
  deliveryChannel: DeliveryChannel = 'linkedinMessage'
): string {
  const channelText = coverLetterDeliveryChannelTexts[deliveryChannel];
  return channelText?.[lang] ?? coverLetterDeliveryChannelTexts.email[lang];
}
