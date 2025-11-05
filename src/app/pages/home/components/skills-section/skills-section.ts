import {Component, inject, input, output} from '@angular/core';
import {ControlContainer, FormArray, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TuiButton, TuiIcon, TuiTextfield} from '@taiga-ui/core';
import {TuiInputChip} from '@taiga-ui/kit';
import {TuiRipple} from '@taiga-ui/addon-mobile';
import {CertificationControls, SkillsControls} from '../../../../../../shared/types/Controls';

@Component({
  selector: 'app-skills-section',
  imports: [
    TuiTextfield,
    ReactiveFormsModule,
    TuiInputChip,
    TuiButton,
    TuiRipple,
    TuiIcon
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, {skipSelf: true})
    }
  ],
  templateUrl: './skills-section.html',
})
export class SkillsSection {
  skillsForms = input.required<FormArray<FormGroup<SkillsControls>>>();

  // Salida para eventos
  addSkillGroup = output<void>();
  removeSkillGroup = output<number>();
  addCert = output<number>(); // Emite el índice del skillGroup
  removeCert = output<{ skillGroupIndex: number; certIndex: number }>();

  // Métodos helper para el template
  public getCertificationsArray(skillGroup: FormGroup): FormArray<FormGroup<CertificationControls>> {
    return skillGroup.get('certifications') as FormArray<FormGroup<CertificationControls>>;
  }

  public getCertificationControls(skillGroup: FormGroup): FormGroup<CertificationControls>[] {
    return this.getCertificationsArray(skillGroup).controls;
  }
}
