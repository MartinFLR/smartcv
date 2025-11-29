import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiIcon, TuiTextfield } from '@taiga-ui/core';
import { TuiButtonLoading, TuiChip, TuiCopy, TuiTextarea } from '@taiga-ui/kit';
import { TuiItemGroup } from '@taiga-ui/layout';
import { CoverAnalysisService } from './analysis/cover-analysis.service';
import { TranslocoDirective, TranslocoPipe } from '@jsverse/transloco';

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
    TranslocoDirective,
    TranslocoPipe,
  ],
  templateUrl: './cover-letter-section.html',
})
export class CoverLetterSection {
  protected readonly service = inject(CoverAnalysisService);

  protected readonly tones = [
    { name: 'cv.coverLetter.tone.formal.name', value: 0, icon: 'briefcase' },
    { name: 'cv.coverLetter.tone.enthusiast.name', value: 1, icon: '@tui.sparkles' },
    { name: 'cv.coverLetter.tone.casual.name', value: 2, icon: '@tui.coffee' },
    { name: 'cv.coverLetter.tone.neutral.name', value: 3, icon: '@tui.align-justify' },
    { name: 'cv.coverLetter.tone.confident.name', value: 4, icon: '@tui.shield' },
  ];

  protected readonly channelDeliverys = [
    { name: 'cv.coverLetter.deliveryChannel.linkedin.name', value: 0, icon: 'linkedin' },
    { name: 'cv.coverLetter.deliveryChannel.email.name', value: 1, icon: 'mail' },
    { name: 'cv.coverLetter.deliveryChannel.form.name', value: 2, icon: 'file-text' },
    { name: 'cv.coverLetter.deliveryChannel.referral.name', value: 3, icon: 'users' },
  ];
}
