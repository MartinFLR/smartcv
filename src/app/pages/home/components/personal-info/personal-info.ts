import { Component, inject, input } from '@angular/core';
import { TuiCountryIsoCode } from '@taiga-ui/i18n';
import {
  ControlContainer,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiTextfield } from '@taiga-ui/core';
import { TuiInputPhoneInternational } from '@taiga-ui/experimental';
import {
  tuiInputPhoneInternationalOptionsProvider,
  TuiTextarea,
} from '@taiga-ui/kit';
import { defer } from 'rxjs';
import { PersonalInfoControls } from '../../../../../../shared/types/Controls';

@Component({
  selector: 'app-personal-info',
  imports: [
    ReactiveFormsModule,
    TuiTextfield,
    TuiInputPhoneInternational,
    TuiTextarea,
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  providers: [
    tuiInputPhoneInternationalOptionsProvider({
      metadata: defer(async () =>
        import('libphonenumber-js/max/metadata').then((m) => m.default),
      ),
    }),
  ],
  templateUrl: './personal-info.html',
})
export class PersonalInfo {
  personalInfoGroup = input.required<FormGroup<PersonalInfoControls>>();

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
