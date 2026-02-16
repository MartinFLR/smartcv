import { TestBed } from '@angular/core/testing';
import { CvFormManagerService } from './cv-form-manager.service';
import { CvFormBuilderService } from '../cv-form-builder/cv-form-builder.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CvForm, TransformedCvResponse } from '@smartcv/types';
import { jest } from '@jest/globals';
describe('CvFormManagerService', () => {
  let service: CvFormManagerService;
  let cvFormBuilderServiceMock: any;
  beforeEach(() => {
    cvFormBuilderServiceMock = {
      buildCvForm: jest.fn().mockReturnValue(
        new FormGroup({
          personalInfo: new FormGroup({}),
          education: new FormArray([]),
          experience: new FormArray([]),
          projects: new FormArray([]),
          skills: new FormArray([]),
        }),
      ),
      buildIaForm: jest.fn().mockReturnValue(new FormGroup({})),
      createExperienceGroup: jest.fn().mockReturnValue(new FormGroup({})),
      createEducationGroup: jest.fn().mockReturnValue(new FormGroup({})),
      createProjectGroup: jest.fn().mockReturnValue(new FormGroup({})),
      createSkillGroup: jest.fn().mockReturnValue(new FormGroup({})),
    };
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        CvFormManagerService,
        { provide: CvFormBuilderService, useValue: cvFormBuilderServiceMock },
      ],
    });
    service = TestBed.inject(CvFormManagerService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('buildCvForm', () => {
    it('should call builder.buildCvForm', () => {
      service.buildCvForm();
      expect(cvFormBuilderServiceMock.buildCvForm).toHaveBeenCalled();
    });
  });
  describe('buildIaForm', () => {
    it('should call builder.buildIaForm', () => {
      service.buildIaForm();
      expect(cvFormBuilderServiceMock.buildIaForm).toHaveBeenCalled();
    });
  });
  describe('patchFormArrays', () => {
    it('should update form arrays with response data', () => {
      const form = service.buildCvForm();
      const response: TransformedCvResponse = {
        experience: [{} as any],
        education: [{} as any],
        project: [{} as any],
        skills: [{} as any],
      } as any;
      service.patchFormArrays(form, response);
      expect(cvFormBuilderServiceMock.createExperienceGroup).toHaveBeenCalledTimes(1);
      expect(cvFormBuilderServiceMock.createEducationGroup).toHaveBeenCalledTimes(1);
      expect(cvFormBuilderServiceMock.createProjectGroup).toHaveBeenCalledTimes(1);
      expect(cvFormBuilderServiceMock.createSkillGroup).toHaveBeenCalledTimes(1);
      expect((form.controls.experience as FormArray).length).toBe(1);
    });
  });
  describe('patchCvData', () => {
    it('should update form arrays and personal info with saved data', () => {
      const form = service.buildCvForm();
      // Mock personal info control with patchValue
      (form.controls.personalInfo as any).patchValue = jest.fn();
      const cvData: CvForm = {
        personalInfo: { name: 'Test' },
        experience: [{} as any],
        education: [],
        projects: [],
        skills: [],
      } as any;
      service.patchCvData(form, cvData);
      expect((form.controls.personalInfo as any).patchValue).toHaveBeenCalledWith(
        cvData.personalInfo,
      );
      expect(cvFormBuilderServiceMock.createExperienceGroup).toHaveBeenCalledTimes(1);
      expect((form.controls.experience as FormArray).length).toBe(1);
    });
  });
  describe('resetCvForm', () => {
    it('should clear arrays and reset form', () => {
      const form = service.buildCvForm();
      (form.controls.experience as FormArray).push(new FormGroup({}));
      form.reset = jest.fn();
      service.resetCvForm(form);
      expect((form.controls.experience as FormArray).length).toBe(0);
      expect(form.reset).toHaveBeenCalled();
    });
  });
  describe('ensureMinimumFormArrays', () => {
    it('should add one item if array is empty', () => {
      const form = service.buildCvForm();
      service.ensureMinimumFormArrays(form);
      expect((form.controls.experience as FormArray).length).toBe(1);
      expect((form.controls.education as FormArray).length).toBe(1);
      expect((form.controls.projects as FormArray).length).toBe(1);
      expect((form.controls.skills as FormArray).length).toBe(1);
    });
    it('should not add item if array is not empty', () => {
      const form = service.buildCvForm();
      (form.controls.experience as FormArray).push(new FormGroup({}));
      service.ensureMinimumFormArrays(form);
      expect((form.controls.experience as FormArray).length).toBe(1);
    });
  });
});
