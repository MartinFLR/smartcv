import { TuiFade, TuiTabs } from '@taiga-ui/kit';
import {
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  Signal,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiAlertService } from '@taiga-ui/core';
import { finalize, map, startWith } from 'rxjs';
import { PdfService } from '../../services/pdf/pdf.service';
import { SaveDataService } from '../../services/save-data/save-data.service';
import { CvFormBuilderService } from '../../services/cv-form-builder/cv-form-builder.service';
import { IaService } from '../../services/ia.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { DummyView } from './components/dummy-view/dummy-view';
import { IaSection } from './components/ia-section/ia-section.component';
import { SkillsSection } from './components/skills-section/skills-section';
import { ProjectsSection } from './components/projects-section/projects-section';
import { ExperienceSection } from './components/experience-section/experience-section';
import { EducationSection } from './components/education-section/education-section';
import { PersonalInfo } from './components/personal-info/personal-info';
import { Actions } from './components/actions/actions';
import { TemperatureLevel } from '../../../../../../libs/types/src/PromptTypes';
import { ATSSection } from './components/ats-section/ats-section';
import { CoverLetterSection } from './components/cover-letter-section/cover-letter-section';
import { CoverLetterService } from './components/cover-letter-section/cover-letter-service/cover-letter.service';
import {
  CertificationControls,
  CvFormControls,
  EducationControls,
  ExperienceControls,
  IaFormControls,
  PersonalInfoControls,
  ProjectControls,
  SkillsControls,
} from '../../../../types/Controls';
import { CvForm, CvPayload, TransformedCvResponse } from '../../../../../../libs/types/src/Types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiTabs,
    TuiFade,
    DummyView,
    IaSection,
    SkillsSection,
    ProjectsSection,
    ExperienceSection,
    EducationSection,
    PersonalInfo,
    Actions,
    ATSSection,
    CoverLetterSection,
  ],
  templateUrl: './home.html',
})
export class Home {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly alerts = inject(TuiAlertService);
  private readonly fb = inject(FormBuilder);
  private readonly pdfService = inject(PdfService);
  private readonly iaService = inject(IaService);
  private readonly saveDataService = inject(SaveDataService);
  private readonly cvFormBuilderService = inject(CvFormBuilderService);
  private readonly coverLetterService = inject(CoverLetterService);

  protected activeTab = signal(0);
  protected isLoading = signal(false);

  protected cvForm: FormGroup<CvFormControls>;
  protected iaForm: FormGroup<IaFormControls>;

  protected cvPreview: Signal<CvForm>;
  protected hasExperience: Signal<boolean>;
  protected hasEducation: Signal<boolean>;
  protected hasSkills: Signal<boolean>;
  protected hasProjects: Signal<boolean>;

  protected isCvLocked = signal(false);
  protected lockedCv = signal<CvForm | null>(null);

  constructor() {
    this.cvForm = this.cvFormBuilderService.buildCvForm();
    this.iaForm = this.createIaForm();

    effect(() => {
      const activeCv = this.saveDataService.activeCv();
      if (activeCv) {
        this.patchCvData(activeCv);
      } else {
        this.resetCvForm();
      }
    });

    effect(() => {
      if (this.saveDataService.activeCv() === null) {
        this.isCvLocked.set(false);
        this.lockedCv.set(null);
      }
    });

    this.cvPreview = toSignal(
      this.cvForm.valueChanges.pipe(
        startWith(this.cvForm.getRawValue()),
        map(() => this.cvForm.getRawValue() as CvForm),
      ),
      { initialValue: this.cvForm.getRawValue() as CvForm },
    );

    this.hasEducation = computed(() => !!this.cvPreview().education?.length);
    this.hasExperience = computed(() => !!this.cvPreview().experience?.length);
    this.hasProjects = computed(() => !!this.cvPreview().projects?.length);
    this.hasSkills = computed(() => {
      const skillsArray = this.cvPreview().skills;
      if (!skillsArray || skillsArray.length === 0) return false;
      return skillsArray.some(
        (group) =>
          (group.skills && group.skills.length > 0) ||
          (group.languages && group.languages.length > 0) ||
          (group.certifications && group.certifications.length > 0) ||
          (group.additional && group.additional.length > 0),
      );
    });

    if (!this.experienceForms.length) this.addExperience();
    if (!this.projectForms.length) this.addProject();
    if (!this.educationForms.length) this.addEducation();
    if (!this.skillsForms.length) this.addSkill();
  }

