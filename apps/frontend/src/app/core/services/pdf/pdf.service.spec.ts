import { TestBed } from '@angular/core/testing';
import { PdfService } from './pdf.service';
import { TranslocoService } from '@jsverse/transloco';
import { jest } from '@jest/globals';
const mockSave = jest.fn();
const mockText = jest.fn();
const mockAddPage = jest.fn();
const mockSetFont = jest.fn();
const mockSetFontSize = jest.fn();
const mockLine = jest.fn();
jest.mock('jspdf', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      internal: {
        pageSize: {
          getWidth: () => 595,
          getHeight: () => 842,
        },
      },
      setFont: mockSetFont,
      setFontSize: mockSetFontSize,
      setDrawColor: jest.fn(),
      setTextColor: jest.fn(),
      text: mockText,
      textWithLink: jest.fn(),
      line: mockLine,
      splitTextToSize: jest.fn((text: string) => [text]),
      getTextWidth: jest.fn(() => 50),
      addPage: mockAddPage,
      save: mockSave,
    })),
  };
});
import jsPDF from 'jspdf';
import { MOCK_CV_FORM } from '../../../shared/testing/mocks/cv.form.mock';
describe('PdfService', () => {
  let service: PdfService;
  let translocoMock: any;
  beforeEach(() => {
    jest.clearAllMocks();
    translocoMock = {
      translate: jest.fn((key: string) => `TRANSLATED_${key}`),
    };
    TestBed.configureTestingModule({
      providers: [PdfService, { provide: TranslocoService, useValue: translocoMock }],
    });
    service = TestBed.inject(PdfService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('downloadPdf', () => {
    it('should initialize jsPDF and save the file', () => {
      service.downloadPdf(MOCK_CV_FORM);
      expect(jsPDF).toHaveBeenCalledWith('p', 'pt', 'a4');
      expect(mockSave).toHaveBeenCalledWith('CV_Harvard.pdf');
    });
    it('should translate section titles', () => {
      service.downloadPdf(MOCK_CV_FORM);
      expect(translocoMock.translate).toHaveBeenCalledWith('view.experience');
      expect(mockText).toHaveBeenCalledWith(
        expect.stringMatching(/TRANSLATED_VIEW.EXPERIENCE/i),
        expect.any(Number),
        expect.any(Number),
      );
    });
    it('should draw personal info correctly', () => {
      service.downloadPdf(MOCK_CV_FORM);
      expect(mockText).toHaveBeenCalledWith(
        expect.stringContaining(MOCK_CV_FORM.personalInfo.name!),
        expect.any(Number),
        expect.any(Number),
        expect.anything(),
      );
    });
    it('should handle empty data gracefully', () => {
      const emptyCv = { ...MOCK_CV_FORM, experience: [], projects: [], skills: [] };
      service.downloadPdf(emptyCv);
      expect(mockSave).toHaveBeenCalled();
      expect(mockText).not.toHaveBeenCalledWith(
        expect.stringMatching(/TRANSLATED_VIEW.EXPERIENCE/i),
        expect.any(Number),
        expect.any(Number),
      );
    });
  });
});
