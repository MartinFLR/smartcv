import {Component, input, output} from '@angular/core';
import {FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ProjectControls} from '../../../../../../shared/types/types';
import {TuiButton, TuiIcon, TuiTextfield} from '@taiga-ui/core';
import {TuiRipple} from '@taiga-ui/addon-mobile';
import {TuiTextarea} from '@taiga-ui/kit';

@Component({
  selector: 'app-projects-section',
  imports: [
    TuiIcon,
    TuiButton,
    TuiRipple,
    ReactiveFormsModule,
    TuiTextfield,
    TuiTextarea
  ],
  templateUrl: './projects-section.html',
  styleUrl: './projects-section.css',
})
export class ProjectsSection {
  projectForms = input.required<FormArray<FormGroup<ProjectControls>>>();
  add = output<void>();
  remove = output<number>();
}
