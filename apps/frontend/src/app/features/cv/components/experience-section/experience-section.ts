import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiRipple } from '@taiga-ui/addon-mobile';
import { TuiTextarea } from '@taiga-ui/kit';
import { TuiCardLarge } from '@taiga-ui/layout';
import { TranslocoDirective } from '@jsverse/transloco';
import { ExperienceService } from './experience-service/experience.service';

@Component({
  selector: 'app-experience-section',
  imports: [
    ReactiveFormsModule,
    TuiButton,
    TuiRipple,
    TuiTextfield,
    TuiTextarea,
    TuiCardLarge,
    TranslocoDirective,
  ],
  templateUrl: './experience-section.html',
})
export class ExperienceSection {
  protected readonly service = inject(ExperienceService);
}
