import { provideEventPlugins } from "@taiga-ui/event-plugins";
import { provideAnimations } from "@angular/platform-browser/animations";
import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {TUI_LANGUAGE,TUI_DEFAULT_LANGUAGE, TUI_SPANISH_LANGUAGE} from '@taiga-ui/i18n';
import {TuiLanguage} from '@taiga-ui/i18n/types';
import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {of} from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    {
      provide: TUI_DEFAULT_LANGUAGE,
      useValue: of(TUI_SPANISH_LANGUAGE),
    },
    {
      provide: TUI_LANGUAGE,
      useValue: of(TUI_SPANISH_LANGUAGE as TuiLanguage),
    },
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
        provideEventPlugins(),
        provideEventPlugins()
    ],
};
