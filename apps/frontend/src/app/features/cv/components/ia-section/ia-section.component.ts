import { Component, computed, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { TuiBadge, TuiButtonLoading, TuiSlider, TuiTextarea } from '@taiga-ui/kit';
import { KeyValuePipe } from '@angular/common';
import { ExaggerationLevelPipe } from '../../../../shared/pipes/exaggeration-pipe';
import { TranslocoDirective, TranslocoPipe } from '@jsverse/transloco';
import { IaSectionService } from './ia-service/ia-section.service';

@Component({
  selector: 'app-ia-section',
  imports: [
    ReactiveFormsModule,
    TuiTextfield,
    TuiTextarea,
    TuiSlider,
    KeyValuePipe,
    ExaggerationLevelPipe,
    TuiButton,
    TuiButtonLoading,
    TranslocoDirective,
    TranslocoPipe,
    TuiIcon,
    TuiBadge,
  ],
  templateUrl: './ia-section.component.html',
})
export class IaSection {
  protected readonly service = inject(IaSectionService);

  protected readonly max = 2;
  protected readonly min = 0;
  protected readonly step = 1;
  protected readonly segments = computed(() => this.max - this.min);

  protected readonly exaggerationLevel: Record<number, string> = {
    0: 'cv.ia.exaggeration.level.low.name',
    1: 'cv.ia.exaggeration.level.medium.name',
    2: 'cv.ia.exaggeration.level.high.name',
  };

  protected readonly exaggerationDescriptions: Record<number, string> = {
    0: 'cv.ia.exaggeration.level.low.description',
    1: 'cv.ia.exaggeration.level.medium.description',
    2: 'cv.ia.exaggeration.level.high.description',
  };
}
