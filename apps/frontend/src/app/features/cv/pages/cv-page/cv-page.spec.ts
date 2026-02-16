import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TUI_DARK_MODE } from '@taiga-ui/core';
import { TuiSwipeEvent } from '@taiga-ui/cdk';
import { tuiInputPhoneInternationalOptionsProvider } from '@taiga-ui/kit';
import { of, throwError } from 'rxjs';
import { signal } from '@angular/core';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CvStateService } from '../../services/cv-form/cv-form-state/cv-state.service';
import { IaApiService } from '../../components/ia-section/api/ia-api.service';
import { ActionsService } from '../../components/actions/actions-service/actions.service';
import { CvFormDataService } from '../../services/cv-form/cv-form-data/cv-form-data.service';
import { SkillsService } from '../../components/skills-section/skills-service/skills.service';
import { CvPage } from './cv-page';
import {
  mockCvForm,
  mockSkillsArray,
  stateServiceMock,
} from '../../../../shared/testing/mocks/state-service.mock';
import { TuiLanguageSwitcherService } from '@taiga-ui/i18n/utils';
import { languageSwitcherMock } from '../../../../shared/testing/mocks/language.mock';
import { WA_LOCAL_STORAGE, WA_WINDOW, WA_NAVIGATOR } from '@ng-web-apis/common';
import { windowMock } from '../../../../shared/testing/mocks/windows.mock';
import { TUI_DOC_ICONS } from '@taiga-ui/addon-doc/tokens';

describe('CvPage', () => {
  let component: CvPage;
  let fixture: ComponentFixture<CvPage>;

  const httpClientMock = {
    get: jest.fn().mockReturnValue(throwError(() => new Error('Network error'))),
    post: jest.fn().mockReturnValue(of({})),
    put: jest.fn().mockReturnValue(of({})),
    delete: jest.fn().mockReturnValue(of({})),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [
        CvPage,
        ReactiveFormsModule,
        TranslocoTestingModule.forRoot({
          langs: { en: {}, es: {} },
          translocoConfig: { availableLangs: ['en', 'es'], defaultLang: 'es' },
        }),
      ],
      providers: [
        provideNoopAnimations(),
        provideHttpClientTesting(),
        { provide: CvStateService, useValue: stateServiceMock },
        { provide: TUI_DARK_MODE, useValue: of(false) },
        { provide: WA_WINDOW, useValue: windowMock },
        { provide: WA_LOCAL_STORAGE, useValue: windowMock.localStorage },
        { provide: WA_NAVIGATOR, useValue: { userAgent: 'test-agent' } },
        { provide: DOCUMENT, useValue: windowMock.document },
        { provide: HttpClient, useValue: httpClientMock },
        { provide: TuiLanguageSwitcherService, useValue: languageSwitcherMock },
        { provide: TUI_DOC_ICONS, useValue: {} },
        { provide: IaApiService, useValue: {} },
        {
          provide: ActionsService,
          useValue: { selectedProfile: signal(null), isLoading: signal(false) },
        },
        { provide: CvFormDataService, useValue: {} },
        {
          provide: SkillsService,
          useValue: {
            formArray: jest.fn(() => mockSkillsArray),
            getCertificationsControls: jest.fn(() => []),
          },
        },
        tuiInputPhoneInternationalOptionsProvider({
          metadata: import('libphonenumber-js/min/metadata').then((m) => m.default),
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CvPage);
    component = fixture.componentInstance;
    if (mockCvForm) {
      mockCvForm.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }

    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  describe('Navegación de Pestañas (Tabs Logic)', () => {
    it('debe iniciar en la pestaña 0', () => {
      // Accedemos a la signal interna del COMPONENTE
      expect((component as any).activeTab()).toBe(0);
    });

    it('debe avanzar pestaña con swipe LEFT', () => {
      const swipeEvent: TuiSwipeEvent = { direction: 'left', target: null } as any;
      (component as any).onFormSwipe(swipeEvent);

      expect((component as any).activeTab()).toBe(1);
    });

    it('debe retroceder pestaña con swipe RIGHT', () => {
      // Configuramos el estado en el COMPONENTE, no en el servicio
      (component as any).activeTab.set(1);

      const swipeEvent: TuiSwipeEvent = { direction: 'right', target: null } as any;
      (component as any).onFormSwipe(swipeEvent);

      expect((component as any).activeTab()).toBe(0);
    });
  });

  describe('Vista Móvil', () => {
    it('debe iniciar en vista Formulario (0)', () => {
      expect((component as any).mobileView()).toBe(0);
    });

    it('debe cambiar a Preview (1) con swipe LEFT', () => {
      (component as any).mobileView.set(0);
      const swipeEvent: TuiSwipeEvent = { direction: 'left', target: null } as any;
      (component as any).onViewSwipe(swipeEvent);

      expect((component as any).mobileView()).toBe(1);
    });
  });

  describe('Renderizado del Template', () => {
    it('debe mostrar el dummy-view', () => {
      const dummyView = fixture.debugElement.query(By.css('app-dummy-view'));
      expect(dummyView).toBeTruthy();
    });

    it('debe mostrar la sección correcta según activeTab', () => {
      // Reset manual al inicio del test por si acaso
      (component as any).activeTab.set(0);
      fixture.detectChanges();

      // 1. Tab 0 -> Personal
      let personalSection = fixture.debugElement.query(By.css('app-personal-section'));
      expect(personalSection).toBeTruthy();

      // 2. Cambio a Tab 1 -> Education
      (component as any).activeTab.set(1);
      fixture.detectChanges();

      let educationSection = fixture.debugElement.query(By.css('app-education-section'));
      expect(educationSection).toBeTruthy();
    });
  });
});
