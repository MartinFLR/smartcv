import {BuildPromptOptions} from './PromptTypes';

export interface CvResponse {
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

export interface CvForm {
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
      name: string | null;
      date: string | null;
    }[];
    additional: string[];
  }[];
}

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
  extends Omit<CvResponse, 'experience' | 'education'> {
  experience: TransformedExperience[];
  education: TransformedEducation[];
  project: TransformedProject[];
}

export interface TransformedCoverLetterResponse {
  result: string;
}

// PAYLOADS
export interface CvPayload {
  baseCv: CvForm;
  jobDesc: string;
  modelProvider?: string;
  modelVersion?: string;
  promptOption?: BuildPromptOptions
}


export interface CoverLetterPayload {
  baseCv: CvForm;
  jobDesc: string;
  modelProvider?: string;
  modelVersion?: string;
  promptOption?: BuildPromptOptions;
}

export interface CvProfile {
  id: string;
  name: string;
  jobTitle: string;
  data: CvForm;
}

