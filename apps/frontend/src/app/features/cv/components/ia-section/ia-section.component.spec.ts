import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { IaSection } from './ia-section.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { jest } from '@jest/globals';
import { By } from '@angular/platform-browser';
import { IaFormControls } from '../../../../core/models/controls.model';

describe('IaSection Component', () => {
  let component: IaSection;
  let fixture: ComponentFixture<IaSection>;
  let mockIaForm: FormGroup<IaFormControls>;

  beforeEach(async () => {
    mockIaForm = new FormGroup<IaFormControls>({
      jobDescription: new FormControl(''),
      exaggeration: new FormControl(0),
      makeEnglish: new FormControl(false),
    });

    await TestBed.configureTestingModule({
      imports: [
        IaSection,
        ReactiveFormsModule,
        TranslocoTestingModule.forRoot({
          langs: { en: {}, es: {} },
          translocoConfig: { availableLangs: ['en', 'es'], defaultLang: 'es' },
        }),
      ],
      providers: [
        provideAnimations(), // Necesario para componentes Taiga UI
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IaSection);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('iaForm', mockIaForm);
    fixture.componentRef.setInput('isLoading', false);

    jest.spyOn(component.optimize, 'emit');

    fixture.detectChanges(); // Dispara ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should initialize currentExaggeration signal with form value', () => {
      expect(component['currentExaggeration']()).toBe(0);
    });
  });

  describe('Reactivity', () => {
    it('should update currentExaggeration signal when form control changes', fakeAsync(() => {
      mockIaForm.controls.exaggeration.setValue(2);
      fixture.detectChanges();
      tick();

      expect(component['currentExaggeration']()).toBe(2);
    }));
  });

  describe('Interactions', () => {
    it('should update form value when clicking an exaggeration level button', () => {
      const levelButtons = fixture.debugElement.queryAll(By.css('button.cursor-pointer'));

      levelButtons[1].nativeElement.click();
      fixture.detectChanges();

      expect(mockIaForm.controls.exaggeration.value).toBe(1);
    });

    it('should emit optimize event when optimize button is clicked', () => {
      const optimizeBtn = fixture.debugElement.query(By.css('button[appearance="primary"]'));

      optimizeBtn.nativeElement.click();

      expect(component.optimize.emit).toHaveBeenCalled();
    });

    it('should disable optimize button if form is invalid', () => {
      mockIaForm.setErrors({ invalid: true });
      fixture.detectChanges();

      const optimizeBtn = fixture.debugElement.query(By.css('button[appearance="primary"]'));

      expect(optimizeBtn.nativeElement.disabled).toBe(true);
    });

    it('should show loading state on button when isLoading is true', () => {
      fixture.componentRef.setInput('isLoading', true);
      fixture.detectChanges();

      const optimizeBtn = fixture.debugElement.query(By.css('button[appearance="primary"]'));

      expect(component.isLoading()).toBe(true);
    });
  });
});
