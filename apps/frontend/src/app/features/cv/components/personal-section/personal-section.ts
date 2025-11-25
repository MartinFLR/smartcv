import { Component, inject } from '@angular/core';
import { TuiCountryIsoCode } from '@taiga-ui/i18n';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiTextfield } from '@taiga-ui/core';
import { TuiInputPhoneInternational } from '@taiga-ui/experimental';
import { TuiTextarea } from '@taiga-ui/kit';
import { TranslocoDirective } from '@jsverse/transloco';
import { CvStateService } from '../../services/cv-form/cv-form-state/cv-state.service';

@Component({
  selector: 'app-personal-section',
  imports: [
    ReactiveFormsModule,
    TuiTextfield,
    TuiTextarea,
    TuiInputPhoneInternational,
    TranslocoDirective,
  ],
  providers: [],
  templateUrl: './personal-section.html',
})
export class PersonalSection {
  readonly cvStateService = inject(CvStateService);
  personalInfo = this.cvStateService.personalInfoGroup;

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
