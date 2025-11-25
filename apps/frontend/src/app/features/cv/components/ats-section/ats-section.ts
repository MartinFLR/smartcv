import { Component, inject } from '@angular/core';
import {
  TuiAppearance,
  TuiButton,
  TuiHint,
  TuiLabel,
  TuiNotification,
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
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { AtsAnalyzerService } from './analysis/ats-analyzer.service';

@Component({
  selector: 'app-ats-section',
  imports: [
    TuiHint,
    TuiProgress,
    TuiNotification,
    TuiChip,
    TuiItemGroup,
    TuiButton,
    TuiButtonLoading,
    TuiLabel,
    ReactiveFormsModule,
    TitleCasePipe,
    AsyncPipe,
    TuiFileRejectedPipe,
    TuiInputFilesDirective,
    TuiFilesComponent,
    TuiFile,
    TuiFiles,
    TuiTextarea,
    TuiTextfieldComponent,
    TuiCardLarge,
    TuiAppearance,
  ],
  templateUrl: './ats-section.html',
  styleUrl: './ats-section.css',
})
export class ATSSection {
  protected readonly service = inject(AtsAnalyzerService);
}
