import { Test, TestingModule } from '@nestjs/testing';
import { AtsService } from './ats.service';
import { AiSettings, CvAtsPayload } from '@smartcv/types';
import { AIFactory } from '../../core/ai/ai.factory';
import { PromptService } from '../../core/prompt/prompt.service';

// Mock the AIFactory and other dependencies
jest.mock('../../core/ai/ai.factory');
jest.mock('../../core/utils/json-cleaner');
jest.mock('../../core/prompt/prompt.service');
jest.mock('pdf-parse');

describe('AtsService', () => {
  let service: AtsService;

  beforeEach(async () => {
    const mockPromptService = {
      getGenerator: jest.fn().mockReturnValue({
        buildSystemPrompt: jest.fn().mockReturnValue('System prompt'),
        buildUserPrompt: jest.fn().mockReturnValue('User prompt'),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AtsService,
        {
          provide: PromptService,
          useValue: mockPromptService,
        },
      ],
    }).compile();

    service = module.get<AtsService>(AtsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('analyzeCvAts', () => {
    it('should process PDF buffer and return ATS analysis', async () => {
      const mockPayload: CvAtsPayload = {
        file: Buffer.from('mock pdf content'),
        jobDesc: 'Senior developer position',
        aiSettings: {},
        promptOption: { lang: 'spanish', type: 'ats' },
      };

      const mockHeaderSettings: AiSettings = {
        modelProvider: 'google',
        modelVersion: 'gemini-2.0-flash',
        systemPrompt: '',
      };

      const mockAiInstance = {
        generate: jest.fn().mockResolvedValue(
          JSON.stringify({
            text: 'Analysis',
            matchScore: 80,
            fitLevel: 'High',
          }),
        ),
      };

      (AIFactory.create as jest.Mock).mockReturnValue(mockAiInstance);

      // Mock pdf-parse
      const pdfParse = require('pdf-parse');
      pdfParse.PDFParse = jest.fn().mockImplementation(() => ({
        getText: jest.fn().mockResolvedValue({ text: 'CV content here' }),
      }));

      // Mock cleanJson
      const { cleanJson } = require('../../core/utils/json-cleaner');
      cleanJson.mockReturnValue({
        text: 'Analysis',
        matchScore: 80,
        fitLevel: 'High',
      });

      const result = await service.analyzeCvAts(mockPayload, mockHeaderSettings);

      expect(result).toBeDefined();
      expect(result.matchScore).toBe(80);
      expect(AIFactory.create).toHaveBeenCalled();
    });

    it('should handle base64 encoded PDF files', async () => {
      const base64File = 'data:application/pdf;base64,SGVsbG8gV29ybGQ=';
      const mockPayload: CvAtsPayload = {
        file: base64File as any,
        jobDesc: 'Job description',
        aiSettings: {},
      };

      const mockHeaderSettings: AiSettings = {
        modelProvider: 'openai',
        modelVersion: 'gpt-4',
        systemPrompt: '',
      };

      const mockAiInstance = {
        generate: jest.fn().mockResolvedValue('{"text":"result"}'),
      };

      (AIFactory.create as jest.Mock).mockReturnValue(mockAiInstance);

      const pdfParse = require('pdf-parse');
      pdfParse.PDFParse = jest.fn().mockImplementation(() => ({
        getText: jest.fn().mockResolvedValue({ text: 'CV text' }),
      }));

      const { cleanJson } = require('../../core/utils/json-cleaner');
      cleanJson.mockReturnValue({ text: 'result' });

      await service.analyzeCvAts(mockPayload, mockHeaderSettings);

      expect(pdfParse.PDFParse).toHaveBeenCalled();
    });

    it('should throw error when jobDesc is undefined', async () => {
      const mockPayload: CvAtsPayload = {
        file: Buffer.from('content'),
        jobDesc: undefined as any,
        aiSettings: {},
      };

      const mockHeaderSettings: AiSettings = {
        modelProvider: 'google',
        modelVersion: 'gemini-2.0-flash',
        systemPrompt: '',
      };

      await expect(service.analyzeCvAts(mockPayload, mockHeaderSettings)).rejects.toThrow(
        'jobDesc no puede ser undefined en ats.analysis',
      );
    });
  });
});
