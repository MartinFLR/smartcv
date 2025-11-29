import { PromptLanguage } from '@smartcv/types';
import { DeliveryChannel } from '@smartcv/types';

const coverLetterDeliveryChannelTexts: Record<DeliveryChannel, Record<PromptLanguage, string>> = {
  email: {
    english: `This cover letter will be sent by email. It should sound professional, respectful, and well-structured, with a clear greeting, body, and closing. Ideal length: 3–4 short paragraphs (around 250–300 words).`,
    spanish: `Esta carta de presentación se enviará por correo electrónico. Debe sonar profesional, respetuosa y bien estructurada, con un saludo, cuerpo y cierre claros. Longitud ideal: 3–4 párrafos cortos (alrededor de 250–300 palabras).`,
  },

  linkedinMessage: {
    english: `This message will be sent privately on LinkedIn. It should be brief, conversational, and engaging, focused on generating interest rather than providing all the details. Ideal length: under 200 characters.`,
    spanish: `Este mensaje se enviará de forma privada en LinkedIn. Debe ser breve, conversacional y atractivo, enfocado en generar interés más que en detallar todo. Longitud ideal: menos de 200 caracteres.`,
  },

  applicationForm: {
    english: `This text will be submitted through an online application form. It should be concise, ATS-friendly, and focused on relevant achievements. Ideal length: 2–3 paragraphs (around 180–220 words).`,
    spanish: `Este texto se enviará a través de un formulario de postulación en línea. Debe ser conciso, compatible con sistemas ATS y centrado en logros relevantes. Longitud ideal: 2–3 párrafos (alrededor de 180–220 palabras).`,
  },

  internalReferral: {
    english: `This letter is for an internal referral. It should sound warm, confident, and highlight both professional alignment and shared company values. Ideal length: 2–3 short paragraphs (around 200 words).`,
    spanish: `Esta carta es para un referido interno. Debe sonar cordial, segura y resaltar tanto la afinidad profesional como los valores compartidos con la empresa. Longitud ideal: 2–3 párrafos cortos (alrededor de 200 palabras).`,
  },
};

export function getCoverLetterDeliveryChannelText(
  lang: PromptLanguage,
  deliveryChannel: DeliveryChannel = 'linkedinMessage',
): string {
  const channelText = coverLetterDeliveryChannelTexts[deliveryChannel];
  return channelText?.[lang] ?? coverLetterDeliveryChannelTexts.email[lang];
}
