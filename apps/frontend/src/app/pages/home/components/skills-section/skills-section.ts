import { Component, inject, input, output } from '@angular/core';
import { ControlContainer, FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { TuiInputChip } from '@taiga-ui/kit';
import { TuiRipple } from '@taiga-ui/addon-mobile';
import { CertificationControls, SkillsControls } from '../../../../../../types/Controls';
import { TuiCard } from '@taiga-ui/layout';

@Component({
  selector: 'app-skills-section',
  imports: [
    TuiTextfield,
    ReactiveFormsModule,
    TuiInputChip,
    TuiButton,
    TuiRipple,
    TuiIcon,
    TuiCard,
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
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
