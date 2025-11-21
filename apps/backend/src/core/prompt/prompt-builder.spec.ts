import { buildPrompt } from './prompt-builder';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import {
  AiSettings,
  BuildPromptOptions,
  CvForm,
  DeliveryChannel,
  PromptType,
  TemperatureLevel,
} from '@smartcv/types';

jest.mock('../../modules/cv/prompt/exaggeration', () => ({
  getExaggeration: jest.fn((temp, lang) => `Exaggeration text for ${temp}/${lang}`),
}));
jest.mock('../../modules/cv/prompt/rules', () => ({
  getCVStrictRules: jest.fn((lang) => `CV Rules for ${lang}`),
}));
jest.mock('../../modules/cv/prompt/tasks', () => ({
  getCVMainTasks: jest.fn((lang) => `CV Tasks for ${lang}`),
}));
jest.mock('../../modules/cv/prompt/inputOutput', () => ({
  getCvInputOutputTemplate: jest.fn((cv, jd, lang) => `CV Input/Output for ${lang}`),
}));
jest.mock('../../modules/cover-letter/prompt/deliveryChannel', () => ({
  getCoverLetterDeliveryChannelText: jest.fn((lang, channel) => `CL Channel for ${channel}`),
}));
jest.mock('../../modules/cover-letter/prompt/tone', () => ({
  getCoverLetterToneText: jest.fn((lang, tone) => `CL Tone for ${tone}`),
}));
jest.mock('../../modules/cv/prompt/header', () => ({
  buildCvHeader: jest.fn((lang, context) => `CV Header for ${lang}`),
}));
jest.mock('../../modules/cover-letter/prompt/header', () => ({
  buildCoverLetterHeader: jest.fn((lang, ctx, recruiter, referral, company) => `CL Header`),
}));
jest.mock('../../modules/cover-letter/prompt/tasks', () => ({
  getCoverLetterMainTasks: jest.fn((lang) => `CL Tasks`),
}));
jest.mock('../../modules/cover-letter/prompt/rules', () => ({
  getCoverLetterStrictRules: jest.fn((lang) => `CL Rules`),
}));
jest.mock('../../modules/cover-letter/prompt/inputOutput', () => ({
  getCoverLetterInputOutputTemplate: jest.fn((cv, jd, lang) => `CL Input/Output`),
}));
jest.mock('../../modules/ats/prompt/rules', () => ({
  getATStrictRules: jest.fn((lang) => `ATS Rules`),
}));
jest.mock('../../modules/ats/prompt/inputOutput', () => ({
  getATSInputOutputTemplate: jest.fn((cv, jd, lang) => `ATS Input/Output`),
}));
jest.mock('../../modules/ats/prompt/tasks', () => ({
  getATSMainTasks: jest.fn((lang) => `ATS Tasks`),
}));
jest.mock('../../modules/ats/prompt/header', () => ({
  buildATSHeader: jest.fn((lang) => `ATS Header`),
}));

// Re-importamos las funciones mockeadas para acceder a los espías
import { getExaggeration } from '../../modules/cv/prompt/exaggeration';
import { buildCoverLetterHeader } from '../../modules/cover-letter/prompt/header';
import { getCoverLetterToneText } from '../../modules/cover-letter/prompt/tone';
import { getCoverLetterDeliveryChannelText } from '../../modules/cover-letter/prompt/deliveryChannel';

