import { Component, inject } from '@angular/core';
import { TuiCountryIsoCode } from '@taiga-ui/i18n';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfield } from '@taiga-ui/core';
import { TuiInputPhoneInternational } from '@taiga-ui/experimental';
import { TuiTextarea } from '@taiga-ui/kit';

@Component({
  selector: 'app-personal-info',
  imports: [ReactiveFormsModule, TuiTextfield, TuiTextarea, TuiInputPhoneInternational],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  providers: [],
  templateUrl: './personal-info.html',
})
export class PersonalInfo {
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
