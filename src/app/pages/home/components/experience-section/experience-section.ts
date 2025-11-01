import {Component, input, output} from '@angular/core';
import {ExperienceControls} from '../../../../../../shared/types/types';
import {FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TuiButton, TuiIcon, TuiTextfield} from '@taiga-ui/core';
import {TuiRipple} from '@taiga-ui/addon-mobile';
import {TuiTextarea} from '@taiga-ui/kit';

@Component({
  selector: 'app-experience-section',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiRipple,
    TuiIcon,
    TuiTextfield,
    TuiTextarea
  ],
  templateUrl: './experience-section.html',
  styleUrl: './experience-section.css',
})
export class ExperienceSection {
  experienceForms = input.required<FormArray<FormGroup<ExperienceControls>>>();
  add = output<void>();
  remove = output<number>();
}
