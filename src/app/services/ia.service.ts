import {inject, Injectable} from '@angular/core';
import {finalize, map, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CvPayload, TailoredCvResponse} from '../types/types';


type TransformedExperience = Omit<TailoredCvResponse['experience'][0], 'bullets'> & {
  bullets: string | null;
};

export interface TransformedCvResponse extends Omit<TailoredCvResponse, 'experience'> {
  experience: TransformedExperience[];
}

@Injectable({
  providedIn: 'root',
})
export class IaService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/api/generate-cv';


  generateCvWithIA(payload: CvPayload): Observable<TransformedCvResponse> {

    return this.http.post<TailoredCvResponse>(this.apiUrl, payload).pipe(
      map((response) => {

        const experienceWithBulletStrings = response.experience.map((exp) => ({
          ...exp,
          bullets: (exp.bullets || []).join('\n- '),
        }));
        return {
          ...response,
          experience: experienceWithBulletStrings,
        };
      })
    );
  }
}
