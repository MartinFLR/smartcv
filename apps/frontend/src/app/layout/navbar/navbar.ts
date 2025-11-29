import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TuiAppBar, TuiCell, TuiHeader } from '@taiga-ui/layout';
import {
  TuiBadgedContent,
  TuiButtonClose,
  TuiButtonSelect,
  TuiDrawer,
  TuiLike,
  tuiLikeOptionsProvider,
  TuiTabs,
} from '@taiga-ui/kit';
import {
  TuiButton,
  TuiDataList,
  TuiFlagPipe,
  TuiPopup,
  tuiScrollbarOptionsProvider,
  TuiTextfield,
  TuiTitle,
} from '@taiga-ui/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TUI_DOC_ICONS } from '@taiga-ui/addon-doc/tokens';
import { TuiLanguageSwitcherService } from '@taiga-ui/i18n/utils';
import { type TuiCountryIsoCode, type TuiLanguageName } from '@taiga-ui/i18n/types';
import { WA_LOCAL_STORAGE, WA_WINDOW } from '@ng-web-apis/common';
import { TUI_DARK_MODE, TUI_DARK_MODE_KEY } from '@taiga-ui/core';
import { TranslocoDirective, TranslocoPipe, TranslocoService } from '@jsverse/transloco';

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
    TuiDrawer,
    TuiHeader,
    TuiTitle,
    TuiButtonClose,
    TuiPopup,
    TranslocoDirective,
    TuiDataList,
    TuiButtonSelect,
    TuiTextfield,
    TuiFlagPipe,
    TranslocoPipe,
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
  private readonly transloco = inject(TranslocoService);
  protected readonly icons = inject(TUI_DOC_ICONS);

  public readonly flags = new Map<TuiLanguageName, TuiCountryIsoCode>([
    ['spanish', 'AR'],
    ['english', 'GB'],
  ]);
  public readonly names: TuiLanguageName[] = Array.from(this.flags.keys());

  private readonly taigaToTranslocoMap = new Map<TuiLanguageName, string>([
    ['spanish', 'es'],
    ['english', 'en'],
  ]);

  private readonly translocoToTaigaMap = new Map<string, TuiLanguageName>([
    ['es', 'spanish'],
    ['en', 'english'],
  ]);

  protected readonly languageControl: FormControl<TuiLanguageName>;

  constructor() {
    const activeLang = this.transloco.getActiveLang();
    const taigaLang = this.translocoToTaigaMap.get(activeLang) || 'spanish';

    this.switcher.setLanguage(taigaLang);

    this.languageControl = new FormControl(taigaLang, { nonNullable: true });
  }

  public setLang(lang: TuiLanguageName): void {
    this.languageControl.setValue(lang, { emitEvent: false });

    this.switcher.setLanguage(lang);

    const translocoLang = this.taigaToTranslocoMap.get(lang);
    if (translocoLang) {
      this.transloco.setActiveLang(translocoLang);
    }
  }
}
