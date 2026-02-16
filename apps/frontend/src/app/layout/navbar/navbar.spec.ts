import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Navbar } from './navbar';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { TuiLanguageSwitcherService } from '@taiga-ui/i18n/utils';
import { WA_WINDOW, WA_LOCAL_STORAGE } from '@ng-web-apis/common';
import { TUI_DOC_ICONS } from '@taiga-ui/addon-doc/tokens';
import { windowMock } from '../../shared/testing/mocks/windows.mock';
import { languageSwitcherMock } from '../../shared/testing/mocks/language.mock';
describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Navbar,
        TranslocoTestingModule.forRoot({
          langs: { en: {}, es: {} },
          translocoConfig: { availableLangs: ['en', 'es'], defaultLang: 'es' },
        }),
      ],
      providers: [
        provideAnimations(),
        provideRouter([]),
        { provide: WA_WINDOW, useValue: windowMock },
        { provide: WA_LOCAL_STORAGE, useValue: windowMock.localStorage },
        { provide: TuiLanguageSwitcherService, useValue: languageSwitcherMock },
        { provide: TUI_DOC_ICONS, useValue: {} },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set language correctly to english', () => {
    const lang = 'english';
    component.setLang(lang);
    expect(component['languageControl'].value).toBe(lang);
    expect(languageSwitcherMock.setLanguage).toHaveBeenCalledWith(lang);
  });
});
