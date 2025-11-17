import { Component, input, output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiTextarea } from '@taiga-ui/kit';
import { TuiRipple } from '@taiga-ui/addon-mobile';
import { EducationControls } from '../../../../core/models/controls.model';
import { TuiCard } from '@taiga-ui/layout';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-education-section',
  imports: [
    TuiTextfield,
    TuiTextarea,
    ReactiveFormsModule,
    TuiButton,
    TuiRipple,
    TuiCard,
    TranslocoDirective,
  ],
  templateUrl: './education-section.html',
})
export class EducationSection {
  educationForms = input.required<FormArray<FormGroup<EducationControls>>>();
  add = output<void>();
  remove = output<number>();

  public getEducationsControls(): FormGroup<EducationControls>[] {
    const array = this.educationForms();
    return array ? array.controls : [];
  }
}
