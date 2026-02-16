import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface CoverLetterControls {
  companyName: FormControl<string | null>;
  recruiterName: FormControl<string | null>;
  referralName: FormControl<string | null>;
  tone: FormControl<number | null>;
  deliveryChannel: FormControl<number | null>;
}

export interface PersonalInfoControls {
  name: FormControl<string | null>;
  job: FormControl<string | null>;
  email: FormControl<string | null>;
  location: FormControl<string | null>;
  phone: FormControl<string | null>;
  linkedin: FormControl<string | null>;
  web: FormControl<string | null>;
  github: FormControl<string | null>;
  photo: FormControl<string | null>;
  profileSummary: FormControl<string | null>;
}

export interface EducationControls {
  title: FormControl<string | null>;
  institution: FormControl<string | null>;
  bullets: FormControl<string | null>;
  dateIn: FormControl<string | null>;
  dateFin: FormControl<string | null>;
}

export interface ExperienceControls {
  role: FormControl<string | null>;
  company: FormControl<string | null>;
  bullets: FormControl<string | null>;
  dateIn: FormControl<string | null>;
  dateFin: FormControl<string | null>;
}

export interface ProjectControls {
  name: FormControl<string | null>;
  subtitle: FormControl<string | null>;
  bullets: FormControl<string | null>;
  dateIn: FormControl<string | null>;
  dateFin: FormControl<string | null>;
}

export interface CertificationControls {
  name: FormControl<string | null>;
  date: FormControl<string | null>;
}

export interface SkillsControls {
  skills: FormControl<string[] | null>;
  languages: FormControl<string[] | null>;
  certifications: FormArray<FormGroup<CertificationControls>>;
  additional: FormControl<string[] | null>;
}

export interface CvFormControls {
  personalInfo: FormGroup<PersonalInfoControls>;
  education: FormArray<FormGroup<EducationControls>>;
  experience: FormArray<FormGroup<ExperienceControls>>;
  projects: FormArray<FormGroup<ProjectControls>>;
  skills: FormArray<FormGroup<SkillsControls>>;
}

export interface IaFormControls {
  jobDescription: FormControl<string | null>;
  exaggeration: FormControl<number | null>;
}
