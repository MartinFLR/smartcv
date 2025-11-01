import {Component, computed, inject, Signal, signal} from '@angular/core';
import {TuiAlertService, TuiButton, TuiIcon, TuiLoader, TuiTextfield} from '@taiga-ui/core';
import {
  TuiButtonLoading,
  TuiCheckbox,
  TuiFade,
  TuiInputChip,
  tuiInputPhoneInternationalOptionsProvider, TuiTabs, TuiTextarea
} from '@taiga-ui/kit';
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
import { IaService} from '../../services/ia.service';
import {
  CvFormControls,
  CvFormShape, CvPayload,
  EducationControls,
  ExperienceControls, IaFormControls,
  PersonalInfoControls, TransformedCvResponse, TransformedExperience, TransformedEducation, SkillsControls,
  CertificationControls, ProjectControls, TransformedProject
} from '../../../../shared/types/types';
import {SaveDataService} from '../../services/save-data.service';
import {DummyView} from './dummy-view/dummy-view';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TuiButton,
    TuiTextfield,
    TuiTextarea,
    FormsModule,
    ReactiveFormsModule,
    TuiInputChip,
    TuiRipple,
    TuiIcon,
    TuiInputPhoneInternational,
    TuiTabs,
    TuiFade,
    TuiCheckbox,
    TuiButtonLoading,
    DummyView,
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
// Importaciones mantienen igual

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
  iaForm: FormGroup<IaFormControls>;

  cvPreview: Signal<CvFormShape>;
  hasExperience: Signal<boolean>;
  hasEducation: Signal<boolean>;
  hasSkills: Signal<boolean>;
  hasProjects: Signal<boolean>;

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

    this.hasEducation = computed(() => !!this.cvPreview().education?.length);
    this.hasExperience = computed(() => !!this.cvPreview().experience?.length);
    this.hasProjects = computed(() => !!this.cvPreview().projects?.length);

    this.hasSkills = computed(() => {
      const skillsArray = this.cvPreview().skills;
      if (!skillsArray || skillsArray.length === 0) return false;

      return skillsArray.some(group =>
        (group.skills && group.skills.length > 0) ||
        (group.languages && group.languages.length > 0) ||
        (group.certifications && group.certifications.length > 0) ||
        (group.additional && group.additional.length > 0)
      );
    });


    if (!this.experienceForms.length) this.addExperience();
    if (!this.projectForms.length) this.addProject();
    if (!this.educationForms.length) this.addEducation();
    if (!this.skillsForms.length) this.addSkill();

  }

  // Se ha cambiado a FormBuilder para cumplir con la restricción de no usar NonNullableFormBuilder
  private createCvForm(): FormGroup<CvFormControls> {
    return this.fb.group<CvFormControls>({
      personalInfo: this.fb.group<PersonalInfoControls>({
        name: this.fb.control<string | null>('', Validators.required),
        job: this.fb.control<string | null>('', Validators.required),
        email: this.fb.control<string | null>(''),
        phone: this.fb.control<string | null>(''),
        linkedin: this.fb.control<string | null>(''),
        location: this.fb.control<string | null>(''),
        github: this.fb.control<string | null>(''),
        web: this.fb.control<string | null>(''),
        profileSummary: this.fb.control<string | null>(''),
      }),
      education: this.fb.array<FormGroup<EducationControls>>([]),
      experience: this.fb.array<FormGroup<ExperienceControls>>([]),
      projects: this.fb.array<FormGroup<ProjectControls>>([]),
      skills: this.fb.array<FormGroup<SkillsControls>>([]),
    });
  }

  private createIaForm(): FormGroup<IaFormControls> {
    return this.fb.group<IaFormControls>({
      jobDescription: this.fb.control<string | null>('', Validators.required),
      makeEnglish: this.fb.control<boolean | null>(false)
    });
  }

  // Definiciones de grupos con tipos explícitos para string | null (compatible con FormBuilder)
  private createExperienceGroup(exp?: Partial<TransformedExperience>): FormGroup<ExperienceControls> {
    return this.fb.group<ExperienceControls>({
      role: this.fb.control<string | null>(exp?.role || ''),
      company: this.fb.control<string | null>(exp?.company || ''),
      dateIn: this.fb.control<string | null>(exp?.dateIn || ''),
      dateFin: this.fb.control<string | null>(exp?.dateFin || ''),
      bullets: this.fb.control<string | null>(exp?.bullets || '')
    });
  }

  private createProjectGroup(exp?: Partial<TransformedProject>): FormGroup<ProjectControls> {
    return this.fb.group<ProjectControls>({
      name: this.fb.control<string | null>(exp?.name || ''),
      subtitle: this.fb.control<string | null>(exp?.subtitle || ''),
      dateIn: this.fb.control<string | null>(exp?.dateIn || ''),
      dateFin: this.fb.control<string | null>(exp?.dateFin || ''),
      bullets: this.fb.control<string | null>(exp?.bullets || '')
    });
  }

  private createEducationGroup(edu?: Partial<TransformedEducation>): FormGroup<EducationControls> {
    return this.fb.group<EducationControls>({
      title: this.fb.control<string | null>(edu?.title || ''),
      institution: this.fb.control<string | null>(edu?.institution || ''),
      bullets: this.fb.control<string | null>(edu?.bullets || ''),
      dateIn: this.fb.control<string | null>(edu?.dateIn || ''),
      dateFin: this.fb.control<string | null>(edu?.dateFin || ''),
    });
  }

  private createCertificationGroup(cert?: { name?: string | null; date?: string | null }): FormGroup<CertificationControls> {
    return this.fb.group<CertificationControls>({
      name: this.fb.control<string | null>(cert?.name ?? null),
      date: this.fb.control<string | null>(cert?.date ?? null)
    });
  }

  /**
   * Corrige el problema de tipado para TuiInputChip.
   * Se utiliza `FormControl<string[] | null>` y se inicializa con `[]` para que sea un array válido.
   */
  private createSkillGroup(skillObj?: Partial<{ skills: string[]; languages: string[]; certifications: {name:string;date:string}[]; additional: string[] }>): FormGroup<SkillsControls> {
    const certsArray = this.fb.array<FormGroup<CertificationControls>>(
      (skillObj?.certifications || []).map(c => this.createCertificationGroup(c))
    );

    return this.fb.group<SkillsControls>({
      // CORRECCIÓN CLAVE: El tipo debe ser `string[] | null` para TuiInputChip.
      skills: this.fb.control<string[] | null>(skillObj?.skills || []),
      languages: this.fb.control<string[] | null>(skillObj?.languages || []),
      certifications: certsArray,
      additional: this.fb.control<string[] | null>(skillObj?.additional || [])
    });
  }

  // Getters para los FormArrays (FormArray tipado con los grupos internos)
  get experienceForms(): FormArray<FormGroup<ExperienceControls>> {
    return this.cvForm.get('experience') as FormArray<FormGroup<ExperienceControls>>;
  }
  get projectForms(): FormArray<FormGroup<ProjectControls>> {
    return this.cvForm.get('projects') as FormArray<FormGroup<ProjectControls>>;
  }

  get educationForms(): FormArray<FormGroup<EducationControls>> {
    return this.cvForm.get('education') as FormArray<FormGroup<EducationControls>>;
  }

  get skillsForms(): FormArray<FormGroup<SkillsControls>> {
    return this.cvForm.get('skills') as FormArray<FormGroup<SkillsControls>>;
  }

  // Métodos de acción (CRUD básico de FormArrays)
  addExperience(): void {
    this.experienceForms.push(this.createExperienceGroup());
  }

  removeExperience(i: number): void {
    this.experienceForms.removeAt(i);
  }

  addProject(): void {
    this.projectForms.push(this.createProjectGroup());
  }

  removeProject(i: number): void {
    this.projectForms.removeAt(i);
  }


  addEducation(): void {
    this.educationForms.push(this.createEducationGroup());
  }

  removeEducacion(i: number): void {
    this.educationForms.removeAt(i);
  }

  addSkill(skillObj?: Partial<{ skills: string[]; languages: string[]; certifications: {name:string;date:string}[]; additional: string[] }>): void {
    this.skillsForms.push(this.createSkillGroup(skillObj));
  }

  removeSkill(i: number): void {
    this.skillsForms.removeAt(i);
  }

  addCertification(skillGroupIndex: number): void {
    const certificationsArray = this.skillsForms.at(skillGroupIndex)?.get('certifications') as FormArray<FormGroup<CertificationControls>> | null;
    if (certificationsArray) {
      this.getCertificationsArray(this.skillsForms.at(skillGroupIndex) as FormGroup).push(this.createCertificationGroup());
    }
  }

  removeCertification(skillGroupIndex: number, certIndex: number): void {
    const certificationsArray = this.skillsForms.at(skillGroupIndex)?.get('certifications') as FormArray<FormGroup<CertificationControls>> | null;
    if (certificationsArray) {
      certificationsArray.removeAt(certIndex);
    }
  }

  // --- MÉTODOS DE UTILIDAD PARA EL TEMPLATE ---

  /**
   * Reemplaza el uso de .filter(Boolean) en el template para la vista previa.
   */
  protected filterTruthy(arr: (string | null | undefined)[]): string[] {
    return arr.filter(value => value && value.length > 0) as string[];
  }

  /**
   * Obtiene el FormArray de certificaciones de forma segura para usar en el template.
   */
  public getCertificationsArray(skillGroup: FormGroup): FormArray<FormGroup<CertificationControls>> {
    return skillGroup.get('certifications') as FormArray<FormGroup<CertificationControls>>;
  }

  /**
   * Obtiene el índice del grupo de skills dentro del FormArray principal.
   * Reemplaza a la sintaxis obsoleta $parent.$index.
   */
  public getSkillGroupIndex(skillGroup: FormGroup): number {
    return this.skillsForms.controls.indexOf(skillGroup);
  }

  /**
   * Obtiene los controles del FormArray de Certificaciones para el @for.
   */
  public getCertificationControls(skillGroup: FormGroup): FormGroup<CertificationControls>[] {
    // Retorna directamente los controles del FormArray obtenido de forma segura.
    return this.getCertificationsArray(skillGroup).controls;
  }

  // Optimización con IA
  optimizarCv(): void {
    if (this.isLoading()) return;

    if (this.iaForm.invalid) {
      this.alerts.open('Falta la descripción del puesto (Job Description).', { appearance: 'error' }).subscribe();
      return;
    }

    this.isLoading.set(true);
    const rawCv: CvFormShape = this.cvForm.getRawValue() as CvFormShape;

    const payload: CvPayload = {
      baseCv: rawCv,
      jobDesc: this.iaForm.getRawValue().jobDescription ?? ''
    };

    this.iaService.generateCvWithIA(payload)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response: TransformedCvResponse) => {
          this.patchFormArrays(response);

          this.cvForm.patchValue({
            personalInfo: {
              ...this.cvForm.value.personalInfo,
              profileSummary: response.profileSummary,
              job: response.job
            }
          });

          this.saveDataService.saveData(this.cvForm.getRawValue() as CvFormShape);
          this.alerts.open('CV optimizado con IA. ¡Revisá los cambios!', { appearance: 'success', autoClose: 5000 }).subscribe();
        },
        error: (err) => {
          console.error('Error de IA:', err);
          const message = err.message || 'Error al conectar con la IA. Intente de nuevo.';
          this.alerts.open(message, { appearance: 'error', autoClose: 7000 }).subscribe();
        }
      });
  }

  // Lógica de parcheo de FormArrays
  private patchFormArrays(response: TransformedCvResponse): void {
    const applyPatch = <T extends FormGroup>(
      array: FormArray<T>,
      data: any[],
      creator: (item: any) => T,
      patchFields: (item: any) => Partial<T['controls']>
    ) => {
      array.clear();
      data.forEach(item => {
        const newGroup = creator(item);
        newGroup.patchValue(patchFields(item));
        array.push(newGroup);
      });
    };

    applyPatch(this.experienceForms, response.experience,
      (exp) => this.createExperienceGroup(exp),
      (exp) => ({
        ...exp,
        bullets: exp.bullets || ''
      }),

    );

    applyPatch(this.educationForms, response.education,
      (edu) => this.createEducationGroup(edu),
      (edu) => ({
        ...edu,
        bullets: edu.bullets || ''
      })
    );

    applyPatch(this.projectForms, response.project,
      (pj) => this.createProjectGroup(pj),
      (pj) => ({
        ...pj,
        bullets: pj.bullets || '',
        name: pj.name || '',
        subtitle: pj.subtitle || '',
      })
    );

    applyPatch(this.skillsForms, response.skills,
      (s) => this.createSkillGroup(s),
      (s) => ({
        skills: s.skills || [],
        languages: s.languages || [],
        additional: s.additional || []
      })
    );
  }

  downloadPdf(): void {
    const data: CvFormShape = this.cvForm.getRawValue() as CvFormShape;
    this.pdfService.downloadPdf(data);
  }

  saveCv(): void {
    this.saveDataService.saveData(this.cvForm.getRawValue() as CvFormShape);
    this.alerts.open('Datos guardados localmente.', { appearance: 'info', autoClose: 3000 }).subscribe();
  }

  clearCv(): void {
    this.experienceForms.clear();
    this.educationForms.clear();
    this.skillsForms.clear();
    this.projectForms.clear()

    this.cvForm.reset();

    this.addExperience();
    this.addEducation();
    this.addSkill();
    this.addProject()

    this.saveDataService.clearData();
    this.alerts.open('CV limpiado. Inicie un nuevo CV.', { appearance: 'warning', autoClose: 3000 }).subscribe();
  }

  private loadCvData(): void {
    const savedData = this.saveDataService.loadData();
    if (!savedData) return;

    this.educationForms.clear();
    (savedData.education || []).forEach((e: any) => this.educationForms.push(this.createEducationGroup(e)));

    this.experienceForms.clear();
    (savedData.experience || []).forEach((e: any) => this.experienceForms.push(this.createExperienceGroup(e)));

    this.experienceForms.clear();
    (savedData.projects || []).forEach((e: any) => this.projectForms.push(this.createProjectGroup(e)));


    this.skillsForms.clear();
    (savedData.skills || []).forEach((s: any) => {
      this.skillsForms.push(this.createSkillGroup({
        skills: s.skills || [],
        languages: s.languages || [],
        certifications: s.certifications || [],
        additional: s.additional || []
      }));
    });

    if (!this.experienceForms.length) this.addExperience();
    if (!this.projectForms.length) this.addProject();
    if (!this.educationForms.length) this.addEducation();
    if (!this.skillsForms.length) this.addSkill();

    this.cvForm.patchValue(savedData);
    this.alerts.open('CV cargado desde la sesión anterior', { appearance: 'info', autoClose: 3000 }).subscribe();
  }
}
