import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IaSectionService } from './ia-section.service';
import { CvStateService } from '../../../services/cv-form/cv-form-state/cv-state.service';
import { CvFormDataService } from '../../../services/cv-form/cv-form-data/cv-form-data.service';
import { CvFormManagerService } from '../../../services/cv-form/cv-form-manager/cv-form-manager.service';
import { TuiAlertService } from '@taiga-ui/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { signal } from '@angular/core';
import { of, throwError } from 'rxjs';
import { jest } from '@jest/globals';

describe('IaSectionService', () => {
  let service: IaSectionService;
  let cvStateServiceMock: any;
  let cvFormDataServiceMock: any;
  let cvFormManagerServiceMock: any;
  let tuiAlertServiceMock: any;
  let mockIaForm: FormGroup;
  let mockCvForm: FormGroup;

  beforeEach(() => {
    mockIaForm = new FormGroup({
      jobDescription: new FormControl('', Validators.required),
      exaggeration: new FormControl(0),
      makeEnglish: new FormControl(false),
    });

    mockCvForm = new FormGroup({
      personalInfo: new FormControl({}),
    });

    cvStateServiceMock = {
      iaForm: mockIaForm,
      cvForm: mockCvForm,
      isLoading: signal(false),
      isCvLocked: jest.fn().mockReturnValue(false),
      lockedCv: jest.fn().mockReturnValue(null),
    };

    cvFormDataServiceMock = {
      optimizeCv: jest.fn(),
      saveCv: jest.fn(),
    };

    cvFormManagerServiceMock = {
      patchFormArrays: jest.fn(),
    };

    tuiAlertServiceMock = {
      open: jest.fn().mockReturnValue(of(null)),
    };

    TestBed.configureTestingModule({
      providers: [
        IaSectionService,
        { provide: CvStateService, useValue: cvStateServiceMock },
        { provide: CvFormDataService, useValue: cvFormDataServiceMock },
        { provide: CvFormManagerService, useValue: cvFormManagerServiceMock },
        { provide: TuiAlertService, useValue: tuiAlertServiceMock },
      ],
    });
    service = TestBed.inject(IaSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('currentExaggeration', () => {
    it('should update when form control changes', fakeAsync(() => {
      mockIaForm.controls['exaggeration'].setValue(2);
      tick();
      expect(service.currentExaggeration()).toBe(2);
    }));
  });

  describe('setExaggeration', () => {
    it('should update form control value', () => {
      service.setExaggeration(1);
      expect(mockIaForm.controls['exaggeration'].value).toBe(1);
    });
  });

  describe('optimizeCv', () => {
    it('should show alert if form is invalid (missing job description)', () => {
      mockIaForm.controls['jobDescription'].setValue('');

      service.optimizeCv();

      expect(tuiAlertServiceMock.open).toHaveBeenCalledWith(
        expect.stringContaining('Falta la Job Description'),
        expect.objectContaining({ appearance: 'error' }),
      );
      expect(cvFormDataServiceMock.optimizeCv).not.toHaveBeenCalled();
    });

    it('should call optimizeCv and handle success', () => {
      // Arrange
      mockIaForm.controls['jobDescription'].setValue('Angular Dev');
      const mockResponse = { profileSummary: 'New Summary', job: 'New Job' };
      cvFormDataServiceMock.optimizeCv.mockReturnValue(of(mockResponse));

      // Act
      service.optimizeCv();

      // Assert
      expect(cvStateServiceMock.isLoading()).toBe(false);
      expect(cvFormManagerServiceMock.patchFormArrays).toHaveBeenCalledWith(
        mockCvForm,
        mockResponse,
      );
      expect(cvFormDataServiceMock.saveCv).toHaveBeenCalled();
      expect(tuiAlertServiceMock.open).toHaveBeenCalledWith(
        expect.stringContaining('CV optimizado'),
        expect.objectContaining({ appearance: 'success' }),
      );
    });

    it('should handle API error', () => {
      // Arrange
      mockIaForm.controls['jobDescription'].setValue('Angular Dev');
      cvFormDataServiceMock.optimizeCv.mockReturnValue(throwError(() => new Error('API Error')));
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      // Act
      service.optimizeCv();

      // Assert
      expect(cvStateServiceMock.isLoading()).toBe(false);
      expect(tuiAlertServiceMock.open).toHaveBeenCalledWith(
        expect.stringContaining('API Error'),
        expect.objectContaining({ appearance: 'error' }),
      );

      consoleSpy.mockRestore();
    });
  });
});
