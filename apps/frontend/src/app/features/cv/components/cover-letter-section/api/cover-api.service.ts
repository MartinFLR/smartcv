import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpRequest,
  HttpDownloadProgressEvent,
  HttpEvent,
} from '@angular/common/http';
import { CoverLetterPayload } from '@smartcv/types';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoverApiService {
  private readonly apiUrl = 'http://localhost:3000/api/generate-cover-letter';

  private readonly http = inject(HttpClient);

  generateCoverLetterStream(payload: CoverLetterPayload): Observable<string> {
    const req = new HttpRequest('POST', this.apiUrl, payload, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      reportProgress: true,
      responseType: 'text',
    });

    let processedTextLength = 0;

    return this.http.request<string>(req).pipe(
      filter(
        (event: HttpEvent<string>): event is HttpDownloadProgressEvent =>
          event.type === HttpEventType.DownloadProgress,
      ),

      map((event) => {
        const partialText = event.partialText;

        if (partialText) {
          const newChunk = partialText.substring(processedTextLength);
          processedTextLength = partialText.length;
          return newChunk;
        }
        return '';
      }),

      filter((chunk) => chunk.length > 0),

      catchError((err) => {
        console.error('Error en el stream de HttpClient:', err);
        return throwError(() => new Error('Error al generar la carta.'));
      }),
    );
  }
}
