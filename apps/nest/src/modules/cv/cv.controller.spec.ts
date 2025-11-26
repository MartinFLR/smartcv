import { Test, TestingModule } from '@nestjs/testing';
import { CvController } from './cv.controller';
import { CvService } from './cv.service';
import { InternalServerErrorException } from '@nestjs/common';
import { CvPayload, AiSettings } from '@smartcv/types';

describe('CvController', () => {
  let controller: CvController;
  let service: CvService;

  const mockCvService = {
    generateTailoredCv: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CvController],
      providers: [
        {
          provide: CvService,
          useValue: mockCvService,
        },
      ],
    }).compile();

    controller = module.get<CvController>(CvController);
    service = module.get<CvService>(CvService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('generateCv', () => {
    const mockProvider = 'google';
    const mockModel = 'gemini-2.0-flash';
    const mockBody: CvPayload = {
      baseCv: {
        summary: 'Software developer',
        experience: [],
        education: [],
        skills: [],
        projects: [],
      } as any, // Using 'as any' for test mock
      jobDesc: 'Senior fullstack developer',
      promptOption: { lang: 'spanish', type: 'tailoredCv' },
    };

    it('should successfully generate CV when valid data is provided', async () => {
      const mockResponse = {
        summary: 'Tailored summary',
        experience: [],
        education: [],
        skills: [],
        projects: [],
      };

      mockCvService.generateTailoredCv.mockResolvedValue(mockResponse);

      const result = await controller.generateCv(mockProvider, mockModel, mockBody);

      expect(result).toEqual(mockResponse);
      expect(mockCvService.generateTailoredCv).toHaveBeenCalledWith(
        mockBody,
        expect.objectContaining({
          modelProvider: mockProvider,
          modelVersion: mockModel,
          systemPrompt: '',
        }),
      );
    });

    it('should handle service errors and throw InternalServerErrorException', async () => {
      mockCvService.generateTailoredCv.mockRejectedValue(new Error('AI service failed'));

      await expect(controller.generateCv(mockProvider, mockModel, mockBody)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('should pass correct header settings to service', async () => {
      const mockResponse = { summary: 'Test summary' } as any;
      mockCvService.generateTailoredCv.mockResolvedValue(mockResponse);

      await controller.generateCv('openai', 'gpt-4', mockBody);

      expect(mockCvService.generateTailoredCv).toHaveBeenCalledWith(
        mockBody,
        expect.objectContaining({
          modelProvider: 'openai',
          modelVersion: 'gpt-4',
        }),
      );
    });
  });
});
