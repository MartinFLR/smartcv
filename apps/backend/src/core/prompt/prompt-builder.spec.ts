import { buildSystemPrompt, buildUserPrompt, buildPrompt } from './prompt-builder'; // Ajustá el path según corresponda
import { buildContextBlock } from './context-block';
import { buildInstructionsBlock } from './instruction-block';
import { buildOutputBlock } from './output-block';
import { buildCoverLetterHeader } from '../../modules/cover-letter/prompt/header';
import { buildCvHeader } from '../../modules/cv/prompt/header';
import { buildATSHeader } from '../../modules/ats/prompt/header';
import { jest, expect, it, describe, beforeEach } from '@jest/globals';
import { AiSettings, BuildPromptOptions, PromptLanguage, PromptType } from '@smartcv/types';

// 1. Mockeamos las dependencias para aislar la lógica de este archivo
jest.mock('./context-block');
jest.mock('./instruction-block');
jest.mock('./output-block');
jest.mock('../../modules/cover-letter/prompt/header');
jest.mock('../../modules/cv/prompt/header');
jest.mock('../../modules/ats/prompt/header');

describe('Prompt Builder', () => {
  // Variables auxiliares para los mocks
  const mockContextBlock = buildContextBlock as jest.Mock;
  const mockInstructionsBlock = buildInstructionsBlock as jest.Mock;
  const mockOutputBlock = buildOutputBlock as jest.Mock;
  const mockCoverLetterHeader = buildCoverLetterHeader as jest.Mock;
  const mockCvHeader = buildCvHeader as jest.Mock;
  const mockATSHeader = buildATSHeader as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockContextBlock.mockReturnValue('[CONTEXT]');
    mockInstructionsBlock.mockReturnValue('[INSTRUCTIONS]');
    mockOutputBlock.mockReturnValue('[OUTPUT]');
    mockCoverLetterHeader.mockReturnValue('[CL_HEADER]');
    mockCvHeader.mockReturnValue('[CV_HEADER]');
    mockATSHeader.mockReturnValue('[ATS_HEADER]');
  });

  describe('buildSystemPrompt', () => {
    const lang: PromptLanguage = 'spanish';
    const temp = 'low';
    const options: BuildPromptOptions = {
      userContext: 'Contexto del usuario',
      recruiterName: 'Recruiter',
      companyName: 'Company',
      referralName: 'Referral',
    };

    it('debería construir el prompt de Cover Letter correctamente', () => {
      const result = buildSystemPrompt('coverLetter', lang, temp, options);

      // Verifica que se llamó al builder específico
      expect(mockCoverLetterHeader).toHaveBeenCalledWith(
        lang,
        options.userContext,
        options.recruiterName,
        options.referralName,
        options.companyName,
      );

      expect(mockCvHeader).not.toHaveBeenCalled();
      expect(mockATSHeader).not.toHaveBeenCalled();

      expect(mockInstructionsBlock).toHaveBeenCalledWith('coverLetter', lang, temp, options);
      expect(mockOutputBlock).toHaveBeenCalledWith('coverLetter', lang);

      expect(result).toBe('[CL_HEADER]\n\n[INSTRUCTIONS]\n\n[OUTPUT]');
    });

    it('debería construir el prompt de Tailored CV correctamente', () => {
      const result = buildSystemPrompt('tailoredCv', lang, temp, options);

      expect(mockCvHeader).toHaveBeenCalledWith(lang, options.userContext);
      expect(mockCoverLetterHeader).not.toHaveBeenCalled();
      expect(result).toBe('[CV_HEADER]\n\n[INSTRUCTIONS]\n\n[OUTPUT]');
    });

    it('debería construir el prompt de ATS correctamente', () => {
      const result = buildSystemPrompt('ats', lang, temp, options);

      expect(mockATSHeader).toHaveBeenCalledWith(lang);
      expect(result).toBe('[ATS_HEADER]\n\n[INSTRUCTIONS]\n\n[OUTPUT]');
    });

    it('debería manejar options undefined gracefully', () => {
      const result = buildSystemPrompt('tailoredCv', lang, temp, undefined);

      expect(mockCvHeader).toHaveBeenCalledWith(lang, undefined);
      expect(result).toBe('[CV_HEADER]\n\n[INSTRUCTIONS]\n\n[OUTPUT]');
    });
  });

  describe('buildUserPrompt', () => {
    it('debería delegar la construcción a buildContextBlock', () => {
      const baseCv = 'CV Base';
      const jobDesc = 'JD';
      const lang = 'english';
      const options: BuildPromptOptions = { type: 'tailoredCv' };

      const result = buildUserPrompt(baseCv, jobDesc, lang, options);

      expect(mockContextBlock).toHaveBeenCalledWith(baseCv, jobDesc, lang, options);
      expect(result).toBe('[CONTEXT]');
    });
  });

  describe('buildPrompt', () => {
    const baseCv = 'Mi CV';
    const jobDesc = 'Puesto IT';
    const aiSettings: AiSettings = { modelVersion: 'gpt-4o' }; // Objeto dummy

    it('debería usar valores por defecto si no se pasan options', () => {
      mockCvHeader.mockReturnValue('[CV_HEADER]');

      const result = buildPrompt(baseCv, jobDesc, aiSettings);

      expect(mockCvHeader).toHaveBeenCalledWith('spanish', undefined);
      expect(mockInstructionsBlock).toHaveBeenCalledWith('tailoredCv', 'spanish', 'low', undefined);

      expect(result).toEqual({
        systemPrompt: expect.stringContaining('[CV_HEADER]'),
        userPrompt: '[CONTEXT]',
      });
    });

    it('debería usar los valores provistos en options', () => {
      const options: BuildPromptOptions = {
        lang: 'english',
        type: 'coverLetter',
        temperature: 'high',
      };

      buildPrompt(baseCv, jobDesc, aiSettings, options);

      expect(mockCoverLetterHeader).toHaveBeenCalledWith('english', undefined, '', '', '');
      expect(mockInstructionsBlock).toHaveBeenCalledWith('coverLetter', 'english', 'high', options);
    });
  });
});
