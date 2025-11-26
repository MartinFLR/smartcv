import { Test, TestingModule } from '@nestjs/testing';
import { AtsController } from './ats.controller';
import { AtsService } from './ats.service';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { AiSettings, CvAtsPayload } from '@smartcv/types';

describe('AtsController', () => {
  let controller: AtsController;
  let service: AtsService;

  const mockAtsService = {
    analyzeCvAts: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AtsController],
      providers: [
        {
          provide: AtsService,
          useValue: mockAtsService,
        },
      ],
    }).compile();

    controller = module.get<AtsController>(AtsController);
    service = module.get<AtsService>(AtsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('analyzeCvAts', () => {
    const mockFile: Partial<Express.Multer.File> = {
      fieldname: 'file',
      originalname: 'test.pdf',
      encoding: '7bit',
      mimetype: 'application/pdf',
      size: 1024,
      buffer: Buffer.from('test pdf content'),
    } as any;

    const mockJobDesc = 'Senior software developer position';
    const mockProvider = 'google';
    const mockModel = 'gemini-2.0-flash';

    it('should successfully analyze CV when valid data is provided', async () => {
      const mockResponse = {
        text: 'Analysis result',
        matchScore: 85,
        fitLevel: 'High',
        matchedKeywords: ['TypeScript', 'Node.js'],
        missingKeywords: ['Python'],
        sections: {},
        sectionScores: {},
        recommendations: [],
        warnings: [],
        skillAnalysis: { hardSkills: [], softSkills: [], languageSkills: [] },
      };

      mockAtsService.analyzeCvAts.mockResolvedValue(mockResponse);

      const result = await controller.analyzeCvAts(
        mockProvider,
        mockModel,
        mockFile as any,
        mockJobDesc,
        {},
        undefined,
      );

      expect(result).toEqual(mockResponse);
      expect(mockAtsService.analyzeCvAts).toHaveBeenCalledWith(
        expect.objectContaining({
          file: mockFile.buffer,
          jobDesc: mockJobDesc,
        }),
        expect.objectContaining({
          modelProvider: mockProvider,
          modelVersion: mockModel,
        }),
      );
    });

    it('should parse promptOption from string', async () => {
      const promptOptionString = '{"lang":"english","type":"ats"}';
      const mockResponse = { text: 'Analysis' } as any;
      mockAtsService.analyzeCvAts.mockResolvedValue(mockResponse);

      await controller.analyzeCvAts(
        mockProvider,
        mockModel,
        mockFile as any,
        mockJobDesc,
        {},
        promptOptionString,
      );

      expect(mockAtsService.analyzeCvAts).toHaveBeenCalledWith(
        expect.objectContaining({
          promptOption: { lang: 'english', type: 'ats' },
        }),
        expect.any(Object),
      );
    });

    it('should handle service errors and throw InternalServerErrorException', async () => {
      mockAtsService.analyzeCvAts.mockRejectedValue(new Error('Service error'));

      await expect(
        controller.analyzeCvAts(
          mockProvider,
          mockModel,
          mockFile as any,
          mockJobDesc,
          {},
          undefined,
        ),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
});
