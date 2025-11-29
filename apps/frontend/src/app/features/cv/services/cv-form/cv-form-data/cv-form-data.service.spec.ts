import { TestBed } from '@angular/core/testing';
import { CvFormDataService } from './cv-form-data.service';
import { IaApiService } from '../../../components/ia-section/api/ia-api.service';
import { PdfService } from '../../../../../core/services/pdf/pdf.service';
import { SaveDataService } from '../../../../../core/services/save-data/save-data.service';
import { of } from 'rxjs';
import { CvForm } from '@smartcv/types';
import { jest } from '@jest/globals';

describe('CvFormDataService', () => {
  let service: CvFormDataService;
  let iaApiServiceMock: any;
  let pdfServiceMock: any;
  let saveDataServiceMock: any;

  beforeEach(() => {
    iaApiServiceMock = {
      generateCvWithIA: jest.fn().mockReturnValue(of({})),
    };
    pdfServiceMock = {
      downloadPdf: jest.fn(),
    };
    saveDataServiceMock = {
      saveData: jest.fn(),
      clearData: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        CvFormDataService,
        { provide: IaApiService, useValue: iaApiServiceMock },
        { provide: PdfService, useValue: pdfServiceMock },
        { provide: SaveDataService, useValue: saveDataServiceMock },
      ],
    });
    service = TestBed.inject(CvFormDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('optimizeCv', () => {
    it('should call iaService.generateCvWithIA with correct payload (low temp)', () => {
      const baseCv = { personalInfo: { name: 'Test' } } as CvForm;
      const jobDesc = 'Developer';
      const exaggeration = 0;

      service.optimizeCv(baseCv, jobDesc, exaggeration);

      expect(iaApiServiceMock.generateCvWithIA).toHaveBeenCalledWith(
        expect.objectContaining({
          baseCv,
          jobDesc,
          promptOption: expect.objectContaining({ temperature: 'low' }),
        }),
      );
    });

    it('should call iaService.generateCvWithIA with correct payload (medium temp)', () => {
      const baseCv = {} as CvForm;
      service.optimizeCv(baseCv, '', 1);
      expect(iaApiServiceMock.generateCvWithIA).toHaveBeenCalledWith(
        expect.objectContaining({
          promptOption: expect.objectContaining({ temperature: 'medium' }),
        }),
      );
    });

    it('should call iaService.generateCvWithIA with correct payload (high temp)', () => {
      const baseCv = {} as CvForm;
      service.optimizeCv(baseCv, '', 2);
      expect(iaApiServiceMock.generateCvWithIA).toHaveBeenCalledWith(
        expect.objectContaining({
          promptOption: expect.objectContaining({ temperature: 'high' }),
        }),
      );
    });
  });

  describe('downloadPdf', () => {
    it('should call pdfService.downloadPdf', () => {
      const data = {} as CvForm;
      service.downloadPdf(data);
      expect(pdfServiceMock.downloadPdf).toHaveBeenCalledWith(data);
    });
  });

  describe('saveCv', () => {
    it('should call saveDataService.saveData', () => {
      const data = {} as CvForm;
      service.saveCv(data);
      expect(saveDataServiceMock.saveData).toHaveBeenCalledWith(data);
    });
  });

  describe('clearCv', () => {
    it('should call saveDataService.clearData', () => {
      service.clearCv();
      expect(saveDataServiceMock.clearData).toHaveBeenCalled();
    });
  });
});
