import { computed, inject, Injectable, Signal } from '@angular/core';
import { CvFormBuilderService } from '../../../services/cv-form/cv-form-builder/cv-form-builder.service';
import { CvStateService } from '../../../services/cv-form/cv-form-state/cv-state.service';
import { ProjectControls } from '../../../../../core/models/controls.model';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private readonly state = inject(CvStateService);
  private readonly fb = inject(CvFormBuilderService);

  public readonly formArray: Signal<FormArray<FormGroup<ProjectControls>>> = computed(() => {
    return this.state.projectsArray;
  });

  public add(): void {
    this.formArray().push(this.fb.createProjectGroup());
  }

  public remove(index: number): void {
    this.formArray().removeAt(index);
  }
}
