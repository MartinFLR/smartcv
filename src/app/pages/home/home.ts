import {Component, computed, inject, Signal, signal} from '@angular/core';
import {TuiAlertService, TuiButton, TuiIcon, TuiLoader, TuiTextfield} from '@taiga-ui/core';
import {
  TuiCheckbox,
  TuiFade,
  TuiInputChip,
  tuiInputPhoneInternationalOptionsProvider, TuiTabs, TuiTextarea
} from '@taiga-ui/kit';
// Faltaban estos imports para standalone: true
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {defer, finalize, map, startWith} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {TuiRipple} from '@taiga-ui/addon-mobile';
import {TuiInputPhoneInternational} from '@taiga-ui/experimental';
import {type TuiCountryIsoCode} from '@taiga-ui/i18n';
import {PdfService} from '../../services/pdf.service';
import { IaService, TransformedCvResponse} from '../../services/ia.service';
import {
  CvFormControls,
  CvFormShape, CvPayload,
  EducationControls, EducationValue,
  ExperienceControls, ExperienceValue, iaFormControls,
  PersonalInfoControls
} from '../../types/types';
import {JsonPipe} from '@angular/common';
import {SaveDataService} from '../../services/save-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TuiButton,
    TuiTextfield,
    TuiTextarea,
    FormsModule,
    TuiLoader,
    ReactiveFormsModule,
    TuiInputChip,
    TuiRipple,
    TuiIcon,
    TuiInputPhoneInternational,
    TuiTabs,
    TuiFade,
    JsonPipe,
    TuiCheckbox,
  ],
  providers: [
    tuiInputPhoneInternationalOptionsProvider({
      metadata: defer(async () =>
        import('libphonenumber-js/max/metadata').then((m) => m.default),
      ),
    }),
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly alerts = inject(TuiAlertService);
  private readonly fb = inject(FormBuilder);
  private readonly pdfService = inject(PdfService);
  private readonly iaService = inject(IaService);
  private readonly saveDataService = inject(SaveDataService);

  activeTab = signal(0);
  isLoading = signal(false);
  protected readonly countries: readonly TuiCountryIsoCode[] = [
    'AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 'EC', 'ES', 'GT',
    'HN', 'MX', 'NI', 'PA', 'PE', 'PR', 'PY', 'SV', 'US', 'UY', 'VE'
  ];

  cvForm: FormGroup<CvFormControls>;
  iaForm: FormGroup<iaFormControls>;

  cvPreview: Signal<CvFormShape>;
  hasExperience: Signal<boolean>;
  hasEducation: Signal<boolean>;
  hasSkills: Signal<boolean>;

  constructor() {
    this.cvForm = this.createCvForm();
    this.iaForm = this.createIaForm();
    this.loadCvData();

    this.cvPreview = toSignal(
      this.cvForm.valueChanges.pipe(
        startWith(this.cvForm.getRawValue()),
        map(() => this.cvForm.getRawValue() as CvFormShape)
      ),
      { initialValue: this.cvForm.getRawValue() as CvFormShape }
    );
    this.hasExperience = computed(() => {
      const expArray = this.cvPreview().experience;
      return !!expArray && expArray.length > 0;
    });

    this.hasEducation = computed(() => {
      const eduArray = this.cvPreview().education;
      return !!eduArray && eduArray.length > 0;
    });
    this.hasSkills = computed(() => {
      const skillsArray = this.cvPreview().skills;
      return !!skillsArray && skillsArray.length > 0;
    });

    this.addExperience();
    this.addEducation();
  }

  private createCvForm(): FormGroup<CvFormControls> {
    return this.fb.group<CvFormControls>({
      personalInfo: this.fb.group<PersonalInfoControls>({
        name: this.fb.control('', Validators.required),
        job: this.fb.control('', Validators.required),
        email: this.fb.control(''),
        phone: this.fb.control(''),
        linkedin: this.fb.control(''),
        profileSummary: this.fb.control(''),
      }),
      education: this.fb.array<FormGroup<EducationControls>>([]),
      experience: this.fb.array<FormGroup<ExperienceControls>>([]),
      skills: this.fb.control([] as string[]),
    });
  }

  private createIaForm(): FormGroup<iaFormControls> {
    return this.fb.group<iaFormControls>({
      jobDescription: this.fb.control('', Validators.required),
      makeEnglish: this.fb.control(false)
    });
  }

  private createExperienceGroup(exp?: ExperienceValue): FormGroup<ExperienceControls> {
    return this.fb.group<ExperienceControls>({
      // Ahora 'exp.role' es un 'string | null', que es lo que 'fb.control()' espera.
      role: this.fb.control(exp?.role || ''),
      company: this.fb.control(exp?.company || ''),
      dateIn: this.fb.control(exp?.dateIn || ''),
      dateFin: this.fb.control(exp?.dateFin || ''),
      bullets: this.fb.control(exp?.bullets || '')
    });
  }



  addExperience(): void {
    this.experienceForms.push(this.createExperienceGroup());
  }

  removeExperience(index: number): void {
    this.experienceForms.removeAt(index);
  }

  private createEducationGroup(edu?: EducationValue): FormGroup<EducationControls> {
    return this.fb.group<EducationControls>({
      title: this.fb.control(edu?.title || ''),
      institution: this.fb.control(edu?.institution || ''),
      bullets: this.fb.control(edu?.bullets || ''),
      dateIn: this.fb.control(edu?.dateIn || ''),
      dateFin: this.fb.control(edu?.dateFin || ''),
    });
  }

  addEducation(): void {
    this.educationForms.push(this.createEducationGroup());
  }

  removeEducacion(index: number): void {
    this.educationForms.removeAt(index);
  }

  optimizarCv() {
    this.isLoading.set(true);

    const payload: CvPayload = {
      baseCv: this.cvForm.getRawValue() as CvFormShape,
      jobDesc: this.iaForm.getRawValue().jobDescription ?? ''
    };

    this.iaService.generateCvWithIA(payload)
      .pipe(
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (response: TransformedCvResponse) => {

          const { education, ...restOfResponse } = response;

          const patchData = {
            ...restOfResponse,
            experience: response.experience
          };

          this.cvForm.patchValue(patchData);

          if (education && this.educationForms.length > 0) {
            this.educationForms.at(0).patchValue({
              bullets: education.bullets
            });
          }

          this.alerts.open(
            'CV optimizado con IA. ¡Revisá los cambios!',
            { appearance: 'success' }
          ).subscribe();
        },
        error: (err) => {
          console.error(err);
          this.alerts.open(
            err.message,
            { appearance: 'error' }
          ).subscribe();
        }
      });
  }


  downloadPdf(){
    let data: CvFormShape = this.cvForm.getRawValue();
    this.pdfService.downloadPdf(data);
  }

  private loadCvData(): void {
    const savedData = this.saveDataService.loadData();

    if (savedData) {
      // Si hay datos, poblamos los FormArrays primero
      (savedData.education || []).forEach(edu => {
        this.educationForms.push(this.createEducationGroup(edu));
      });

      (savedData.experience || []).forEach(exp => {
        this.experienceForms.push(this.createExperienceGroup(exp));
      });

      // Usamos patchValue para el resto del formulario (incluyendo personalInfo, profileSummary y skills)
      this.cvForm.patchValue(savedData);

      this.alerts.open('CV cargado desde la sesión anterior', {
        appearance: 'info',
        autoClose: 3000
      }).subscribe();

    } else {
      // Si no hay datos guardados, creamos los campos vacíos por defecto
      this.addExperience();
      this.addEducation();
    }
  }

  saveCv(): void {
    this.saveDataService.saveData(this.cvForm.getRawValue() as CvFormShape);
  }
  clearCv(): void {
    this.experienceForms.clear();
    this.educationForms.clear();

    this.cvForm.reset();

    this.addExperience();
    this.addEducation();

    this.saveDataService.clearData();
  }

  get experienceForms() {
    return this.cvForm.get('experience') as FormArray<FormGroup<ExperienceControls>>;
  }
  get educationForms() {
    return this.cvForm.get('education') as FormArray<FormGroup<EducationControls>>;
  }
  protected readonly Boolean = Boolean;
}
