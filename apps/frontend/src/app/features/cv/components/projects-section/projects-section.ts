import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiRipple } from '@taiga-ui/addon-mobile';
import { TuiTextarea } from '@taiga-ui/kit';
import { TuiCard } from '@taiga-ui/layout';
import { TranslocoDirective } from '@jsverse/transloco';
import { ProjectsService } from './projects-service/projects.service';

@Component({
  selector: 'app-projects-section',
  imports: [
    TuiButton,
    TuiRipple,
    ReactiveFormsModule,
    TuiTextfield,
    TuiTextarea,
    TuiCard,
    TranslocoDirective,
  ],
  templateUrl: './projects-section.html',
})
export class ProjectsSection {
  protected readonly service = inject(ProjectsService);
}