  private createIaForm(): FormGroup<IaFormControls> {
    return this.fb.group<IaFormControls>({
      jobDescription: this.fb.control<string | null>(''),
      makeEnglish: this.fb.control<boolean | null>(false),
      exaggeration: this.fb.control<number | null>(0),
    });
  }

  optimizarCv(): void {
    if (this.isLoading()) return;

    if (this.iaForm.invalid) {
      this.alerts
        .open('Falta la descripción del puesto (Job Description).', {
          appearance: 'error',
        })
        .subscribe();
      return;
    }

    this.isLoading.set(true);

    const baseCvForIa =
      this.isCvLocked() && this.lockedCv()
        ? this.lockedCv()!
        : (this.cvForm.getRawValue() as CvForm);

    const temperature = this.detectTemperature(this.iaForm.getRawValue().exaggeration ?? 0);

    const payload: CvPayload = {
      baseCv: baseCvForIa,
      jobDesc: this.iaForm.getRawValue().jobDescription ?? '',
      promptOption: { temperature },
    };

    this.iaService
      .generateCvWithIA(payload)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response: TransformedCvResponse) => {
          this.patchFormArrays(response);
          this.cvForm.patchValue({
            personalInfo: {
              ...this.cvForm.value.personalInfo,
              profileSummary: response.profileSummary,
              job: response.job,
            },
          });
          this.saveDataService.saveData(this.cvForm.getRawValue() as CvForm);
          this.alerts
            .open('CV optimizado con IA. ¡Revisá los cambios!', {
              appearance: 'success',
              autoClose: 5000,
            })
            .subscribe();

          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Error de IA:', err);
          const message = err.message || 'Error al conectar con la IA. Intente de nuevo.';
          this.alerts
            .open(message, {
              appearance: 'error',
              autoClose: 7000,
            })
            .subscribe();

          this.cdr.markForCheck();
        },
      });
  }

  downloadPdf(): void {
    const data: CvForm = this.cvForm.getRawValue() as CvForm;
    this.pdfService.downloadPdf(data);
  }

  saveCv(): void {
    try {
      this.saveDataService.saveData(this.cvForm.getRawValue() as CvForm);
    } catch (e) {
      this.showAlert((e as Error).message, 'error');
    }
  }

  clearCv(): void {
    try {
      this.saveDataService.clearData();
    } catch (e) {
      this.showAlert((e as Error).message, 'error');
    }
  }

  // --- Lógica  ---
  private detectTemperature(num: number): TemperatureLevel {
    switch (num) {
      case 0:
        return 'low';
      case 1:
        return 'medium';
      case 2:
        return 'high';
      default:
        return 'low';
    }
  }

  protected onLockCv(isLocked: boolean): void {
    if (isLocked) {
      this.lockedCv.set(this.cvForm.getRawValue() as CvForm);
      this.isCvLocked.set(true);
      this.showAlert('CV bloqueado. Las optimizaciones usarán esta versión.', 'info');
    } else {
      this.isCvLocked.set(false);
      this.lockedCv.set(null);
      this.showAlert('CV desbloqueado.', 'info');
    }
  }

  private patchFormArrays(response: TransformedCvResponse): void {
    // Ya no definimos 'const createArray' aquí.

    this.cvForm.setControl(
      'experience',
      this.createArray(
        response.experience,
        (
          exp, // <--- Agregamos 'this.'
        ) => this.cvFormBuilderService.createExperienceGroup(exp),
      ),
    );

    this.cvForm.setControl(
      'education',
      this.createArray(
        response.education,
        (
          edu, // <--- Agregamos 'this.'
        ) => this.cvFormBuilderService.createEducationGroup(edu),
      ),
    );

    this.cvForm.setControl(
      'projects',
      this.createArray(
        response.project,
        (
          pj, // <--- Agregamos 'this.'
        ) => this.cvFormBuilderService.createProjectGroup(pj),
      ),
    );

    this.cvForm.setControl(
      'skills',
      this.createArray(
        response.skills,
        (
          s, // <--- Agregamos 'this.'
        ) => this.cvFormBuilderService.createSkillGroup(s),
      ),
    );

    this.ensureMinimumFormArrays();
  }

  private resetCvForm(): void {
    this.cvForm.setControl('education', this.fb.array<FormGroup<EducationControls>>([]));
    this.cvForm.setControl('experience', this.fb.array<FormGroup<ExperienceControls>>([]));
    this.cvForm.setControl('projects', this.fb.array<FormGroup<ProjectControls>>([]));
    this.cvForm.setControl('skills', this.fb.array<FormGroup<SkillsControls>>([]));

    this.cvForm.reset();
    this.ensureMinimumFormArrays();
    this.cdr.markForCheck();
  }

  private patchCvData(cvData: CvForm): void {
    this.cvForm.setControl(
      'education',
      this.createArray(cvData.education, (edu) =>
        this.cvFormBuilderService.createEducationGroup(edu),
      ),
    );

    this.cvForm.setControl(
      'experience',
      this.createArray(cvData.experience, (exp) =>
        this.cvFormBuilderService.createExperienceGroup(exp),
      ),
    );

    this.cvForm.setControl(
      'projects',
      this.createArray(cvData.projects, (proj) =>
        this.cvFormBuilderService.createProjectGroup(proj),
      ),
    );

    this.cvForm.setControl(
      'skills',
      this.createArray(cvData.skills, (skill) => this.cvFormBuilderService.createSkillGroup(skill)),
    );

    this.ensureMinimumFormArrays();

    this.cvForm.patchValue(cvData, { emitEvent: false });
    this.cvForm.get('personalInfo')?.patchValue(cvData.personalInfo);

    this.cdr.markForCheck();
  }

  private ensureMinimumFormArrays(): void {
    if (!this.experienceForms().length) this.addExperience();
    if (!this.projectForms().length) this.addProject();
    if (!this.educationForms().length) this.addEducation();
    if (!this.skillsForms().length) this.addSkill();
  }

  // --- Manipulación  ---
  addEducation(): void {
    this.educationForms().push(this.cvFormBuilderService.createEducationGroup());
  }
  removeEducation(i: number): void {
    this.educationForms().removeAt(i);
  }
  addExperience(): void {
    this.experienceForms().push(this.cvFormBuilderService.createExperienceGroup());
  }
  removeExperience(i: number): void {
    this.experienceForms().removeAt(i);
  }
  addProject(): void {
    this.projectForms().push(this.cvFormBuilderService.createProjectGroup());
  }
  removeProject(i: number): void {
    this.projectForms().removeAt(i);
  }
  addSkill(): void {
    this.skillsForms().push(this.cvFormBuilderService.createSkillGroup());
  }
  removeSkill(i: number): void {
    this.skillsForms().removeAt(i);
  }

  private createArray<TData, TGroup extends AbstractControl>(
    data: TData[] | undefined,
    creator: (item: TData) => TGroup,
  ): FormArray<TGroup> {
    const formGroups = (data || []).map((item) => creator(item));
    return new FormArray(formGroups);
  }

  addCertification(skillGroupIndex: number): void {
    const certificationsArray = this.skillsForms()
      .at(skillGroupIndex)
      ?.get('certifications') as FormArray<FormGroup<CertificationControls>> | null;
    if (certificationsArray) {
      certificationsArray.push(this.cvFormBuilderService.createCertificationGroup());
    }
  }
  removeCertification(event: { skillGroupIndex: number; certIndex: number }): void {
    const certificationsArray = this.skillsForms()
      .at(event.skillGroupIndex)
      ?.get('certifications') as FormArray<FormGroup<CertificationControls>> | null;
    if (certificationsArray) {
      certificationsArray.removeAt(event.certIndex);
    }
  }

  protected readonly personalInfoGroup = computed(() => {
    this.cvPreview();
    return this.cvForm.get('personalInfo') as FormGroup<PersonalInfoControls>;
  });
  protected readonly educationForms = computed(() => {
    this.cvPreview();
    return this.cvForm.get('education') as FormArray<FormGroup<EducationControls>>;
  });
  protected readonly experienceForms = computed(() => {
    this.cvPreview();
    return this.cvForm.get('experience') as FormArray<FormGroup<ExperienceControls>>;
  });
  protected readonly projectForms = computed(() => {
    this.cvPreview();
    return this.cvForm.get('projects') as FormArray<FormGroup<ProjectControls>>;
  });
  protected readonly skillsForms = computed(() => {
    this.cvPreview();
    return this.cvForm.get('skills') as FormArray<FormGroup<SkillsControls>>;
  });

  private showAlert(
    message: string,
    appearance: 'success' | 'warning' | 'error' | 'info' = 'success',
  ): void {
    this.alerts.open(message, { appearance, autoClose: 3000 }).subscribe();
  }
}
