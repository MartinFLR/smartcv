import { TestBed } from '@angular/core/testing';
import { CvFormBuilderService } from './cv-form-builder.service';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

describe('CvFormBuilderService', () => {
  let service: CvFormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [CvFormBuilderService],
    });
    service = TestBed.inject(CvFormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('buildCvForm', () => {
    it('should create a form with all required sections', () => {
      const form = service.buildCvForm();
      expect(form).toBeInstanceOf(FormGroup);
      expect(form.controls.personalInfo).toBeInstanceOf(FormGroup);
      expect(form.controls.education).toBeInstanceOf(FormArray);
      expect(form.controls.experience).toBeInstanceOf(FormArray);
      expect(form.controls.projects).toBeInstanceOf(FormArray);
      expect(form.controls.skills).toBeInstanceOf(FormArray);
    });
  });

  describe('buildCoverLetterForm', () => {
    it('should create a cover letter form with required controls', () => {
      const form = service.buildCoverLetterForm();
      expect(form.controls.recruiterName).toBeDefined();
      expect(form.controls.companyName).toBeDefined();
      expect(form.controls.referralName).toBeDefined();
      expect(form.controls.tone).toBeDefined();
      expect(form.controls.deliveryChannel).toBeDefined();
    });
  });

  describe('buildIaForm', () => {
    it('should create an IA form with required controls', () => {
      const form = service.buildIaForm();
      expect(form.controls.jobDescription).toBeDefined();
      expect(form.controls.exaggeration).toBeDefined();
    });
  });

  describe('createPersonalInfoGroup', () => {
    it('should create personal info group with validators', () => {
      const group = service.createPersonalInfoGroup();
      expect(group.controls.name).toBeDefined();
      expect(group.controls.job).toBeDefined();

      // Check required validators
      const nameControl = group.controls.name;
      nameControl.setValue('');
      expect(nameControl.valid).toBeFalsy();
      nameControl.setValue('Martin');
      expect(nameControl.valid).toBeTruthy();
    });
  });

  describe('createExperienceGroup', () => {
    it('should create experience group with default values', () => {
      const group = service.createExperienceGroup();
      expect(group.controls.role.value).toBe('');
      expect(group.controls.company.value).toBe('');
    });

    it('should create experience group with provided values', () => {
      const data = { role: 'Dev', company: 'Google' };
      const group = service.createExperienceGroup(data);
      expect(group.controls.role.value).toBe('Dev');
      expect(group.controls.company.value).toBe('Google');
    });
  });

  describe('createProjectGroup', () => {
    it('should create project group with default values', () => {
      const group = service.createProjectGroup();
      expect(group.controls.name.value).toBe('');
    });

    it('should create project group with provided values', () => {
      const data = { name: 'SmartCV' };
      const group = service.createProjectGroup(data);
      expect(group.controls.name.value).toBe('SmartCV');
    });
  });

  describe('createEducationGroup', () => {
    it('should create education group with default values', () => {
      const group = service.createEducationGroup();
      expect(group.controls.title.value).toBe('');
    });

    it('should create education group with provided values', () => {
      const data = { title: 'Engineer' };
      const group = service.createEducationGroup(data);
      expect(group.controls.title.value).toBe('Engineer');
    });
  });

  describe('createCertificationGroup', () => {
    it('should create certification group', () => {
      const group = service.createCertificationGroup({ name: 'Cert', date: '2023' });
      expect(group.controls.name.value).toBe('Cert');
      expect(group.controls.date.value).toBe('2023');
    });
  });

  describe('createSkillGroup', () => {
    it('should create skill group with empty arrays by default', () => {
      const group = service.createSkillGroup();
      expect(group.controls.skills.value).toEqual([]);
      expect(group.controls.languages.value).toEqual([]);
      expect(group.controls.certifications).toBeInstanceOf(FormArray);
      expect(group.controls.certifications.length).toBe(0);
    });

    it('should create skill group with provided values including certifications', () => {
      const data = {
        skills: ['Angular'],
        languages: ['English'],
        certifications: [{ name: 'Cert 1', date: '2023' }],
        additional: [],
      };
      const group = service.createSkillGroup(data);
      expect(group.controls.skills.value).toEqual(['Angular']);
      expect(group.controls.languages.value).toEqual(['English']);
      expect(group.controls.certifications.length).toBe(1);
      expect(group.controls.certifications.at(0).value).toEqual({ name: 'Cert 1', date: '2023' });
    });
  });
});
