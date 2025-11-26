import { Test, TestingModule } from '@nestjs/testing';
import { CoverLetterService } from './cover-letter.service';
import { CoverLetterPayload, AiSettings } from '@smartcv/types';
import { AIFactory } from '../../core/ai/ai.factory';

jest.mock('../../core/ai/ai.factory');
jest.mock('../../core/prompt/prompt-builder');

describe('CoverLetterService', () => {
  let service: CoverLetterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoverLetterService],
    }).compile();

    service = module.get<CoverLetterService>(CoverLetterService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateCoverLetterStream', () => {
    it('should return stream when AI service supports streaming', async () => {
      const mockPayload: CoverLetterPayload = {
        baseCv: {
          summary: 'Developer',
          experience: [],
          education: [],
          skills: [],
          projects: [],
        } as any,
        jobDesc: 'Software engineer position',
        promptOption: { lang: 'english', type: 'coverLetter' },
      };

      const mockHeaderSettings: AiSettings = {
        modelProvider: 'google',
        modelVersion: 'gemini-2.0-flash',
        systemPrompt: '',
      };

      const mockStream = (async function* () {
        yield 'Dear ';
        yield 'Sir,';
      })();

      const mockAiInstance = {
        generate: jest.fn(),
        generateStream: jest.fn().mockReturnValue(mockStream),
      };

      (AIFactory.create as jest.Mock).mockReturnValue(mockAiInstance);

      const { buildPrompt } = require('../../core/prompt/prompt-builder');
      buildPrompt.mockReturnValue({
        systemPrompt: 'System',
        userPrompt: 'User',
      });

      const result = await service.generateCoverLetterStream(mockPayload, mockHeaderSettings);

      expect(result).toBeDefined();
      expect(mockAiInstance.generateStream).toHaveBeenCalled();

      // Verify the stream works
      const chunks: string[] = [];
      if (result) {
        for await (const chunk of result) {
          chunks.push(chunk);
        }
      }
      expect(chunks).toEqual(['Dear ', 'Sir,']);
    });

    it('should fallback to non-streaming when generateStream is not available', async () => {
      const mockPayload: CoverLetterPayload = {
        baseCv: {
          summary: 'Test developer',
          experience: [],
          education: [],
          skills: [],
          projects: [],
        } as any,
        jobDesc: 'Job',
      };

      const mockHeaderSettings: AiSettings = {
        modelProvider: 'openai',
        modelVersion: 'gpt-4',
        systemPrompt: '',
      };

      const mockAiInstance = {
        generate: jest.fn().mockResolvedValue('Complete cover letter text'),
      };

      (AIFactory.create as jest.Mock).mockReturnValue(mockAiInstance);

      const { buildPrompt } = require('../../core/prompt/prompt-builder');
      buildPrompt.mockReturnValue({ systemPrompt: 'S', userPrompt: 'U' });

      const result = await service.generateCoverLetterStream(mockPayload, mockHeaderSettings);

      expect(result).toBeDefined();
      expect(mockAiInstance.generate).toHaveBeenCalled();

      // Verify the fallback stream
      const chunks: string[] = [];
      if (result) {
        for await (const chunk of result) {
          chunks.push(chunk);
        }
      }
      expect(chunks).toEqual(['Complete cover letter text']);
    });

    it('should stringify baseCv and build prompts correctly', async () => {
      const mockPayload: CoverLetterPayload = {
        baseCv: {
          summary: 'Developer with experience',
          experience: [],
          education: [],
          skills: [],
          projects: [],
        } as any,
        jobDesc: 'Senior position',
        promptOption: { lang: 'spanish' },
      };
      const mockHeaderSettings: AiSettings = {
        modelProvider: 'google',
        modelVersion: 'gemini-2.0-flash',
        systemPrompt: '',
      };

      const mockAiInstance = {
        generate: jest.fn().mockResolvedValue('Letter'),
      };

      (AIFactory.create as jest.Mock).mockReturnValue(mockAiInstance);

      const { buildPrompt } = require('../../core/prompt/prompt-builder');
      buildPrompt.mockReturnValue({ systemPrompt: 'S', userPrompt: 'U' });

      await service.generateCoverLetterStream(mockPayload, mockHeaderSettings);

      expect(buildPrompt).toHaveBeenCalledWith(
        expect.any(String), // baseCv stringified (formatting may vary)
        'Senior position',
        mockHeaderSettings,
        mockPayload.promptOption,
      );
    });
  });
});
