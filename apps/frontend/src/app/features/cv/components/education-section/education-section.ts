import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiTextarea } from '@taiga-ui/kit';
import { TuiRipple } from '@taiga-ui/addon-mobile';
import { TuiCard } from '@taiga-ui/layout';
import { TranslocoDirective } from '@jsverse/transloco';
import { EducationService } from './education-service/education.service';

@Component({
  selector: 'app-education-section',
  imports: [
    TuiTextfield,
    TuiTextarea,
    ReactiveFormsModule,
    TuiButton,
    TuiRipple,
    TuiCard,
    TranslocoDirective,
  ],
  templateUrl: './education-section.html',
})
export class EducationSection {
  protected readonly service = inject(EducationService);
}
