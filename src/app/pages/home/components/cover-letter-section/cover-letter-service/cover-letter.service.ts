import { inject, Injectable } from '@angular/core';
import {
  CoverLetterPayload,
} from '../../../../../../../shared/types/Types';
import { Observable, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CoverLetterService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/generate-cover-letter';

  generateCoverLetterStream(
    payload: CoverLetterPayload,
  ): Observable<string> {
    return new Observable((subscriber: Subscriber<string>) => {
      const controller = new AbortController();

      const fetchData = async () => {
        try {

          const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            signal: controller.signal,
          });

          if (!response.ok) {
            subscriber.error(
              new Error(`Error en la solicitud: ${response.statusText}`),
            );
            return;
          }

          if (!response.body) {
            subscriber.error(new Error('La respuesta no contiene body.'));
            return;
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder('utf-8');

          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              subscriber.complete();
              break;
            }
            const chunk = decoder.decode(value, { stream: true });
            subscriber.next(chunk);
          }
        } catch (err) {
          if (!controller.signal.aborted) {
            subscriber.error(err);
          }
        }
      };
      fetchData();

      return () => {
        controller.abort();
      };
    });
  }
}
