import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalSection } from './personal-section';
import { CvStateService } from '../../services/cv-form/cv-form-state/cv-state.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { By } from '@angular/platform-browser';
import { tuiInputPhoneInternationalOptionsProvider } from '@taiga-ui/kit';
import { signal } from '@angular/core';
describe('PersonalSection Component', () => {
  let component: PersonalSection;
  let fixture: ComponentFixture<PersonalSection>;
  let mockPersonalInfoForm: FormGroup;
  let cvStateServiceMock: any;
  beforeEach(async () => {
    mockPersonalInfoForm = new FormGroup({
      name: new FormControl(''),
      job: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      location: new FormControl(''),
      linkedin: new FormControl(''),
      github: new FormControl(''),
      web: new FormControl(''),
      profileSummary: new FormControl(''),
    });
    cvStateServiceMock = {
      personalInfoGroup: mockPersonalInfoForm,
      template: signal('harvard'),
    };
    await TestBed.configureTestingModule({
      imports: [
        PersonalSection,
        ReactiveFormsModule,
        TranslocoTestingModule.forRoot({
          langs: { en: {}, es: {} },
          translocoConfig: { availableLangs: ['en', 'es'], defaultLang: 'es' },
        }),
      ],
      providers: [
        provideAnimations(),
        { provide: CvStateService, useValue: cvStateServiceMock },
        tuiInputPhoneInternationalOptionsProvider({
          metadata: import('libphonenumber-js/min/metadata').then((m) => m.default),
        }),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(PersonalSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Form Binding', () => {
    it('should render all inputs', () => {
      const inputs = fixture.debugElement.queryAll(By.css('input'));
      const textareas = fixture.debugElement.queryAll(By.css('textarea'));
      // We expect 8 inputs (name, job, email, phone, location, linkedin, github, web)
      // and 1 textarea (profileSummary)
      // Note: TuiInputPhoneInternational might render multiple inputs or different structure,
      // but let's check for at least the standard ones.
      // Actually, let's verify by formControlName to be more robust.
      const formControlNames = [
        'name',
        'job',
        'email',
        'phone',
        'location',
        'linkedin',
        'github',
        'web',
        'profileSummary',
      ];
      formControlNames.forEach((controlName) => {
        const el = fixture.debugElement.query(By.css(`[formControlName="${controlName}"]`));
        expect(el).toBeTruthy();
      });
    });
    it('should bind input values to form control', async () => {
      const nameInputDe = fixture.debugElement.query(By.css('[formControlName="name"]'));
      const newValue = 'Martin Developer';
      const inputNative = nameInputDe.nativeElement;
      inputNative.value = newValue;
      inputNative.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(mockPersonalInfoForm.controls['name'].value).toBe(newValue);
    });
    it('should update input value when form control changes programmatically', async () => {
      const newJob = 'Senior Angular Dev';
      mockPersonalInfoForm.controls['job'].setValue(newJob);
      fixture.detectChanges();
      await fixture.whenStable();
      const jobInputDe = fixture.debugElement.query(By.css('[formControlName="job"]'));
      expect(jobInputDe.nativeElement.value).toBe(newJob);
    });
  });
  describe('Phone Input', () => {
    it('should render phone input', () => {
      const phoneInputDe = fixture.debugElement.query(By.css('[formControlName="phone"]'));
      expect(phoneInputDe).toBeTruthy();
    });
  });
});
