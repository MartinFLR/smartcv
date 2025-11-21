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

const mockPersonalInfoGroup = new FormGroup<PersonalInfoControls>({
  name: new FormControl('Martin Developer'),
  job: new FormControl(''),
  email: new FormControl(''),
  phone: new FormControl(''),
  location: new FormControl(''),
  linkedin: new FormControl(''),
  github: new FormControl(''),
  web: new FormControl(''),
  profileSummary: new FormControl(''),
});

const mockEducationArray = new FormArray<FormGroup<EducationControls>>([]);
const mockExperienceArray = new FormArray<FormGroup<ExperienceControls>>([]);
const mockProjectsArray = new FormArray<FormGroup<ProjectControls>>([]);
const mockSkillsArray = new FormArray<FormGroup<SkillsControls>>([]);

// 2. Construimos el Form Principal
const mockCvForm = new FormGroup<CvFormControls>({
  personalInfo: mockPersonalInfoGroup,
  education: mockEducationArray,
  experience: mockExperienceArray,
  projects: mockProjectsArray,
  skills: mockSkillsArray,
});

const mockIaForm = new FormGroup<IaFormControls>({
  jobDescription: new FormControl(''),
  exaggeration: new FormControl(0),
  makeEnglish: new FormControl(false),
});

export const homeStateServiceMock = {
  // --- State UI ---
  activeTab: signal(0),
  isLoading: signal(false),
  isCvLocked: signal(false),
  lockedCv: signal(null),

  cvForm: mockCvForm,
  iaForm: mockIaForm,

  cvPreview: signal(mockCvForm.getRawValue() as any),

  hasExperience: signal(false),
  hasEducation: signal(false),
  hasSkills: signal(false),
  hasProjects: signal(false),

  // --- Getters ---
  personalInfoGroup: signal(mockPersonalInfoGroup),
  educationForms: signal(mockEducationArray),
  experienceForms: signal(mockExperienceArray),
  projectForms: signal(mockProjectsArray),
  skillsForms: signal(mockSkillsArray),

  // --- Methods ---
  optimizarCv: jest.fn(),
  downloadPdf: jest.fn(),
  saveCv: jest.fn(),
  clearCv: jest.fn(),
  onLockCv: jest.fn(),
  addEducation: jest.fn(),
  removeEducation: jest.fn(),
  addExperience: jest.fn(),
  removeExperience: jest.fn(),
  addProject: jest.fn(),
  removeProject: jest.fn(),
  addSkill: jest.fn(),
  removeSkill: jest.fn(),
  addCertification: jest.fn(),
  removeCertification: jest.fn(),
};
