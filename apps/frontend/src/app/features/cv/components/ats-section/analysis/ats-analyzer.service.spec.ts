import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AtsAnalyzerService } from './ats-analyzer.service';
import { AtsApiService } from '../api/ats-api.service';
import { TaigaAlertsService } from '../../../../../core/services/alerts/taiga-alerts.service';
import { CvStateService } from '../../../services/cv-form/cv-form-state/cv-state.service';
import { TuiLanguageSwitcherService } from '@taiga-ui/i18n/utils';
import { signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { jest } from '@jest/globals';
import { MOCK_CV_ATS_RESPONSE } from '../../../../../shared/testing/mocks/ats.mock';

describe('AtsAnalyzerService', () => {
  let service: AtsAnalyzerService;

  let atsApiServiceMock: any;
  let taigaAlertsServiceMock: any;
  let cvStateServiceMock: any;
  let languageSwitcherMock: any;
  let mockIaForm: FormGroup;

  beforeEach(() => {
    atsApiServiceMock = {
      isLoading: signal(false),
      response: signal(null),
      getAtsScore: jest.fn(),
    };

    taigaAlertsServiceMock = {
      showSuccess: jest.fn().mockReturnValue(of(null)),
      showWarning: jest.fn().mockReturnValue(of(null)),
      showError: jest.fn().mockReturnValue(of(null)),
    };

    mockIaForm = new FormGroup({
      jobDescription: new FormControl('Software Engineer needed...'),
    });

    cvStateServiceMock = {
      iaForm: mockIaForm,
    };

    languageSwitcherMock = {
      language: 'spanish',
    };

    TestBed.configureTestingModule({
      providers: [
        AtsAnalyzerService,
        { provide: AtsApiService, useValue: atsApiServiceMock },
        { provide: TaigaAlertsService, useValue: taigaAlertsServiceMock },
        { provide: CvStateService, useValue: cvStateServiceMock },
        { provide: TuiLanguageSwitcherService, useValue: languageSwitcherMock },
      ],
    });
    service = TestBed.inject(AtsAnalyzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('File Processing (processFile)', () => {
    it('should accept valid PDF files', fakeAsync(() => {
      const file = new File(['dummy content'], 'cv.pdf', { type: 'application/pdf' });

      const sub = service.loadedFiles$.subscribe();
      service.fileControl.setValue(file);
      tick();

      expect(service.cvFile()).toBe(file);
      sub.unsubscribe();
    }));

    it('should reject non-PDF files', fakeAsync(() => {
      const file = new File(['dummy content'], 'image.png', { type: 'image/png' });
      const failedSpy = jest.spyOn(service.failedFiles$, 'next');

      const sub = service.loadedFiles$.subscribe();
      service.fileControl.setValue(file);
      tick();

      expect(service.cvFile()).toBeNull();
      expect(failedSpy).toHaveBeenCalledWith(file);
      sub.unsubscribe();
    }));

    it('should clear file when removeFile is called', () => {
      const file = new File([''], 'cv.pdf', { type: 'application/pdf' });
      service.cvFile.set(file);
      service.fileControl.setValue(file);

      service.removeFile();

      expect(service.cvFile()).toBeNull();
      expect(service.fileControl.value).toBeNull();
    });
  });

  describe('Score Calculation (calculateAtsScore)', () => {
    it('should call API with correct data when file is present', () => {
      const file = new File(['content'], 'my-cv.pdf', { type: 'application/pdf' });
      service.cvFile.set(file);
      atsApiServiceMock.getAtsScore.mockReturnValue(of(MOCK_CV_ATS_RESPONSE));

      service.calculateAtsScore();

      expect(atsApiServiceMock.getAtsScore).toHaveBeenCalled();
      const formData = atsApiServiceMock.getAtsScore.mock.calls[0][0] as FormData;
      expect(formData.has('file')).toBeTruthy();
      expect(formData.get('jobDesc')).toBe('Software Engineer needed...');
    });

    it('should show alert warning if no file is selected', () => {
      service.cvFile.set(null);

      service.calculateAtsScore();

      expect(atsApiServiceMock.getAtsScore).not.toHaveBeenCalled();
      expect(taigaAlertsServiceMock.showWarning).toHaveBeenCalledWith(
        'alerts.ats.errors.pdf_format',
      );
    });

    it('should handle API errors gracefully', () => {
      const file = new File([''], 'cv.pdf', { type: 'application/pdf' });
      service.cvFile.set(file);
      atsApiServiceMock.getAtsScore.mockReturnValue(throwError(() => new Error('API Error')));

      service.calculateAtsScore();

      expect(taigaAlertsServiceMock.showError).toHaveBeenCalled();
    });
  });

  describe('Computed Signals', () => {
    it('should calculate score color correctly', () => {
      atsApiServiceMock.response.set(null);
      expect(service.scoreColor()).toContain('support-08');

      atsApiServiceMock.response.set({ ...MOCK_CV_ATS_RESPONSE, matchScore: 30 });
      expect(service.scoreColor()).toContain('negative');

      atsApiServiceMock.response.set({ ...MOCK_CV_ATS_RESPONSE, matchScore: 75 });
      expect(service.scoreColor()).toContain('warning');

      atsApiServiceMock.response.set({ ...MOCK_CV_ATS_RESPONSE, matchScore: 95 });
      expect(service.scoreColor()).toContain('positive');
    });

    it('should map analyzed sections correctly', () => {
      atsApiServiceMock.response.set(MOCK_CV_ATS_RESPONSE);

      const sections = service.analyzedSections();
      expect(sections.length).toBeGreaterThan(0);

      const skillsSection = sections.find((s) => s.name === 'skills');
      expect(skillsSection).toBeDefined();
      expect(skillsSection?.score).toBe(95);
    });

    it('should return empty array if no response', () => {
      atsApiServiceMock.response.set(null);
      expect(service.analyzedSections()).toEqual([]);
    });

    it('should return correct fit level color', () => {
      atsApiServiceMock.response.set({ ...MOCK_CV_ATS_RESPONSE, fitLevel: 'Low' });
      expect(service.fitLevelColor()).toContain('negative');

      atsApiServiceMock.response.set({ ...MOCK_CV_ATS_RESPONSE, fitLevel: 'Medium' });
      expect(service.fitLevelColor()).toContain('warning');

      atsApiServiceMock.response.set({ ...MOCK_CV_ATS_RESPONSE, fitLevel: 'High' });
      expect(service.fitLevelColor()).toContain('positive');
    });
  });
});
