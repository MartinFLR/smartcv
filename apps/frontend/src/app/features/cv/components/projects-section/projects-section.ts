import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { TuiRipple } from '@taiga-ui/addon-mobile';
import { TuiTextarea } from '@taiga-ui/kit';
import { TranslocoDirective } from '@jsverse/transloco';
import { ProjectsService } from './projects-service/projects.service';
import { TuiAccordion } from '@taiga-ui/experimental';

@Component({
  selector: 'app-projects-section',
  imports: [
    TuiButton,
    TuiRipple,
    ReactiveFormsModule,
    TuiTextfield,
    TuiTextarea,
    TranslocoDirective,
    TuiAccordion,
    TuiIcon,
  ],
  templateUrl: './projects-section.html',
})
export class ProjectsSection {
  protected readonly service = inject(ProjectsService);
}
