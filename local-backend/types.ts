// shared/types/cv.types.ts

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
export interface CvPayload {
  baseCv: CvFormShape;
  jobDesc: string;
}


export interface TailoredCvResponse {
  profileSummary: string;
  experience: {
    role: string;
    company: string;
    bullets: string[];
  }[];
  education: {
    bullets: string | null;
  };
  skills: string[];
}
