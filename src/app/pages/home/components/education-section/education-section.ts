import {Component, inject, input, output} from '@angular/core';
import {ControlContainer, FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {EducationControls} from '../../../../../../shared/types/types';
import {TuiButton, TuiTextfield} from '@taiga-ui/core';
import {TuiTextarea} from '@taiga-ui/kit';
import {TuiRipple} from '@taiga-ui/addon-mobile';

@Component({
  selector: 'app-education-section',
  imports: [
    TuiTextfield,
    TuiTextarea,
    ReactiveFormsModule,
    TuiButton,
    TuiRipple
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, {skipSelf: true})
    }
  ],
  templateUrl: './education-section.html',
  styleUrl: './education-section.css',
})
export class EducationSection {
  educationForms = input.required<FormArray<FormGroup<EducationControls>>>();
  add = output<void>();
  remove = output<number>();
}
