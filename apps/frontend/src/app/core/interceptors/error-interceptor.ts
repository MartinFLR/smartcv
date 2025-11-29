import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { TaigaAlertsService } from '../services/alerts/taiga-alerts.service';
import { inject } from '@angular/core';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notify = inject(TaigaAlertsService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        notify.showError('errors.network', undefined, 'errors.titles.connectivity');
      } else {
        const serverCode = error.error?.code;
        const params = error.error?.params;

        const messageKey = serverCode ? `api_errors.${serverCode}` : 'api_errors.fallback';

        notify.showError(messageKey, params);
      }

      return throwError(() => error);
    }),
  );
};
