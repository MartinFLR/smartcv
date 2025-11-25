import { computed, effect, inject, Injectable, signal, Signal, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormArray, FormGroup } from '@angular/forms';
import { map, startWith, distinctUntilChanged, merge } from 'rxjs';
import { CvForm } from '@smartcv/types';
import { CvFormManagerService } from '../cv-form-manager/cv-form-manager-service';
import { SaveDataService } from '../../../../../core/services/save-data/save-data.service';
import {
  CvFormControls,
  IaFormControls,
  EducationControls,
  ExperienceControls,
  ProjectControls,
  SkillsControls,
  PersonalInfoControls,
} from '../../../../../core/models/controls.model';

@Injectable({
  providedIn: 'root',
})
export class CvStateService {
  private readonly formManager = inject(CvFormManagerService);
  private readonly saveDataService = inject(SaveDataService);

  public readonly isLoading = signal(false);
  public readonly isCvLocked = signal(false);
  public readonly lockedCv = signal<CvForm | null>(null);

  public readonly cvForm: FormGroup<CvFormControls>;
  public readonly iaForm: FormGroup<IaFormControls>;

  public readonly cvPreview: Signal<CvForm>;

  public readonly isValid: Signal<boolean>;

  public readonly hasExperience: Signal<boolean>;
  public readonly hasEducation: Signal<boolean>;
  public readonly hasSkills: Signal<boolean>;
  public readonly hasProjects: Signal<boolean>;

  constructor() {
    this.cvForm = this.formManager.buildCvForm();
    this.iaForm = this.formManager.buildIaForm();
    this.formManager.ensureMinimumFormArrays(this.cvForm);

    this.isValid = toSignal(
      merge(this.cvForm.statusChanges, this.cvForm.valueChanges).pipe(
        startWith(null),
        map(() => this.cvForm.valid),
        distinctUntilChanged(),
      ),
      { initialValue: this.cvForm.valid },
    );

    effect(() => {
      const activeCv = this.saveDataService.activeCv();
      untracked(() => {
        if (activeCv) {
          this.formManager.patchCvData(this.cvForm, activeCv);
        } else {
          this.resetInternalState();
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
      return (
        !!skillsArray &&
        skillsArray.some(
          (g) => g.skills?.length > 0 || g.languages?.length > 0 || g.certifications?.length > 0,
        )
      );
    });
  }

  public resetForm(): void {
    this.saveDataService.clearData();
    this.resetInternalState();
  }

  private resetInternalState(): void {
    this.formManager.resetCvForm(this.cvForm);
    this.formManager.ensureMinimumFormArrays(this.cvForm);
    this.isCvLocked.set(false);
    this.lockedCv.set(null);
    this.cvForm.updateValueAndValidity();
  }

  public setLockState(locked: boolean): void {
    if (locked) {
      this.lockedCv.set(this.cvForm.getRawValue() as CvForm);
      this.isCvLocked.set(true);
    } else {
      this.isCvLocked.set(false);
      this.lockedCv.set(null);
    }
  }

  public get personalInfoGroup() {
    return this.cvForm.controls.personalInfo as FormGroup<PersonalInfoControls>;
  }
  public get educationArray() {
    return this.cvForm.controls.education as FormArray<FormGroup<EducationControls>>;
  }
  public get experienceArray() {
    return this.cvForm.controls.experience as FormArray<FormGroup<ExperienceControls>>;
  }
  public get projectsArray() {
    return this.cvForm.controls.projects as FormArray<FormGroup<ProjectControls>>;
  }
  public get skillsArray() {
    return this.cvForm.controls.skills as FormArray<FormGroup<SkillsControls>>;
  }
}
