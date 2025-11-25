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

  public buildCvForm(): FormGroup<CvFormControls> {
    return this.cvFormBuilder.buildCvForm();
  }

  public buildIaForm(): FormGroup<IaFormControls> {
    return this.cvFormBuilder.buildIaForm();
  }

  private updateFormArray<TData, TGroup extends AbstractControl>(
    formArray: FormArray<TGroup>,
    data: TData[] | undefined,
    creator: (item: TData) => TGroup,
  ): void {
    formArray.clear();
    if (data) {
      data.forEach((item) => formArray.push(creator(item)));
    }
  }

  public patchFormArrays(form: FormGroup<CvFormControls>, response: TransformedCvResponse): void {
    this.updateFormArray(
      form.controls.experience as FormArray<FormGroup<ExperienceControls>>,
      response.experience,
      (exp) => this.cvFormBuilder.createExperienceGroup(exp),
    );
    this.updateFormArray(
      form.controls.education as FormArray<FormGroup<EducationControls>>,
      response.education,
      (edu) => this.cvFormBuilder.createEducationGroup(edu),
    );
    this.updateFormArray(
      form.controls.projects as FormArray<FormGroup<ProjectControls>>,
      response.project,
      (pj) => this.cvFormBuilder.createProjectGroup(pj),
    );
    this.updateFormArray(
      form.controls.skills as FormArray<FormGroup<SkillsControls>>,
      response.skills,
      (s) => this.cvFormBuilder.createSkillGroup(s),
    );
  }

  public patchCvData(form: FormGroup<CvFormControls>, cvData: CvForm): void {
    this.updateFormArray(
      form.controls.education as FormArray<FormGroup<EducationControls>>,
      cvData.education,
      (edu) => this.cvFormBuilder.createEducationGroup(edu),
    );
    this.updateFormArray(
      form.controls.experience as FormArray<FormGroup<ExperienceControls>>,
      cvData.experience,
      (exp) => this.cvFormBuilder.createExperienceGroup(exp),
    );
    this.updateFormArray(
      form.controls.projects as FormArray<FormGroup<ProjectControls>>,
      cvData.projects,
      (proj) => this.cvFormBuilder.createProjectGroup(proj),
    );
    this.updateFormArray(
      form.controls.skills as FormArray<FormGroup<SkillsControls>>,
      cvData.skills,
      (skill) => this.cvFormBuilder.createSkillGroup(skill),
    );

    if (cvData.personalInfo) {
      form.controls.personalInfo.patchValue(cvData.personalInfo);
    }
  }

  public resetCvForm(form: FormGroup<CvFormControls>): void {
    (form.controls.education as FormArray).clear();
    (form.controls.experience as FormArray).clear();
    (form.controls.projects as FormArray).clear();
    (form.controls.skills as FormArray).clear();

    form.reset();
  }

  public ensureMinimumFormArrays(form: FormGroup<CvFormControls>): void {
    const expArray = form.controls.experience as FormArray;
    if (expArray.length === 0) expArray.push(this.cvFormBuilder.createExperienceGroup());

    const eduArray = form.controls.education as FormArray;
    if (eduArray.length === 0) eduArray.push(this.cvFormBuilder.createEducationGroup());

    const projArray = form.controls.projects as FormArray;
    if (projArray.length === 0) projArray.push(this.cvFormBuilder.createProjectGroup());

    const skillsArray = form.controls.skills as FormArray;
    if (skillsArray.length === 0) skillsArray.push(this.cvFormBuilder.createSkillGroup());
  }
}