describe('buildPrompt (Core Orchestration Logic)', () => {
  const MOCK_CV_STRING = 'CV Data';
  const MOCK_JOB_DESC = 'Job Desc';
  const MOCK_AI_SETTINGS: AiSettings = {
    modelProvider: 'openai',
    modelVersion: 'gpt-4o',
    systemPrompt: '',
  };
  const NEWLINE = '\n\n';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ----------------------------------------------------------------------------------------------------
  // TEST CASE 1: tailoredCv (Default)
  // ----------------------------------------------------------------------------------------------------
  it('should build tailoredCv prompt correctly with all sections and default args', () => {
    const options: BuildPromptOptions = {
      type: 'tailoredCv',
      temperature: 'high',
      userContext: 'focused on leadership',
    };

    const prompt = buildPrompt(MOCK_CV_STRING, MOCK_JOB_DESC, MOCK_AI_SETTINGS, options);

    // 1. Verificar la llamada a getExaggeration con los parámetros correctos
    expect(getExaggeration).toHaveBeenCalledWith('high', 'spanish');

    // 2. Verificar el contenido final (orden y separadores)
    const expectedSections = [
      `CV Header for spanish`,
      `Exaggeration instructions: Exaggeration text for high/spanish`,
      `CV Tasks for spanish`,
      `CV Rules for spanish`,
      `CV Input/Output for spanish`,
    ];

    expect(prompt).toBe(expectedSections.join(NEWLINE));
    expect(prompt).not.toContain('CL Header'); // Asegura que el prompt correcto fue seleccionado
  });

  // ----------------------------------------------------------------------------------------------------
  // TEST CASE 2: coverLetter
  // ----------------------------------------------------------------------------------------------------
  it('should build coverLetter prompt with tone, channel, and specific names', () => {
    const options: BuildPromptOptions = {
      type: 'coverLetter',
      lang: 'english',
      tone: 'confident',
      deliveryChannel: 'email',
      recruiterName: 'Alice',
      referralName: 'Bob',
      companyName: 'Acme Corp',
    };

    const prompt = buildPrompt(MOCK_CV_STRING, MOCK_JOB_DESC, MOCK_AI_SETTINGS, options);

    // 1. Verificar llamadas a helpers específicos
    expect(buildCoverLetterHeader).toHaveBeenCalledWith(
      'english',
      undefined, // userContext no está en options
      'Alice',
      'Bob',
      'Acme Corp',
    );
    expect(getCoverLetterToneText).toHaveBeenCalledWith('english', 'confident');
    expect(getCoverLetterDeliveryChannelText).toHaveBeenCalledWith('english', 'email');

    // 2. Verificar el contenido final (orden y separadores)
    const expectedSections = [
      `CL Header`,
      `CL Tone for confident`,
      `CL Channel for email`,
      `CL Tasks`,
      `CL Rules`,
      `CL Input/Output`,
    ];

    expect(prompt).toBe(expectedSections.join(NEWLINE));
  });

  // ----------------------------------------------------------------------------------------------------
  // TEST CASE 3: ats
  // ----------------------------------------------------------------------------------------------------
  it('should build ATS prompt structure without exaggeration/tone', () => {
    const options: BuildPromptOptions = {
      type: 'ats',
      lang: 'spanish',
    };

    const prompt = buildPrompt(MOCK_CV_STRING, MOCK_JOB_DESC, MOCK_AI_SETTINGS, options);

    // 1. Verificar que NO se llamaron helpers de tailoredCv
    expect(getExaggeration).not.toHaveBeenCalled();

    // 2. Verificar el contenido final
    const expectedSections = [`ATS Header`, `ATS Tasks`, `ATS Rules`, `ATS Input/Output`];

    expect(prompt).toBe(expectedSections.join(NEWLINE));
  });

  // ----------------------------------------------------------------------------------------------------
  // TEST CASE 4: Error Handling
  // ----------------------------------------------------------------------------------------------------
  it('should return error message for unknown type', () => {
    const options: BuildPromptOptions = {
      type: 'unknownType' as PromptType,
      lang: 'spanish',
    };

    const prompt = buildPrompt(MOCK_CV_STRING, MOCK_JOB_DESC, MOCK_AI_SETTINGS, options);

    // El test debe cubrir la última línea del componente
    expect(prompt).toContain(
      'Error: prompt type "unknownType" or language "spanish" not implemented.',
    );
  });
});
