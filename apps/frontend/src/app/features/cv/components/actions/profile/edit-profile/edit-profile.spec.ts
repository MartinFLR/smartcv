import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EditProfile } from './edit-profile';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { jest } from '@jest/globals';
import { By } from '@angular/platform-browser';

describe('EditProfile', () => {
  let component: EditProfile;
  let fixture: ComponentFixture<EditProfile>;

  const contextMock = {
    data: 'Nombre Original',
    completeWith: jest.fn(),
    $implicit: { complete: jest.fn() },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditProfile,
        TranslocoTestingModule.forRoot({
          langs: { en: {}, es: {} },
          translocoConfig: { availableLangs: ['en', 'es'], defaultLang: 'es' },
        }),
      ],
      providers: [provideAnimations(), { provide: POLYMORPHEUS_CONTEXT, useValue: contextMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(EditProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize value with context data', () => {
    expect(component['value']).toBe('Nombre Original');
  });
});
