import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { TuiInputChip } from '@taiga-ui/kit';
import { TuiRipple } from '@taiga-ui/addon-mobile';
import { TranslocoDirective } from '@jsverse/transloco';
import { SkillsService } from './skills-service/skills.service';
import { TuiAccordion } from '@taiga-ui/experimental';

@Component({
  selector: 'app-skills-section',
  imports: [
    TuiTextfield,
    ReactiveFormsModule,
    TuiInputChip,
    TuiButton,
    TuiRipple,
    TranslocoDirective,
    TuiIcon,
    TuiAccordion,
  ],
  templateUrl: './skills-section.html',
})
export class SkillsSection {
  protected readonly service = inject(SkillsService);
}
