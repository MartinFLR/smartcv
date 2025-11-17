import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TuiAppBar, TuiCell, TuiHeader } from '@taiga-ui/layout';
import {
  TuiBadgedContent,
  TuiButtonClose,
  TuiDrawer,
  TuiLike,
  tuiLikeOptionsProvider,
  TuiTabs,
} from '@taiga-ui/kit';
import { TuiButton, TuiPopup, tuiScrollbarOptionsProvider, TuiTitle } from '@taiga-ui/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TUI_DOC_ICONS } from '@taiga-ui/addon-doc/tokens';
import { TuiLanguageSwitcherService } from '@taiga-ui/i18n/utils';
import { type TuiCountryIsoCode, type TuiLanguageName } from '@taiga-ui/i18n/types';
import { WA_LOCAL_STORAGE, WA_WINDOW } from '@ng-web-apis/common';
import { TUI_DARK_MODE, TUI_DARK_MODE_KEY } from '@taiga-ui/core';
import { TranslocoDirective } from '@jsverse/transloco';

/* TODO: Agregar funcionalidad con Transloco
import { TuiBadge, TuiButtonSelect } from '@taiga-ui/kit';
import {TuiButton, TuiDataList, TuiFlagPipe, TuiTextfield} from '@taiga-ui/core';
*/

// Función capitalize (sin cambios)
function capitalize(value: string): string {
  if (typeof value !== 'string' || value.length === 0) {
    return value;
  }
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    TuiAppBar,
    TuiTabs,
    RouterLinkActive,
    ReactiveFormsModule,
    NgOptimizedImage,
    TuiBadgedContent,
    TuiLike,
    TuiCell,
    TuiButton,
    TuiDrawer, // Agregado
    TuiHeader, // Agregado
    TuiTitle, // Agregado
    TuiButtonClose,
    TuiPopup,
    TranslocoDirective,
    // Agregado
    /* TODO: Agregar funcionalidad con Transloco
    TuiButton,
    TuiBadge,
    TuiDataList,
    TitleCasePipe,
    TuiButtonSelect,
    TuiFlagPipe,
    TuiTextfield,
     */
  ],
  providers: [
    tuiScrollbarOptionsProvider({ mode: 'hover' }),
    tuiLikeOptionsProvider({
      icons: {
        unchecked: '@tui.moon',
        checked: '@tui.sun',
      },
    }),
  ],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  readonly menuOpen = signal(false);
  private readonly key = inject(TUI_DARK_MODE_KEY);
  private readonly storage = inject(WA_LOCAL_STORAGE);
  private readonly media = inject(WA_WINDOW).matchMedia('(prefers-color-scheme: dark)');

  protected readonly darkMode = inject(TUI_DARK_MODE);

  protected readonly switcher = inject(TuiLanguageSwitcherService);
  protected readonly icons = inject(TUI_DOC_ICONS);

  public readonly flags = new Map<TuiLanguageName, TuiCountryIsoCode>([
    ['spanish', 'ES'],
    ['english', 'GB'],
  ]);
  public readonly names: TuiLanguageName[] = Array.from(this.flags.keys());

  protected readonly languageControl = new FormControl<string>(capitalize(this.switcher.language));

  constructor() {
    if (!this.switcher.language) {
      this.setLang('spanish');
    }
    // NOTA: Aquí iría la lógica para 'isScrolled'
    // (por ejemplo, escuchando el evento scroll de WA_WINDOW)
  }

  public setLang(lang: TuiLanguageName): void {
    this.languageControl.setValue(lang, { emitEvent: false });
    this.switcher.setLanguage(lang);
  }
}
