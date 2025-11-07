import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {CvAtsPayload, CvAtsResponse} from '../../../../../../../shared/types/AtsTypes';
import {finalize, Observable, tap, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AtsSectionService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/ats';

  private readonly _response = signal<CvAtsResponse | null>(null);
  private readonly _isLoading = signal<boolean>(false);

  public readonly response = this._response.asReadonly();
  public readonly isLoading = this._isLoading.asReadonly();

  getAtsScore(payload: FormData): Observable<CvAtsResponse> {
    this._isLoading.set(true);
    this._response.set(null);

    return this.http.post<CvAtsResponse>(this.apiUrl, payload).pipe(
      tap({
        next: (res: CvAtsResponse) => {
          this._response.set(res);
        }
      }),
      catchError((err: HttpErrorResponse) => {
        return this.handleError(err);
      }),
      finalize(() => {
        this._isLoading.set(false);
      })
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this._response.set(null);

    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error del servidor (código ${error.status}): ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error
      ('Falló la conexión con el servicio de ATS. Por favor, intentá más tarde.')
    );
  }
}
