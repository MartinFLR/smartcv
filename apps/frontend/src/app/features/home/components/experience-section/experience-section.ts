import { Component, inject, input, output } from '@angular/core';
import { ControlContainer, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiRipple } from '@taiga-ui/addon-mobile';
import { TuiTextarea } from '@taiga-ui/kit';
import { ExperienceControls } from '../../../../core/models/controls.model';
import { TuiCardLarge } from '@taiga-ui/layout';

@Component({
  selector: 'app-experience-section',
  imports: [ReactiveFormsModule, TuiButton, TuiRipple, TuiTextfield, TuiTextarea, TuiCardLarge],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  templateUrl: './experience-section.html',
})
export class ExperienceSection {
  experienceForms = input.required<FormArray<FormGroup<ExperienceControls>>>();
  add = output<void>();
  remove = output<number>();
}
