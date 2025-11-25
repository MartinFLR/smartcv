import { computed, inject, Injectable, Signal } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { ExperienceControls } from '../../../../../core/models/controls.model';
import { CvFormBuilderService } from '../../../services/cv-form/cv-form-builder/cv-form-builder.service';
import { CvStateService } from '../../../services/cv-form/cv-form-state/cv-state.service';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private readonly state = inject(CvStateService);
  private readonly fb = inject(CvFormBuilderService);

  public readonly formArray: Signal<FormArray<FormGroup<ExperienceControls>>> = computed(() => {
    return this.state.experienceArray;
  });

  public add(): void {
    this.formArray().push(this.fb.createExperienceGroup());
  }

  public remove(index: number): void {
    this.formArray().removeAt(index);
  }
}
