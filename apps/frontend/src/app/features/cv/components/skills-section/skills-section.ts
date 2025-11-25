import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiInputChip } from '@taiga-ui/kit';
import { TuiRipple } from '@taiga-ui/addon-mobile';
import { TuiCard } from '@taiga-ui/layout';
import { TranslocoDirective } from '@jsverse/transloco';
import { SkillsService } from './skills-service/skills.service';

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
  protected readonly service = inject(SkillsService);
}
