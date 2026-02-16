import { Component, inject } from '@angular/core';
import { TuiCountryIsoCode } from '@taiga-ui/i18n';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiIcon, TuiTextfield, TuiButton, TuiLabel } from '@taiga-ui/core';
import { TuiInputPhoneInternational } from '@taiga-ui/experimental';
import {
  TuiTextarea,
  TuiAvatar,
  TuiFiles,
  TuiInputFilesDirective,
  TuiInputFiles,
} from '@taiga-ui/kit';
import { TranslocoDirective } from '@jsverse/transloco';
import { CvStateService } from '../../services/cv-form/cv-form-state/cv-state.service';

@Component({
  selector: 'app-personal-section',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TuiTextfield,
    TuiTextarea,
    TuiInputPhoneInternational,
    TranslocoDirective,
    TuiIcon,
    TuiAvatar,
    TuiFiles,
    TuiInputFiles,
    TuiInputFilesDirective,
    TuiButton,
    TuiLabel,
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

  onFileSelected(file: File | null): void {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      this.personalInfo.controls.photo.setValue(base64);
      this.personalInfo.markAsDirty();
    };
    reader.readAsDataURL(file);
  }

  removePhoto(): void {
    this.personalInfo.controls.photo.setValue(null);
    this.personalInfo.markAsDirty();
  }
}
