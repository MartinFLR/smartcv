import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CvPayload, CvResponse, TransformedCvResponse } from '../../../../../libs/types/src/Types';

@Injectable({
  providedIn: 'root',
})
export class IaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/generate-cv';

  generateCvWithIA(payload: CvPayload): Observable<TransformedCvResponse> {
    return this.http.post<CvResponse>(this.apiUrl, payload).pipe(
      map((response) => {
        const experience = Array.isArray(response.experience) ? response.experience : [];
        const education = Array.isArray(response.education) ? response.education : [];
        const project = Array.isArray(response.projects) ? response.projects : [];

        return {
          ...response,
          experience: experience.map((e) => ({
            role: e.role ?? null,
            company: e.company ?? null,
            bullets: Array.isArray(e.bullets) ? e.bullets.join('\n') : '',
            dateIn: e.dateIn ?? null,
            dateFin: e.dateFin ?? null,
          })),
          education: education.map((e) => ({
            title: e.title ?? null,
            institution: e.institution ?? null,
            bullets: Array.isArray(e.bullets) ? e.bullets.join('\n') : '',
            dateIn: e.dateIn ?? null,
            dateFin: e.dateFin ?? null,
          })),
          project: project.map((p) => ({
            name: p.name,
            subtitle: p.subtitle,
            bullets: Array.isArray(p.bullets) ? p.bullets.join('\n') : '',
            dateIn: p.dateIn ?? null,
            dateFin: p.dateFin ?? null,
          })),
        } as TransformedCvResponse;
      }),
    );
  }
}
