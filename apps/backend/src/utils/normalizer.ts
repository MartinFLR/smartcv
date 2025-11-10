import { CvResponse } from '@smartcv/shared';

export function normalizeCv(cv: CvResponse): CvResponse {
  return {
    ...cv,
    experience: (cv.experience ?? []).map((e) => ({
      role: e.role ?? null,
      company: e.company ?? null,
      bullets: Array.isArray(e.bullets) ? e.bullets : [],
      dateIn: e.dateIn ?? null,
      dateFin: e.dateFin ?? null,
    })),
    education: (cv.education ?? []).map((e) => ({
      title: e.title ?? null,
      institution: e.institution ?? '',
      bullets: Array.isArray(e.bullets) ? e.bullets : [],
      dateIn: e.dateIn ?? null,
      dateFin: e.dateFin ?? null,
    })),
    projects: (cv.projects ?? []).map((p) => ({
      name: p.name,
      subtitle: p.subtitle,
      bullets: Array.isArray(p.bullets) ? p.bullets : [],
      dateIn: p.dateIn ?? null,
      dateFin: p.dateFin ?? null,
    })),
  };
}
