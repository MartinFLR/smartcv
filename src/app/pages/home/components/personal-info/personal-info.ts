import {Component, input} from '@angular/core';
import {PersonalInfoControls} from '../../../../../../shared/types/types';
import {TuiCountryIsoCode} from '@taiga-ui/i18n';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TuiTextfield} from '@taiga-ui/core';
import {TuiInputPhoneInternational} from '@taiga-ui/experimental';
import {TuiTextarea} from '@taiga-ui/kit';

@Component({
  selector: 'app-personal-info',
  imports: [
    ReactiveFormsModule,
    TuiTextfield,
    TuiInputPhoneInternational,
    TuiTextarea
  ],
  templateUrl: './personal-info.html',
  styleUrl: './personal-info.css',
})
export class PersonalInfo {
  personalInfoGroup = input.required<FormGroup<PersonalInfoControls>>();
  countries = input.required<readonly TuiCountryIsoCode[]>();
}
