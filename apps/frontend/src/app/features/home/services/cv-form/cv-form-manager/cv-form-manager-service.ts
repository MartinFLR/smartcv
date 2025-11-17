import { inject, Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {
  CvFormControls,
  EducationControls,
  ExperienceControls,
  IaFormControls,
  ProjectControls,
  SkillsControls,
} from '../../../../../core/models/controls.model';
import { CvForm, TransformedCvResponse } from '@smartcv/types';
import { CvFormBuilderService } from '../cv-form-builder/cv-form-builder.service';

@Injectable({
  providedIn: 'root',
})
export class CvFormManagerService {
  private readonly fb = inject(FormBuilder);
  private readonly cvFormBuilder = inject(CvFormBuilderService);

  // --- Constructores de Formularios ---
  public buildCvForm(): FormGroup<CvFormControls> {
    return this.cvFormBuilder.buildCvForm();
  }

  public buildIaForm(): FormGroup<IaFormControls> {
    return this.cvFormBuilder.buildIaForm();
  }

  // --- Lógica de Manipulación de Arrays ---
  public createArray<TData, TGroup extends AbstractControl>(
    data: TData[] | undefined,
    creator: (item: TData) => TGroup,
  ): FormArray<TGroup> {
    const formGroups = (data || []).map((item) => creator(item));
    return new FormArray(formGroups);
  }

  public patchFormArrays(form: FormGroup<CvFormControls>, response: TransformedCvResponse): void {
    form.setControl(
      'experience',
      this.createArray(response.experience, (exp) => this.cvFormBuilder.createExperienceGroup(exp)),
    );
    form.setControl(
      'education',
      this.createArray(response.education, (edu) => this.cvFormBuilder.createEducationGroup(edu)),
    );
    form.setControl(
      'projects',
      this.createArray(response.project, (pj) => this.cvFormBuilder.createProjectGroup(pj)),
    );
    form.setControl(
      'skills',
      this.createArray(response.skills, (s) => this.cvFormBuilder.createSkillGroup(s)),
    );
  }

  public patchCvData(form: FormGroup<CvFormControls>, cvData: CvForm): void {
    form.setControl(
      'education',
      this.createArray(cvData.education, (edu) => this.cvFormBuilder.createEducationGroup(edu)),
    );
    form.setControl(
      'experience',
      this.createArray(cvData.experience, (exp) => this.cvFormBuilder.createExperienceGroup(exp)),
    );
    form.setControl(
      'projects',
      this.createArray(cvData.projects, (proj) => this.cvFormBuilder.createProjectGroup(proj)),
    );
    form.setControl(
      'skills',
      this.createArray(cvData.skills, (skill) => this.cvFormBuilder.createSkillGroup(skill)),
    );

    form.patchValue(cvData);
    form.get('personalInfo')?.patchValue(cvData.personalInfo);
  }

  public resetCvForm(form: FormGroup<CvFormControls>): void {
    form.setControl('education', this.fb.array<FormGroup<EducationControls>>([]));
    form.setControl('experience', this.fb.array<FormGroup<ExperienceControls>>([]));
    form.setControl('projects', this.fb.array<FormGroup<ProjectControls>>([]));
    form.setControl('skills', this.fb.array<FormGroup<SkillsControls>>([]));
    form.reset();
  }

  public ensureMinimumFormArrays(form: FormGroup<CvFormControls>): void {
    if (!(form.get('experience') as FormArray).length) {
      (form.get('experience') as FormArray).push(this.cvFormBuilder.createExperienceGroup());
    }
    if (!(form.get('education') as FormArray).length) {
      (form.get('education') as FormArray).push(this.cvFormBuilder.createEducationGroup());
    }
    if (!(form.get('projects') as FormArray).length) {
      (form.get('projects') as FormArray).push(this.cvFormBuilder.createProjectGroup());
    }
    if (!(form.get('skills') as FormArray).length) {
      (form.get('skills') as FormArray).push(this.cvFormBuilder.createSkillGroup());
    }
  }
}
