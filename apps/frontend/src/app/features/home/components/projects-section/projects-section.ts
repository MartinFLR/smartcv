import { Component, input, output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiRipple } from '@taiga-ui/addon-mobile';
import { TuiTextarea } from '@taiga-ui/kit';
import { ProjectControls } from '../../../../core/models/controls.model';
import { TuiCard } from '@taiga-ui/layout';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-projects-section',
  imports: [
    TuiButton,
    TuiRipple,
    ReactiveFormsModule,
    TuiTextfield,
    TuiTextarea,
    TuiCard,
    TranslocoDirective,
  ],
  templateUrl: './projects-section.html',
})
export class ProjectsSection {
  projectForms = input.required<FormArray<FormGroup<ProjectControls>>>();
  add = output<void>();
  remove = output<number>();
}
