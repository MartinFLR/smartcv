import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { TuiRipple } from '@taiga-ui/addon-mobile';
import { TuiTextarea } from '@taiga-ui/kit';
import { TranslocoDirective } from '@jsverse/transloco';
import { ExperienceService } from './experience-service/experience.service';
import { TuiAccordion } from '@taiga-ui/experimental';

@Component({
  selector: 'app-experience-section',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiRipple,
    TuiTextfield,
    TuiTextarea,
    TranslocoDirective,
    TuiAccordion,
    TuiIcon,
  ],
  templateUrl: './experience-section.html',
})
export class ExperienceSection {
  protected readonly service = inject(ExperienceService);
}
