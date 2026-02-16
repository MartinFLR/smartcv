import { Test, TestingModule } from '@nestjs/testing';
import { CvService } from './cv.service';
import { CvPayload, AiSettings } from '@smartcv/types';
import { AIFactory } from '../../core/ai/ai.factory';
import { PromptService } from '../../core/prompt/prompt.service';

jest.mock('../../core/ai/ai.factory');
jest.mock('../../core/utils/json-cleaner');
jest.mock('../../core/utils/normalizer');
jest.mock('../../core/prompt/prompt.service');

describe('CvService', () => {
  let service: CvService;

  beforeEach(async () => {
    const mockPromptService = {
      getGenerator: jest.fn().mockReturnValue({
        buildSystemPrompt: jest.fn().mockReturnValue('System prompt'),
        buildUserPrompt: jest.fn().mockReturnValue('User prompt'),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CvService,
        {
          provide: PromptService,
          useValue: mockPromptService,
        },
      ],
    }).compile();

    service = module.get<CvService>(CvService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateTailoredCv', () => {
    it('should generate tailored CV successfully', async () => {
      const mockPayload: CvPayload = {
        baseCv: {
          summary: 'Developer',
          experience: [],
          education: [],
          skills: [],
          projects: [],
        } as any,
        jobDesc: 'Frontend developer',
        promptOption: { lang: 'english', type: 'tailoredCv' },
      };

      const mockHeaderSettings: AiSettings = {
        modelProvider: 'google',
        modelVersion: 'gemini-2.0-flash',
        systemPrompt: '',
      };

      const mockAiInstance = {
        generate: jest.fn().mockResolvedValue(
          JSON.stringify({
            name: 'Jane Doe',
            summary: 'Experienced frontend developer',
          }),
        ),
      };

      (AIFactory.create as jest.Mock).mockReturnValue(mockAiInstance);

      const { cleanJson } = require('../../core/utils/json-cleaner');
      cleanJson.mockReturnValue({
        name: 'Jane Doe',
        summary: 'Experienced frontend developer',
        experience: [],
        education: [],
        skills: [],
        projects: [],
      });

      const { normalizeCv } = require('../../core/utils/normalizer');
      normalizeCv.mockImplementation((cv: any) => cv);

      const result = await service.generateTailoredCv(mockPayload, mockHeaderSettings);

      expect(result).toBeDefined();
      expect((result as any).summary).toBeDefined();
      expect(AIFactory.create).toHaveBeenCalledWith(
        expect.objectContaining({
          modelProvider: 'google',
          modelVersion: 'gemini-2.0-flash',
        }),
      );
      expect(normalizeCv).toHaveBeenCalled();
    });
  });
});
