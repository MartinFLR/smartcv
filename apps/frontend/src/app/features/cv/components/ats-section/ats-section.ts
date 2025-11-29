import { Component, inject } from '@angular/core';
import {
  TuiButton,
  TuiIcon,
  TuiLabel,
  TuiNotification,
  TuiSurface,
  TuiTextfieldComponent,
} from '@taiga-ui/core';
import {
  TuiButtonLoading,
  TuiChip,
  TuiFile,
  TuiFileRejectedPipe,
  TuiFiles,
  TuiFilesComponent,
  TuiInputFilesDirective,
  TuiProgress,
  TuiTextarea,
} from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiCardLarge, TuiItemGroup } from '@taiga-ui/layout';
import { AsyncPipe } from '@angular/common';
import { AtsAnalyzerService } from './analysis/ats-analyzer.service';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-ats-section',
  imports: [
    TuiProgress,
    TuiNotification,
    TuiChip,
    TuiItemGroup,
    TuiButton,
    TuiButtonLoading,
    TuiLabel,
    ReactiveFormsModule,
    AsyncPipe,
    TuiFileRejectedPipe,
    TuiInputFilesDirective,
    TuiFilesComponent,
    TuiFile,
    TuiFiles,
    TuiTextarea,
    TuiTextfieldComponent,
    TuiCardLarge,
    TuiIcon,
    TranslocoDirective,
    TuiSurface,
  ],
  templateUrl: './ats-section.html',
  styleUrl: './ats-section.css',
})
export class ATSSection {
  protected readonly service = inject(AtsAnalyzerService);
}
