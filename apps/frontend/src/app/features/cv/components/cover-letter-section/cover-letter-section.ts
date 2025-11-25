import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { TuiButtonLoading, TuiChip, TuiCopy, TuiTextarea } from '@taiga-ui/kit';
import { TuiCardLarge, TuiItemGroup } from '@taiga-ui/layout';
import { CoverAnalysisService } from './analysis/cover-analysis.service';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-cover-letter-section',
  imports: [
    TuiTextfield,
    ReactiveFormsModule,
    TuiTextarea,
    TuiIcon,
    TuiCopy,
    TuiChip,
    TuiItemGroup,
    TuiButton,
    TuiButtonLoading,
    TuiCardLarge,
    TranslocoDirective,
  ],
  templateUrl: './cover-letter-section.html',
})
export class CoverLetterSection {
  protected readonly service = inject(CoverAnalysisService);

  protected readonly tones = [
    { name: 'Formal', value: 0, icon: 'briefcase' },
    { name: 'Entusiasta', value: 1, icon: '@tui.sparkles' },
    { name: 'Casual', value: 2, icon: '@tui.coffee' },
    { name: 'Neutral', value: 3, icon: '@tui.align-justify' },
    { name: 'Confidente', value: 4, icon: '@tui.shield' },
  ];

  protected readonly channelDeliverys = [
    { name: 'Mensaje en LinkedIn', value: 0, icon: 'linkedin' },
    { name: 'Correo electrónico', value: 1, icon: 'mail' },
    { name: 'Formulario de postulación', value: 2, icon: 'file-text' },
    { name: 'Referente interno', value: 3, icon: 'users' },
  ];
}
