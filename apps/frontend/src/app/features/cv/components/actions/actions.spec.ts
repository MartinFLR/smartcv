import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Actions } from './actions';
import { ActionsService } from './actions-service/actions.service';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { provideAnimations } from '@angular/platform-browser/animations';
import { signal } from '@angular/core';
import { MOCK_CV_PROFILE } from '../../../../shared/testing/mocks/cv.form.mock';
describe('Actions Component', () => {
  let component: Actions;
  let fixture: ComponentFixture<Actions>;
  const actionsServiceMock = {
    selectedProfile: signal(null),
    profiles: signal([MOCK_CV_PROFILE]),
    isLoading: signal(false),
    isCvValid: signal(true),
    isCvLocked: signal(false),
    selectProfile: jest.fn(),
    saveCv: jest.fn(),
    downloadPdf: jest.fn(),
    createNewProfile: jest.fn(),
    reloadProfile: jest.fn(),
    clearForm: jest.fn(),
    toggleLock: jest.fn(),
    editProfileName: jest.fn(),
    deleteProfile: jest.fn(),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Actions,
        TranslocoTestingModule.forRoot({
          langs: { en: {}, es: {} },
          translocoConfig: { availableLangs: ['en', 'es'], defaultLang: 'es' },
        }),
      ],
      providers: [provideAnimations(), { provide: ActionsService, useValue: actionsServiceMock }],
    }).compileComponents();
    fixture = TestBed.createComponent(Actions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
