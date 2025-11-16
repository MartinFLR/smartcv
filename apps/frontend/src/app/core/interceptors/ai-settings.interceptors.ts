import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AiSettingsService } from '../services/ai-settings/ai-settings.service';

export const aiSettingsInterceptor: HttpInterceptorFn = (req, next) => {
  const aiSettingsService = inject(AiSettingsService);
  const settings = aiSettingsService.loadSettings();

  if (settings && settings.modelProvider && settings.modelVersion) {
    const newReq = req.clone({
      headers: req.headers
        .set('X-Ai-Provider', settings.modelProvider)
        .set('X-Ai-Model', settings.modelVersion),
    });

    console.log('✅ Interceptor: Headers agregados', newReq.headers);

    return next(newReq);
  }
  console.warn('⚠️ Interceptor: No se encontraron settings. Request original.');
  return next(req);
};
