import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CvPage } from './cv-page';
import { HomeStateService } from './services/cv-state-analysis/cv-state.analysis';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { homeStateServiceMock } from '../../../../shared/testing/mocks/home-state-service.mock';
import { tuiInputPhoneInternationalOptionsProvider } from '@taiga-ui/kit';
import { defer } from 'rxjs';
// Importaciones necesarias para solucionar el error de "Unknown country"

describe('CvPage', () => {
  let component: CvPage;
  let fixture: ComponentFixture<CvPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CvPage,
        TranslocoTestingModule.forRoot({
          langs: { en: {}, es: {} },
          translocoConfig: { availableLangs: ['en', 'es'], defaultLang: 'en' },
        }),
      ],
      providers: [
        provideAnimations(),
        { provide: HomeStateService, useValue: homeStateServiceMock },

        tuiInputPhoneInternationalOptionsProvider({
          metadata: import('libphonenumber-js/max/metadata').then((m) => m.default as any),
          separator: '-',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change tab when swiping right', () => {
    homeStateServiceMock.activeTab.set(1);
    const swipeEvent = { direction: 'right' } as any;
    component.onFormSwipe(swipeEvent);
    expect(homeStateServiceMock.activeTab()).toBe(0);
  });
});
