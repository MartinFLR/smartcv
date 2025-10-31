import {FormArray, FormControl, FormGroup} from '@angular/forms';

export interface TailoredCvResponse {
  profileSummary: string;
  experience: {
    role: string;
    company: string;
    bullets: string[];
  }[];
  education: {
    bullets: string | null;
  }
  skills: string[];
}
export type ExperienceValue = CvFormShape['experience'][number];
export type EducationValue = CvFormShape['education'][number];

export type TransformedExperience = Omit<TailoredCvResponse['experience'][0], 'bullets'> & {
  role: string;
  company: string;
  bullets: string;
};

export interface TransformedCvResponse extends Omit<TailoredCvResponse, 'experience'> {
  experience: TransformedExperience[];
}

export interface CvPayload {
  baseCv: CvFormShape;
  jobDesc: string;
}

export interface PersonalInfoControls {
  name: FormControl<string | null>;
  job: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  linkedin: FormControl<string | null>;
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
  dateIn: FormControl<string | null>;
  dateFin: FormControl<string | null>;
  bullets: FormControl<string | null>;
}

export interface CvFormControls {
  personalInfo: FormGroup<PersonalInfoControls>;
  education: FormArray<FormGroup<EducationControls>>;
  experience: FormArray<FormGroup<ExperienceControls>>;
  skills: FormControl<string[] | null>;
}

export interface iaFormControls {
  jobDescription: FormControl<string | null>;
  makeEnglish: FormControl<Boolean | null>;

}

export interface CvFormShape {
  personalInfo: {
    name: string | null;
    job: string | null;
    email: string | null;
    phone: string | null;
    linkedin: string | null;
    profileSummary: string | null;
  };
  education: {
    title: string | null;
    institution: string | null;
    dateIn: string | null;
    dateFin: string | null;
    bullets: string | null;
  }[];
  experience: {
    role: string | null;
    company: string | null;
    dateIn: string | null;
    dateFin: string | null;
    bullets: string | null;
  }[];
  skills: string[] | null;
}
export interface ModelConfig{
  model: string;

}

export interface CvPayload {
  baseCv: CvFormShape;
  jobDesc: string;
}

export interface CvProfile {
  id: string;
  name: string;
  jobTitle: string;
  data: CvFormShape;
}
