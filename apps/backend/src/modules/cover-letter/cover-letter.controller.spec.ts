import { Test, TestingModule } from '@nestjs/testing';
import { CoverLetterController } from './cover-letter.controller';
import { CoverLetterService } from './cover-letter.service';
import { Response } from 'express';
import { InternalServerErrorException } from '@nestjs/common';
import { CoverLetterPayload } from '@smartcv/types';

describe('CoverLetterController', () => {
  let controller: CoverLetterController;
  let service: CoverLetterService;

  const mockCoverLetterService = {
    generateCoverLetterStream: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoverLetterController],
      providers: [
        {
          provide: CoverLetterService,
          useValue: mockCoverLetterService,
        },
      ],
    }).compile();

    controller = module.get<CoverLetterController>(CoverLetterController);
    service = module.get<CoverLetterService>(CoverLetterService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('generateCoverLetter', () => {
    const mockProvider = 'google';
    const mockModel = 'gemini-2.0-flash';
    const mockBody: CoverLetterPayload = {
      baseCv: {
        summary: 'Software engineer',
        experience: [],
        education: [],
        skills: [],
        projects: [],
      } as any,
      jobDesc: 'Backend developer position',
      promptOption: { lang: 'spanish', type: 'coverLetter' },
    };

    let mockResponse: Partial<Response>;

    beforeEach(() => {
      mockResponse = {
        setHeader: jest.fn(),
        write: jest.fn(),
        end: jest.fn(),
        headersSent: false,
      };
    });

    it('should successfully stream cover letter when valid data is provided', async () => {
      const mockStream = (async function* () {
        yield 'Dear ';
        yield 'Hiring Manager,\n';
        yield 'I am writing...';
      })();

      mockCoverLetterService.generateCoverLetterStream.mockResolvedValue(mockStream);

      await controller.generateCoverLetter(
        mockProvider,
        mockModel,
        mockBody,
        mockResponse as Response,
      );

      expect(mockResponse.setHeader).toHaveBeenCalledWith(
        'Content-Type',
        'text/plain; charset=utf-8',
      );
      expect(mockResponse.setHeader).toHaveBeenCalledWith('Transfer-Encoding', 'chunked');
      expect(mockResponse.write).toHaveBeenCalledTimes(3);
      expect(mockResponse.end).toHaveBeenCalled();
    });

    it('should throw error when stream is undefined', async () => {
      mockCoverLetterService.generateCoverLetterStream.mockResolvedValue(undefined);

      await expect(
        controller.generateCoverLetter(mockProvider, mockModel, mockBody, mockResponse as Response),
      ).rejects.toThrow('No se pudo generar el stream.');
    });

    it('should handle errors gracefully when headers not sent', async () => {
      mockCoverLetterService.generateCoverLetterStream.mockRejectedValue(
        new Error('Service error'),
      );

      await expect(
        controller.generateCoverLetter(mockProvider, mockModel, mockBody, mockResponse as Response),
      ).rejects.toThrow(InternalServerErrorException);
    });

    it('should end response when error occurs after headers sent', async () => {
      const mockStreamError = (async function* () {
        yield 'Some ';
        throw new Error('Stream error');
      })();

      mockCoverLetterService.generateCoverLetterStream.mockResolvedValue(mockStreamError);
      mockResponse.headersSent = true;

      await controller.generateCoverLetter(
        mockProvider,
        mockModel,
        mockBody,
        mockResponse as Response,
      );

      expect(mockResponse.end).toHaveBeenCalled();
    });

    it('should pass correct AI settings to service', async () => {
      const mockStream = (async function* () {
        yield 'Test';
      })();
      mockCoverLetterService.generateCoverLetterStream.mockResolvedValue(mockStream);

      await controller.generateCoverLetter(
        'anthropic',
        'claude-3-5-sonnet',
        mockBody,
        mockResponse as Response,
      );

      expect(mockCoverLetterService.generateCoverLetterStream).toHaveBeenCalledWith(
        mockBody,
        expect.objectContaining({
          modelProvider: 'anthropic',
          modelVersion: 'claude-3-5-sonnet',
        }),
      );
    });
  });
});
