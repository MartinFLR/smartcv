import { TestBed } from '@angular/core/testing';
import { CvStateService } from './cv-state.service';
import { CvFormManagerService } from '../cv-form-manager/cv-form-manager.service';
import { SaveDataService } from '../../../../../core/services/save-data/save-data.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { signal, WritableSignal } from '@angular/core';
import { CvForm } from '@smartcv/types';

describe('CvStateService', () => {
  let service: CvStateService;
  let formManagerMock: jest.Mocked<CvFormManagerService>;
  let saveDataServiceMock: {
    activeCv: WritableSignal<CvForm | null>;
    clearData: jest.Mock;
    loadMeta: jest.Mock;
    saveMeta: jest.Mock;
  };
  let fb: FormBuilder;

  beforeEach(() => {
    fb = new FormBuilder();

    const mockCvForm = fb.group({
      personalInfo: fb.group({
        name: ['Test Name', Validators.required],
        email: ['test@example.com', Validators.required],
      }),
      education: fb.array([]),
      experience: fb.array([]),
      projects: fb.array([]),
      skills: fb.array([]),
    });

    const mockIaForm = fb.group({
      jobDescription: [''],
    });

    formManagerMock = {
      buildCvForm: jest.fn().mockReturnValue(mockCvForm),
      buildIaForm: jest.fn().mockReturnValue(mockIaForm),
      ensureMinimumFormArrays: jest.fn(),
      patchCvData: jest.fn(),
      resetCvForm: jest.fn(),
    } as unknown as jest.Mocked<CvFormManagerService>;

    saveDataServiceMock = {
      activeCv: signal<CvForm | null>(null),
      clearData: jest.fn(),
      loadMeta: jest.fn().mockReturnValue({ isLocked: false, template: 'harvard' }),
      saveMeta: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        CvStateService,
        { provide: CvFormManagerService, useValue: formManagerMock },
        { provide: SaveDataService, useValue: saveDataServiceMock },
      ],
    });

    service = TestBed.inject(CvStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should build forms and ensure minimum arrays', () => {
      expect(formManagerMock.buildCvForm).toHaveBeenCalled();
      expect(formManagerMock.buildIaForm).toHaveBeenCalled();
      expect(formManagerMock.ensureMinimumFormArrays).toHaveBeenCalledWith(service.cvForm);
    });

    it('should initialize signals with default values', () => {
      expect(service.isLoading()).toBe(false);
      expect(service.isCvLocked()).toBe(false);
      expect(service.lockedCv()).toBeNull();
    });
  });

  describe('Effects', () => {
    it('should patch CV data when activeCv emits a value', () => {
      const mockCv: CvForm = { personalInfo: { name: 'John Doe' } } as CvForm;
      saveDataServiceMock.activeCv.set(mockCv);
      TestBed.flushEffects();

      expect(formManagerMock.patchCvData).toHaveBeenCalledWith(service.cvForm, mockCv);
    });

    it('should reset internal state when activeCv emits null', () => {
      // First set a value to ensure we can transition to null
      saveDataServiceMock.activeCv.set({} as CvForm);
      TestBed.flushEffects();
      formManagerMock.resetCvForm.mockClear();
      formManagerMock.ensureMinimumFormArrays.mockClear();

      saveDataServiceMock.activeCv.set(null);
      TestBed.flushEffects();

      expect(formManagerMock.resetCvForm).toHaveBeenCalledWith(service.cvForm);
      expect(formManagerMock.ensureMinimumFormArrays).toHaveBeenCalledWith(service.cvForm);
      expect(service.isCvLocked()).toBe(false);
      expect(service.lockedCv()).toBeNull();
    });
  });

  describe('Methods', () => {
    it('should reset form and clear data', () => {
      service.resetForm();

      expect(saveDataServiceMock.clearData).toHaveBeenCalled();
      expect(formManagerMock.resetCvForm).toHaveBeenCalledWith(service.cvForm);
      expect(formManagerMock.ensureMinimumFormArrays).toHaveBeenCalledWith(service.cvForm);
      expect(service.isCvLocked()).toBe(false);
      expect(service.lockedCv()).toBeNull();
    });

    it('should set lock state', () => {
      service.setLockState(true);
      expect(service.isCvLocked()).toBe(true);
      expect(service.lockedCv()).toEqual(service.cvForm.getRawValue());

      service.setLockState(false);
      expect(service.isCvLocked()).toBe(false);
      expect(service.lockedCv()).toBeNull();
    });
  });

  describe('Computed Signals', () => {
    it('should update isValid when form validity changes', () => {
      // Initial state (invalid because required fields are empty/default)
      // Note: In our mock setup, name and email are required.
      // Initial values are 'Test Name' and 'test@example.com' which are valid.
      // Let's make it invalid.
      service.cvForm.get('personalInfo.name')?.setValue('');
      expect(service.isValid()).toBe(false);

      service.cvForm.get('personalInfo.name')?.setValue('Valid Name');
      expect(service.isValid()).toBe(true);
    });

    it('should update hasExperience based on form array', () => {
      expect(service.hasExperience()).toBe(false);

      const expGroup = fb.group({ company: 'Test Co' });
      (service.cvForm.get('experience') as any).push(expGroup);

      expect(service.hasExperience()).toBe(true);
    });

    it('should update hasEducation based on form array', () => {
      expect(service.hasEducation()).toBe(false);
      const eduGroup = fb.group({ school: 'Test School' });
      (service.cvForm.get('education') as any).push(eduGroup);
      expect(service.hasEducation()).toBe(true);
    });

    it('should update hasProjects based on form array', () => {
      expect(service.hasProjects()).toBe(false);
      const projGroup = fb.group({ title: 'Test Project' });
      (service.cvForm.get('projects') as any).push(projGroup);
      expect(service.hasProjects()).toBe(true);
    });

    it('should update hasSkills based on form array', () => {
      expect(service.hasSkills()).toBe(false);

      // Skills structure is array of groups, each having skills/languages/certifications arrays
      const skillsGroup = fb.group({
        skills: fb.array(['Java']),
        languages: fb.array([]),
        certifications: fb.array([]),
      });
      (service.cvForm.get('skills') as any).push(skillsGroup);

      expect(service.hasSkills()).toBe(true);
    });
  });

  describe('Getters', () => {
    it('should return correct form controls', () => {
      expect(service.personalInfoGroup).toBe(service.cvForm.get('personalInfo'));
      expect(service.educationArray).toBe(service.cvForm.get('education'));
      expect(service.experienceArray).toBe(service.cvForm.get('experience'));
      expect(service.projectsArray).toBe(service.cvForm.get('projects'));
      expect(service.skillsArray).toBe(service.cvForm.get('skills'));
    });
  });
});
