import { Component, inject, input, output } from '@angular/core';
import { ControlContainer, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiRipple } from '@taiga-ui/addon-mobile';
import { TuiTextarea } from '@taiga-ui/kit';
import { ProjectControls } from '../../../../../../types/Controls';
import { TuiCard } from '@taiga-ui/layout';

@Component({
  selector: 'app-projects-section',
  imports: [TuiButton, TuiRipple, ReactiveFormsModule, TuiTextfield, TuiTextarea, TuiCard],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  templateUrl: './projects-section.html',
})
export class ProjectsSection {
  projectForms = input.required<FormArray<FormGroup<ProjectControls>>>();
  add = output<void>();
  remove = output<number>();
}
