import { computed, effect, inject, Injectable, signal, Signal, untracked } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import {
  CertificationControls,
  CvFormControls,
  EducationControls,
  ExperienceControls,
  IaFormControls,
  PersonalInfoControls,
  ProjectControls,
  SkillsControls,
} from '../../../../core/models/controls.model';
import { CvForm } from '@smartcv/types';
import { finalize, map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { TuiAlertService } from '@taiga-ui/core';
import { CvFormBuilderService } from '../cv-form/cv-form-builder/cv-form-builder.service';
import { SaveDataService } from '../../../../core/services/save-data/save-data.service';
import { CvFormManagerService } from '../cv-form/cv-form-manager/cv-form-manager-service';
import { CvFormDataService } from '../cv-form/cv-form-data/cv-form-data.service';

@Injectable({
  providedIn: 'root',
})
export class HomeStateService {
  private readonly formManager = inject(CvFormManagerService);
  private readonly dataService = inject(CvFormDataService);
  private readonly saveDataService = inject(SaveDataService);
  private readonly alerts = inject(TuiAlertService);

  private readonly cvFormBuilder = inject(CvFormBuilderService);

  // --- State UI ---
  public readonly activeTab = signal(0);
  public readonly isLoading = signal(false);
  public readonly isCvLocked = signal(false);
  public readonly lockedCv = signal<CvForm | null>(null);

  // --- State Form ---
  public readonly cvForm: FormGroup<CvFormControls>;
  public readonly iaForm: FormGroup<IaFormControls>;

  // --- Derivated State ---
  public readonly cvPreview: Signal<CvForm>;
  public readonly hasExperience: Signal<boolean>;
  public readonly hasEducation: Signal<boolean>;
  public readonly hasSkills: Signal<boolean>;
  public readonly hasProjects: Signal<boolean>;

  // --- Getters  ---
  public readonly personalInfoGroup: Signal<FormGroup<PersonalInfoControls>>;
  public readonly educationForms: Signal<FormArray<FormGroup<EducationControls>>>;
  public readonly experienceForms: Signal<FormArray<FormGroup<ExperienceControls>>>;
  public readonly projectForms: Signal<FormArray<FormGroup<ProjectControls>>>;
  public readonly skillsForms: Signal<FormArray<FormGroup<SkillsControls>>>;

  constructor() {
    this.cvForm = this.formManager.buildCvForm();
    this.iaForm = this.formManager.buildIaForm();
    this.formManager.ensureMinimumFormArrays(this.cvForm);

    effect(() => {
      const activeCv = this.saveDataService.activeCv();
      untracked(() => {
        if (activeCv) {
          this.formManager.patchCvData(this.cvForm, activeCv);
        } else {
          this.formManager.resetCvForm(this.cvForm);
          this.formManager.ensureMinimumFormArrays(this.cvForm);
        }
      });
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

    // --- Getters ---
    this.personalInfoGroup = computed(() => {
      this.cvPreview();
      return this.cvForm.get('personalInfo') as FormGroup<PersonalInfoControls>;
    });
    this.educationForms = computed(() => {
      this.cvPreview();
      return this.cvForm.get('education') as FormArray<FormGroup<EducationControls>>;
    });
    this.experienceForms = computed(() => {
      this.cvPreview();
      return this.cvForm.get('experience') as FormArray<FormGroup<ExperienceControls>>;
    });
    this.projectForms = computed(() => {
      this.cvPreview();
      return this.cvForm.get('projects') as FormArray<FormGroup<ProjectControls>>;
    });
    this.skillsForms = computed(() => {
      this.cvPreview();
      return this.cvForm.get('skills') as FormArray<FormGroup<SkillsControls>>;
    });
  }

  // --- Public ---
  public optimizarCv(): void {
    if (this.isLoading()) return;
    if (this.iaForm.invalid) {
      this.showAlert('Falta la Job Description.', 'error');
      return;
    }

    this.isLoading.set(true);
    const rawIaForm = this.iaForm.getRawValue();
    const baseCv =
      this.isCvLocked() && this.lockedCv()
        ? this.lockedCv()!
        : (this.cvForm.getRawValue() as CvForm);

    this.dataService
      .optimizarCv(baseCv, rawIaForm.jobDescription ?? '', rawIaForm.exaggeration ?? 0)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response) => {
          this.formManager.patchFormArrays(this.cvForm, response);
          this.cvForm.patchValue({
            personalInfo: {
              ...this.cvForm.value.personalInfo,
              profileSummary: response.profileSummary,
              job: response.job,
            },
          });
          this.dataService.saveCv(this.cvForm.getRawValue() as CvForm);
          this.showAlert('CV optimizado con IA. ¡Revisá los cambios!', 'success', 5000);
        },
        error: (err) => {
          console.error('Error de IA:', err);
          const message = err.message || 'Error al conectar con la IA.';
          this.showAlert(message, 'error', 7000);
        },
      });
  }

  public downloadPdf(): void {
    this.dataService.downloadPdf(this.cvForm.getRawValue() as CvForm);
  }

  public saveCv(): void {
    try {
      this.dataService.saveCv(this.cvForm.getRawValue() as CvForm);
      this.showAlert('CV guardado localmente.', 'success');
    } catch (e) {
      this.showAlert((e as Error).message, 'error');
    }
  }

  public clearCv(): void {
    try {
      this.dataService.clearCv();
      this.showAlert('Formulario limpiado.', 'info');
    } catch (e) {
      this.showAlert((e as Error).message, 'error');
    }
  }

  public onLockCv(isLocked: boolean): void {
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

  // --- Métodos de Manipulación de Form ---
  public addEducation(): void {
    this.educationForms().push(this.cvFormBuilder.createEducationGroup());
  }
  public removeEducation(i: number): void {
    this.educationForms().removeAt(i);
  }
  public addExperience(): void {
    this.experienceForms().push(this.cvFormBuilder.createExperienceGroup());
  }
  public removeExperience(i: number): void {
    this.experienceForms().removeAt(i);
  }
  public addProject(): void {
    this.projectForms().push(this.cvFormBuilder.createProjectGroup());
  }
  public removeProject(i: number): void {
    this.projectForms().removeAt(i);
  }
  public addSkill(): void {
    this.skillsForms().push(this.cvFormBuilder.createSkillGroup());
  }
  public removeSkill(i: number): void {
    this.skillsForms().removeAt(i);
  }

  public addCertification(skillGroupIndex: number): void {
    const certs = this.skillsForms().at(skillGroupIndex)?.get('certifications') as FormArray<
      FormGroup<CertificationControls>
    > | null;
    certs?.push(this.cvFormBuilder.createCertificationGroup());
  }

  public removeCertification(event: { skillGroupIndex: number; certIndex: number }): void {
    const certs = this.skillsForms().at(event.skillGroupIndex)?.get('certifications') as FormArray<
      FormGroup<CertificationControls>
    > | null;
    certs?.removeAt(event.certIndex);
  }

  // --- Helpers ---
  private showAlert(
    message: string,
    appearance: 'success' | 'warning' | 'error' | 'info' = 'success',
    autoClose = 3000,
  ): void {
    this.alerts.open(message, { appearance, autoClose }).subscribe();
  }
}
