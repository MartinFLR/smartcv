import {Component, inject, input, output} from '@angular/core';
import {ExperienceControls} from '../../../../../../shared/types/types';
import {ControlContainer, FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TuiButton, TuiTextfield} from '@taiga-ui/core';
import {TuiRipple} from '@taiga-ui/addon-mobile';
import {TuiTextarea} from '@taiga-ui/kit';

@Component({
  selector: 'app-experience-section',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiRipple,
    TuiTextfield,
    TuiTextarea
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, {skipSelf: true})
    }
  ],
  templateUrl: './experience-section.html',
  styleUrl: './experience-section.css',
})
export class ExperienceSection {
  experienceForms = input.required<FormArray<FormGroup<ExperienceControls>>>();
  add = output<void>();
  remove = output<number>();
}
