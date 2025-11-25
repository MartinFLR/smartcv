import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EducationSection } from './education-section';
import { EducationService } from './education-service/education.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { By } from '@angular/platform-browser';
import { signal } from '@angular/core';
import { jest } from '@jest/globals';

describe('EducationSection', () => {
  let component: EducationSection;
  let fixture: ComponentFixture<EducationSection>;
  let educationServiceMock: any;
  let formArray: FormArray;

  beforeEach(async () => {
    formArray = new FormArray<any>([]);

    educationServiceMock = {
      formArray: signal(formArray),
      add: jest.fn(),
      remove: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [
        EducationSection,
        ReactiveFormsModule,
        TranslocoTestingModule.forRoot({
          langs: { en: {}, es: {} },
          translocoConfig: { availableLangs: ['en', 'es'], defaultLang: 'es' },
        }),
      ],
      providers: [
        provideAnimations(),
        { provide: EducationService, useValue: educationServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EducationSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render 0 items when form array is empty', () => {
      const items = fixture.debugElement.queryAll(By.css('[tuiCardLarge]'));
      expect(items.length).toBe(0);
    });

    it('should render correct number of items when form array has data', () => {
      // Arrange
      formArray.push(
        new FormGroup({
          institution: new FormControl('UBA'),
          title: new FormControl('Ingeniero'),
          dateIn: new FormControl(''),
          dateFin: new FormControl(''),
          bullets: new FormControl(''),
        }),
      );
      formArray.push(
        new FormGroup({
          institution: new FormControl('UTN'),
          title: new FormControl('Tecnico'),
          dateIn: new FormControl(''),
          dateFin: new FormControl(''),
          bullets: new FormControl(''),
        }),
      );

      // Trigger change detection
      fixture.detectChanges();

      // Assert
      const items = fixture.debugElement.queryAll(By.css('[tuiCardLarge]'));
      expect(items.length).toBe(2);
    });
  });

  describe('Interactions', () => {
    it('should call service.add() when Add button is clicked', () => {
      const buttons = fixture.debugElement.queryAll(By.css('button[iconStart="@tui.plus"]'));
      const addButton = buttons[0];

      addButton.nativeElement.click();

      expect(educationServiceMock.add).toHaveBeenCalled();
    });

    it('should call service.remove(index) when Remove button is clicked', () => {
      // Arrange
      formArray.push(
        new FormGroup({
          institution: new FormControl('UBA'),
          title: new FormControl('Ingeniero'),
          dateIn: new FormControl(''),
          dateFin: new FormControl(''),
          bullets: new FormControl(''),
        }),
      );
      fixture.detectChanges();

      const removeButtons = fixture.debugElement.queryAll(By.css('button[iconStart="@tui.trash"]'));
      const removeButton = removeButtons[0];

      // Act
      removeButton.nativeElement.click();

      // Assert
      expect(educationServiceMock.remove).toHaveBeenCalledWith(0);
    });
  });
});
