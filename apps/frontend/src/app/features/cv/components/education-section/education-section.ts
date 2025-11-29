import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { TuiTextarea } from '@taiga-ui/kit';
import { TuiRipple } from '@taiga-ui/addon-mobile';
import { TranslocoDirective } from '@jsverse/transloco';
import { EducationService } from './education-service/education.service';
import { TuiAccordion } from '@taiga-ui/experimental';

@Component({
  selector: 'app-education-section',
  imports: [
    TuiTextfield,
    TuiTextarea,
    ReactiveFormsModule,
    TuiButton,
    TuiRipple,
    TranslocoDirective,
    TuiIcon,
    TuiAccordion,
  ],
  templateUrl: './education-section.html',
})
export class EducationSection {
  protected readonly service = inject(EducationService);
}
