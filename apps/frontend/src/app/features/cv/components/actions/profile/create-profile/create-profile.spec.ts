import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateProfile } from './create-profile';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { provideAnimations } from '@angular/platform-browser/animations';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { jest } from '@jest/globals';

describe('CreateProfile', () => {
  let component: CreateProfile;
  let fixture: ComponentFixture<CreateProfile>;

  const contextMock = {
    data: 'Nombre Original',
    completeWith: jest.fn(),
    $implicit: { complete: jest.fn() },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreateProfile,
        TranslocoTestingModule.forRoot({
          langs: { en: {}, es: {} },
          translocoConfig: { availableLangs: ['en', 'es'], defaultLang: 'es' },
        }),
      ],
      providers: [provideAnimations(), { provide: POLYMORPHEUS_CONTEXT, useValue: contextMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
