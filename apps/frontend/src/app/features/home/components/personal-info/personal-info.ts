import { Component, input } from '@angular/core';
import { TuiCountryIsoCode } from '@taiga-ui/i18n';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfield } from '@taiga-ui/core';
import { TuiInputPhoneInternational } from '@taiga-ui/experimental';
import { TuiTextarea } from '@taiga-ui/kit';
import { PersonalInfoControls } from '../../../../core/models/controls.model';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-personal-info',
  imports: [
    ReactiveFormsModule,
    TuiTextfield,
    TuiTextarea,
    TuiInputPhoneInternational,
    TranslocoDirective,
  ],
  providers: [],
  templateUrl: './personal-info.html',
})
export class PersonalInfo {
  personalInfo = input.required<FormGroup<PersonalInfoControls>>();

  protected readonly countries: readonly TuiCountryIsoCode[] = [
    'AR',
    'BO',
    'CL',
    'CO',
    'CR',
    'CU',
    'DO',
    'EC',
    'ES',
    'GT',
    'HN',
    'MX',
    'NI',
    'PA',
    'PE',
    'PR',
    'PY',
    'SV',
    'US',
    'UY',
    'VE',
  ];
}
