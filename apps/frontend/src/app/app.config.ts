import { provideEventPlugins } from '@taiga-ui/event-plugins';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ApplicationConfig, provideZonelessChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, RouteReuseStrategy } from '@angular/router';
import {
  TUI_LANGUAGE,
  TUI_DEFAULT_LANGUAGE,
  TUI_SPANISH_LANGUAGE,
  TUI_ENGLISH_LANGUAGE,
} from '@taiga-ui/i18n';
import { TuiLanguage } from '@taiga-ui/i18n/types';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BehaviorSubject, defer, Observable, of, switchMap } from 'rxjs';
import { tuiInputPhoneInternationalOptionsProvider } from '@taiga-ui/kit';
import { AI_MODELS_CONFIG } from './core/config/ai.models.config';
import { AI_MODELS_DATA } from '@smartcv/shared';
import { aiSettingsInterceptor } from './core/interceptors/ai-settings.interceptors';
import { CustomRouteReuseStrategy } from './core/strategy/custom-route-reuse.strategy';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco, TranslocoService } from '@jsverse/transloco';
import { errorInterceptor } from './core/interceptors/error-interceptor';

const APP_LANGUAGES = new Map<string, TuiLanguage>([
  ['es', TUI_SPANISH_LANGUAGE],
  ['en', TUI_ENGLISH_LANGUAGE],
]);

const taigaLanguage$ = new BehaviorSubject<TuiLanguage | null>(null);

export function tuiLanguageFactory(transloco: TranslocoService): Observable<TuiLanguage> {
  const defaultLang = APP_LANGUAGES.get(transloco.getActiveLang()) || TUI_SPANISH_LANGUAGE;
  taigaLanguage$.next(defaultLang);

  return transloco.langChanges$.pipe(
    switchMap((langCode: string) => {
      const taigaLang = APP_LANGUAGES.get(langCode) || TUI_SPANISH_LANGUAGE;
      taigaLanguage$.next(taigaLang);
      return taigaLanguage$.asObservable() as Observable<TuiLanguage>;
    }),
  );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZonelessChangeDetection(),
    provideEventPlugins(),
    provideRouter(routes),

    provideHttpClient(withInterceptors([aiSettingsInterceptor, errorInterceptor])),

    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },

    { provide: AI_MODELS_CONFIG, useValue: AI_MODELS_DATA },

    provideTransloco({
      config: {
        availableLangs: ['en', 'es'],
        defaultLang: 'es',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),

    {
      provide: TUI_DEFAULT_LANGUAGE,
      useValue: of(TUI_SPANISH_LANGUAGE),
    },
    {
      provide: TUI_LANGUAGE,
      useFactory: tuiLanguageFactory,
      deps: [TranslocoService],
    },

    tuiInputPhoneInternationalOptionsProvider({
      metadata: defer(async () => import('libphonenumber-js/max/metadata').then((m) => m.default)),
      separator: '-',
    }),
  ],
};
