import { TestBed } from '@angular/core/testing';
import { CoverAnalysisService } from './cover-analysis.service';
import { CvFormBuilderService } from '../../../services/cv-form/cv-form-builder/cv-form-builder.service';
import { CoverApiService } from '../api/cover-api.service';
import { CvStateService } from '../../../services/cv-form/cv-form-state/cv-state.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { CvForm } from '@smartcv/types';
describe('CoverAnalysisService', () => {
  let service: CoverAnalysisService;
  let fb: FormBuilder;
  let cvFormBuilderMock: jest.Mocked<CvFormBuilderService>;
  let coverApiServiceMock: jest.Mocked<CoverApiService>;
  let cvStateServiceMock: jest.Mocked<CvStateService>;
  beforeEach(() => {
    fb = new FormBuilder();
    const mockCoverLetterForm = fb.group({
      tone: [0],
      deliveryChannel: [0],
      recruiterName: [''],
      companyName: [''],
      referralName: [''],
    });
    const mockCvForm = fb.group({
      personalInfo: fb.group({ name: 'Test User' }),
    });
    const mockIaForm = fb.group({
      jobDescription: ['Test Job Description'],
    });
    cvFormBuilderMock = {
      buildCoverLetterForm: jest.fn().mockReturnValue(mockCoverLetterForm),
    } as unknown as jest.Mocked<CvFormBuilderService>;
    coverApiServiceMock = {
      generateCoverLetterStream: jest.fn(),
    } as unknown as jest.Mocked<CoverApiService>;
    cvStateServiceMock = {
      cvForm: mockCvForm,
      iaForm: mockIaForm,
    } as unknown as jest.Mocked<CvStateService>;
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        CoverAnalysisService,
        { provide: CvFormBuilderService, useValue: cvFormBuilderMock },
        { provide: CoverApiService, useValue: coverApiServiceMock },
        { provide: CvStateService, useValue: cvStateServiceMock },
      ],
    });
    service = TestBed.inject(CoverAnalysisService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('Initialization', () => {
    it('should build cover letter form', () => {
      expect(cvFormBuilderMock.buildCoverLetterForm).toHaveBeenCalled();
      expect(service.form).toBeDefined();
    });
    it('should initialize signals', () => {
      expect(service.generatedLetter()).toBe('');
      expect(service.isLoading()).toBe(false);
    });
  });
  describe('Computed Signals', () => {
    it('should correctly identify application form channel', () => {
      service.form.controls.deliveryChannel.setValue(2); // Application Form
      TestBed.flushEffects();
      expect(service.isApplicationForm()).toBe(true);
      service.form.controls.deliveryChannel.setValue(0); // LinkedIn
      TestBed.flushEffects();
      expect(service.isApplicationForm()).toBe(false);
    });
    it('should correctly identify internal referral channel', () => {
      service.form.controls.deliveryChannel.setValue(3); // Internal Referral
      TestBed.flushEffects();
      expect(service.isInternalReference()).toBe(true);
      service.form.controls.deliveryChannel.setValue(0); // LinkedIn
      TestBed.flushEffects();
      expect(service.isInternalReference()).toBe(false);
    });
  });
  describe('Effects', () => {
    it('should disable recruiterName when application form is selected', () => {
      service.form.controls.recruiterName.setValue('Recruiter');
      service.form.controls.deliveryChannel.setValue(2); // Application Form
      TestBed.flushEffects();
      expect(service.form.controls.recruiterName.disabled).toBe(true);
      expect(service.form.controls.recruiterName.value).toBe('');
    });
    it('should enable and restore recruiterName when switching back from application form', () => {
      service.form.controls.recruiterName.setValue('Recruiter');
      service.form.controls.deliveryChannel.setValue(2); // Application Form
      TestBed.flushEffects();
      service.form.controls.deliveryChannel.setValue(0); // LinkedIn
      TestBed.flushEffects();
      expect(service.form.controls.recruiterName.enabled).toBe(true);
      expect(service.form.controls.recruiterName.value).toBe('Recruiter');
    });
    it('should enable referralName when internal referral is selected', () => {
      service.form.controls.referralName.disable();
      service.form.controls.deliveryChannel.setValue(3); // Internal Referral
      TestBed.flushEffects();
      expect(service.form.controls.referralName.enabled).toBe(true);
    });
    it('should disable and clear referralName when switching away from internal referral', () => {
      service.form.controls.referralName.setValue('Referral');
      service.form.controls.deliveryChannel.setValue(0); // LinkedIn
      TestBed.flushEffects();
      expect(service.form.controls.referralName.disabled).toBe(true);
      expect(service.form.controls.referralName.value).toBe('');
    });
  });
  describe('generate', () => {
    it('should call apiService and update generatedLetter on success', () => {
      const mockStream = of('Part 1', 'Part 2');
      coverApiServiceMock.generateCoverLetterStream.mockReturnValue(mockStream);
      service.generate();
      expect(service.isLoading()).toBe(false);
      expect(service.generatedLetter()).toBe('Part 1Part 2');
      expect(coverApiServiceMock.generateCoverLetterStream).toHaveBeenCalled();
    });
    it('should handle error during generation', () => {
      const mockError = new Error('API Error');
      coverApiServiceMock.generateCoverLetterStream.mockReturnValue(throwError(() => mockError));
      jest.spyOn(console, 'error').mockImplementation(() => {});
      service.generate();
      expect(service.isLoading()).toBe(false);
      expect(service.generatedLetter()).toBe('Error al generar la carta. Intenta nuevamente.');
    });
  });
});
