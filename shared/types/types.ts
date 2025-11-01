import { FormArray, FormControl, FormGroup } from '@angular/forms';

// RESPUESTA DEL BACKEND

export interface TailoredCvResponse {
  profileSummary: string;
  job: string;
  experience: {
    role: string;
    company: string;
    dateIn?: string | null;
    dateFin?: string | null;
    bullets: string[];
  }[];
  projects: {
    name: string;
    subtitle: string | null;
    dateIn?: string | null;
    dateFin?: string | null;
    bullets: string[];
  }[];
  education: {
    title: string | null;
    institution: string;
    dateIn?: string | null;
    dateFin?: string | null;
    bullets: string[];
  }[];
  skills: {
    skills: string[];
    languages: string[];
    certifications: {
      name: string;
      date: string;
    }[];
    additional: string[];
  }[];
}

// TRANSFORMED TYPES (para el form)
export type TransformedExperience = {
  role: string | null;
  company: string | null;
  bullets: string | null;
  dateIn?: string | null;
  dateFin?: string | null;
};

export type TransformedEducation = {
  title: string | null;
  institution: string | null;
  bullets: string | null;
  dateIn?: string | null;
  dateFin?: string | null;
};

export type TransformedProject = {
  name: string | null;
  subtitle: string | null;
  bullets: string | null;
  dateIn?: string | null;
  dateFin?: string | null;
};

export interface TransformedCvResponse
  extends Omit<TailoredCvResponse, 'experience' | 'education'> {
  experience: TransformedExperience[];
  education: TransformedEducation[];
  project: TransformedProject[];
}

// FORM CONTROLS
export interface PersonalInfoControls {
  name: FormControl<string | null>;
  job: FormControl<string | null>;
  email: FormControl<string | null>;
  location: FormControl<string | null>;
  phone: FormControl<string | null>;
  linkedin: FormControl<string | null>;
  web: FormControl<string | null>;
  github: FormControl<string | null>
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
  makeEnglish: FormControl<boolean | null>;
}

// ESTRUCTURA DEL CV
export interface CvFormShape {
  personalInfo: {
    name: string | null;
    job: string | null;
    email: string | null;
    phone: string | null;
    location: string | null;
    linkedin: string | null;
    github: string | null;
    web: string | null;
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
  projects: {
    name: string;
    dateIn: string | null;
    dateFin: string | null;
    bullets: string | null;
    subtitle: string | null;
  }[];
  skills: {
    skills: string[];
    languages: string[];
    certifications: {
      name: string | null; // Se asume que estos también pueden ser null después de getRawValue()
      date: string | null;
    }[];
    additional: string[];
  }[];
}


// ======================================================
// PAYLOADS
// ======================================================

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

export interface ModelConfig {
  model: string;
}

