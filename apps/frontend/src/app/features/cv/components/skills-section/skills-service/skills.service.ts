import { computed, inject, Injectable, Signal } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { CertificationControls, SkillsControls } from '../../../../../core/models/controls.model';
import { CvFormBuilderService } from '../../../services/cv-form/cv-form-builder/cv-form-builder.service';
import { CvStateService } from '../../../services/cv-form/cv-form-state/cv-state.service';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private readonly state = inject(CvStateService);
  private readonly fb = inject(CvFormBuilderService);

  public readonly formArray: Signal<FormArray<FormGroup<SkillsControls>>> = computed(() => {
    return this.state.skillsArray;
  });

  public addSkillGroup(): void {
    this.formArray().push(this.fb.createSkillGroup());
  }

  public removeSkillGroup(index: number): void {
    this.formArray().removeAt(index);
  }

  public addCertification(skillGroupIndex: number): void {
    const skillGroup = this.formArray().at(skillGroupIndex);
    if (skillGroup) {
      const certsArray = skillGroup.controls.certifications as FormArray<
        FormGroup<CertificationControls>
      >;
      certsArray.push(this.fb.createCertificationGroup());
    }
  }

  public removeCertification(skillGroupIndex: number, certIndex: number): void {
    const skillGroup = this.formArray().at(skillGroupIndex);
    if (skillGroup) {
      const certsArray = skillGroup.controls.certifications as FormArray;
      certsArray.removeAt(certIndex);
    }
  }

  public getCertificationsControls(
    skillGroup: AbstractControl,
  ): FormGroup<CertificationControls>[] {
    const group = skillGroup as FormGroup<SkillsControls>;
    return (group.controls.certifications as FormArray<FormGroup<CertificationControls>>).controls;
  }
}
