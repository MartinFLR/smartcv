import { inject, Injectable } from '@angular/core';
import { TUI_ENGLISH_LANGUAGE, TUI_SPANISH_LANGUAGE, TuiLanguage } from '@taiga-ui/i18n';
import { BehaviorSubject, Observable } from 'rxjs';

export const APP_LANGUAGES = {
  es: TUI_SPANISH_LANGUAGE,
  en: TUI_ENGLISH_LANGUAGE,
};

const language$ = new BehaviorSubject<TuiLanguage>(APP_LANGUAGES.es);

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public get taigaLanguage$(): Observable<TuiLanguage> {
    return language$.asObservable();
  }

  public setTaigaLanguage(lang: 'es' | 'en'): void {
    language$.next(APP_LANGUAGES[lang] || APP_LANGUAGES.es);
  }
}

export function provideTaigaLanguage(): Observable<TuiLanguage> {
  return inject(LanguageService).taigaLanguage$;
}
