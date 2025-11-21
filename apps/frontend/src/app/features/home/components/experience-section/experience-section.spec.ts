import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperienceSection } from './experience-section';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { By } from '@angular/platform-browser';
import { jest } from '@jest/globals';
import { ExperienceControls } from '../../../../core/models/controls.model';

describe('ExperienceSection', () => {
  let component: ExperienceSection;
  let fixture: ComponentFixture<ExperienceSection>;

  const createExperienceGroup = (data?: Partial<{ role: string; company: string }>) => {
    return new FormGroup<ExperienceControls>({
      role: new FormControl(data?.role ?? ''),
      company: new FormControl(data?.company ?? ''),
      dateIn: new FormControl(''),
      dateFin: new FormControl(''),
      bullets: new FormControl(''),
    });
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ExperienceSection,
        ReactiveFormsModule,
        TranslocoTestingModule.forRoot({
          langs: { en: {}, es: {} },
          translocoConfig: { availableLangs: ['en', 'es'], defaultLang: 'es' },
        }),
      ],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceSection);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('experienceForms', new FormArray([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Rendering', () => {
    it('should render 0 items when form array is empty', () => {
      const cards = fixture.debugElement.queryAll(By.css('[tuiCardLarge]'));
      expect(cards.length).toBe(0);
    });

    it('should render correct number of items when form array has data', () => {
      // Arrange
      const experienceArray = new FormArray([
        createExperienceGroup({ role: 'Frontend Dev', company: 'Google' }),
        createExperienceGroup({ role: 'Backend Dev', company: 'Amazon' }),
      ]);

      // Act
      fixture.componentRef.setInput('experienceForms', experienceArray);
      fixture.detectChanges();

      // Assert
      const cards = fixture.debugElement.queryAll(By.css('[tuiCardLarge]'));
      expect(cards.length).toBe(2);

      const companyInputs = fixture.debugElement.queryAll(
        By.css('input[formControlName="company"]'),
      );
      expect(companyInputs[0].nativeElement.value).toContain('Google');
      expect(companyInputs[1].nativeElement.value).toContain('Amazon');
    });
  });

  describe('Interactions (Outputs)', () => {
    it('should emit "add" event when Add button is clicked', () => {
      // Arrange
      const emitSpy = jest.spyOn(component.add, 'emit');

      const addButton = fixture.debugElement.query(By.css('button[iconStart="@tui.plus"]'));

      addButton.nativeElement.click();

      expect(emitSpy).toHaveBeenCalled();
    });

    it('should emit "remove" event with correct index when Delete button is clicked', () => {
      const experienceArray = new FormArray([
        createExperienceGroup({ role: 'Dev 1' }),
        createExperienceGroup({ role: 'Dev 2' }),
      ]);
      fixture.componentRef.setInput('experienceForms', experienceArray);
      fixture.detectChanges();

      const emitSpy = jest.spyOn(component.remove, 'emit');

      const removeButtons = fixture.debugElement.queryAll(By.css('button[iconStart="@tui.trash"]'));

      removeButtons[1].nativeElement.click();

      expect(emitSpy).toHaveBeenCalledWith(1);
    });
  });
});
