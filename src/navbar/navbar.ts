import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
} from '@angular/core';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TuiAppBar } from '@taiga-ui/layout';
import { TuiBadgedContent, TuiTabs } from '@taiga-ui/kit';
import { tuiScrollbarOptionsProvider } from '@taiga-ui/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { TUI_DOC_ICONS } from '@taiga-ui/addon-doc/tokens';
import { TuiLanguageSwitcherService } from '@taiga-ui/i18n/utils';
import {
  type TuiCountryIsoCode,
  type TuiLanguageName,
} from '@taiga-ui/i18n/types';

/* TODO: Agregar funcionalidad con Transloco
import { TuiBadge, TuiButtonSelect } from '@taiga-ui/kit';
import {TuiButton, TuiDataList, TuiFlagPipe, TuiTextfield} from '@taiga-ui/core';
*/

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
    NgClass,
    RouterLink,
    TuiAppBar,
    TuiTabs,
    RouterLinkActive,
    ReactiveFormsModule,
    NgOptimizedImage,
    TuiBadgedContent,
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
  providers: [tuiScrollbarOptionsProvider({ mode: 'hover' })],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  readonly menuOpen = signal(false);
  readonly isScrolled = signal(false);

  protected readonly switcher = inject(TuiLanguageSwitcherService);
  protected readonly icons = inject(TUI_DOC_ICONS);

  public readonly flags = new Map<TuiLanguageName, TuiCountryIsoCode>([
    ['spanish', 'ES'],
    ['english', 'GB'],
  ]);
  public readonly names: TuiLanguageName[] = Array.from(this.flags.keys());

  protected readonly languageControl = new FormControl<string>(
    capitalize(this.switcher.language),
  );

  constructor() {
    if (!this.switcher.language) {
      this.setLang('spanish');
    }
  }

  public setLang(lang: TuiLanguageName): void {
    this.languageControl.setValue(lang, { emitEvent: false });
    this.switcher.setLanguage(lang);
  }
}
