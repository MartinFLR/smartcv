import { Component, input, output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiInputChip } from '@taiga-ui/kit';
import { TuiRipple } from '@taiga-ui/addon-mobile';
import { CertificationControls, SkillsControls } from '../../../../core/models/controls.model';
import { TuiCard } from '@taiga-ui/layout';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-skills-section',
  imports: [
    TuiTextfield,
    ReactiveFormsModule,
    TuiInputChip,
    TuiButton,
    TuiRipple,
    TuiCard,
    TranslocoDirective,
  ],
  templateUrl: './skills-section.html',
})
export class SkillsSection {
  skillsForms = input.required<FormArray<FormGroup<SkillsControls>>>();

  addSkillGroup = output<void>();
  removeSkillGroup = output<number>();
  addCert = output<number>();
  removeCert = output<{ skillGroupIndex: number; certIndex: number }>();

  public getCertificationsArray(
    skillGroup: FormGroup,
  ): FormArray<FormGroup<CertificationControls>> {
    return skillGroup.get('certifications') as FormArray<FormGroup<CertificationControls>>;
  }

  public getCertificationControls(skillGroup: FormGroup): FormGroup<CertificationControls>[] {
    return this.getCertificationsArray(skillGroup).controls;
  }
}
