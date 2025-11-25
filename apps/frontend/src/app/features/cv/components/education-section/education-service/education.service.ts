import { computed, inject, Injectable, Signal } from '@angular/core';
import { EducationControls } from '../../../../../core/models/controls.model';
import { FormArray, FormGroup } from '@angular/forms';
import { CvFormBuilderService } from '../../../services/cv-form/cv-form-builder/cv-form-builder.service';
import { CvStateService } from '../../../services/cv-form/cv-form-state/cv-state.service';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private readonly state = inject(CvStateService);
  private readonly fb = inject(CvFormBuilderService);

  public readonly formArray: Signal<FormArray<FormGroup<EducationControls>>> = computed(() => {
    return this.state.educationArray;
  });

  public add(): void {
    this.formArray().push(this.fb.createEducationGroup());
  }

  public remove(index: number): void {
    this.formArray().removeAt(index);
  }
}
