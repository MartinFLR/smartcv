import { jest } from '@jest/globals';
import { signal } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {
  CvFormControls,
  EducationControls,
  ExperienceControls,
  IaFormControls,
  PersonalInfoControls,
  ProjectControls,
  SkillsControls,
} from '../../../core/models/controls.model';
import { CvForm } from '@smartcv/types';

export const mockPersonalInfoGroup = new FormGroup<PersonalInfoControls>({
  name: new FormControl('Martin Developer'),
  job: new FormControl(''),
  email: new FormControl(''),
  phone: new FormControl(''),
  location: new FormControl(''),
  linkedin: new FormControl(''),
  github: new FormControl(''),
  web: new FormControl(''),
  photo: new FormControl(''),
  profileSummary: new FormControl(''),
});

export const mockEducationGroup = new FormGroup<EducationControls>({
  title: new FormControl(''),
  dateIn: new FormControl(''),
  dateFin: new FormControl(''),
  institution: new FormControl(''),
  bullets: new FormControl(''),
});

export const mockExperienceGroup = new FormGroup<ExperienceControls>({
  role: new FormControl(''),
  dateIn: new FormControl(''),
  dateFin: new FormControl(''),
  company: new FormControl(''),
  bullets: new FormControl(''),
});

export const mockProjectsGroup = new FormGroup<ProjectControls>({
  name: new FormControl(''),
  dateIn: new FormControl(''),
  dateFin: new FormControl(''),
  subtitle: new FormControl(''),
  bullets: new FormControl(''),
});

export const mockEducationArray = new FormArray<FormGroup<EducationControls>>([]);
export const mockExperienceArray = new FormArray<FormGroup<ExperienceControls>>([]);
export const mockProjectsArray = new FormArray<FormGroup<ProjectControls>>([]);
export const mockSkillsArray = new FormArray<FormGroup<SkillsControls>>([]);

export const mockCvForm = new FormGroup<CvFormControls>({
  personalInfo: mockPersonalInfoGroup,
  education: mockEducationArray,
  experience: mockExperienceArray,
  projects: mockProjectsArray,
  skills: mockSkillsArray,
});

export const mockIaForm = new FormGroup<IaFormControls>({
  jobDescription: new FormControl(''),
  exaggeration: new FormControl(0),
});

const initialCvPreview: CvForm = {
  personalInfo: mockPersonalInfoGroup.getRawValue(),
  education: [],
  experience: [],
  projects: [],
  skills: [],
};

export const stateServiceMock = {
  isLoading: signal(false),
  isCvLocked: signal(false),
  lockedCv: signal<CvForm | null>(null),
  template: signal('harvard'),

  isValid: signal(true),
  activeTab: signal(0),

  hasExperience: signal(false),
  hasEducation: signal(false),
  hasSkills: signal(false),
  hasProjects: signal(false),

  cvPreview: signal<CvForm>(initialCvPreview),

  cvForm: mockCvForm,
  iaForm: mockIaForm,

  personalInfoGroup: mockPersonalInfoGroup,
  educationArray: mockEducationArray,
  experienceArray: mockExperienceArray,
  projectsArray: mockProjectsArray,
  skillsArray: mockSkillsArray,

  resetForm: jest.fn(),
  setLockState: jest.fn((locked: boolean) => {
    stateServiceMock.isCvLocked.set(locked);
    if (!locked) stateServiceMock.lockedCv.set(null);
  }),
  setTemplate: jest.fn((template: string) => {
    stateServiceMock.template.set(template);
  }),
};
