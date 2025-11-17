import { Component, computed, inject, input, signal, Signal } from '@angular/core';
import {
  TuiAlertService,
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
  TuiFileLike,
  TuiFileRejectedPipe,
  TuiFiles,
  TuiFilesComponent,
  TuiInputFilesDirective,
  TuiProgress,
  TuiTextarea,
} from '@taiga-ui/kit';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IaFormControls } from '../../../../core/models/controls.model';
import { CvAtsResponse, SectionAnalysis } from '@smartcv/types';
import { AtsSectionService } from '../../services/ats-service/ats-section.service';
import { TuiCardLarge, TuiItemGroup } from '@taiga-ui/layout';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Observable, of, Subject, switchMap } from 'rxjs';
import { BuildPromptOptions } from '@smartcv/types';
import { TuiLanguageSwitcherService } from '@taiga-ui/i18n/utils';

type SectionKey = keyof CvAtsResponse['sectionScores'];

interface DisplayableSection {
  name: SectionKey;
  score: number;
  analysis: SectionAnalysis;
}

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
  iaForm = input.required<FormGroup<IaFormControls>>();

  protected readonly switcher = inject(TuiLanguageSwitcherService);
  private atsService = inject(AtsSectionService);
  private alerts = inject(TuiAlertService);

  isLoading = this.atsService.isLoading;
  response = this.atsService.response;
  protected cvFile = signal<TuiFileLike | null>(null);

  protected readonly control = new FormControl<TuiFileLike | null>(null, Validators.required);

  score: Signal<number | null> = computed(() => this.response()?.matchScore ?? null);

  protected scoreColor: Signal<string> = computed(() => {
    const s = this.score();
    if (s === null) return 'var(--tui-support-08)';
    if (s < 50) return 'var(--tui-status-negative)';
    if (s < 80) return 'var(--tui-status-warning)';
    return 'var(--tui-status-positive)';
  });
  protected scoreText: Signal<string> = computed(() => {
    const s = this.score();
    if (s === null) return '--';
    return s.toFixed(0);
  });

  protected fitLevel = computed(() => this.response()?.fitLevel);
  protected fitLevelColor: Signal<string> = computed(() => {
    switch (this.fitLevel()) {
      case 'Low':
        return 'var(--tui-status-negative)';
      case 'Medium':
        return 'var(--tui-status-warning)';
      case 'High':
        return 'var(--tui-status-positive)';
      default:
        return 'var(--tui-support-08)';
    }
  });
  protected matchedKeywords = computed(() => this.response()?.matchedKeywords ?? []);
  protected missingKeywords = computed(() => this.response()?.missingKeywords ?? []);
  protected recommendations = computed(() => this.response()?.recommendations ?? []);
  protected warnings = computed(() => this.response()?.warnings ?? []);
  protected generalText = computed(() => this.response()?.text);
  protected analyzedSections: Signal<DisplayableSection[]> = computed(() => {
    const sectionsObj = this.response()?.sections;
    const scoresObj = this.response()?.sectionScores;

    if (!sectionsObj || !scoresObj) {
      return [];
    }

    return Object.keys(scoresObj)
      .map((key) => {
        const sectionName = key as keyof typeof scoresObj;
        const score = scoresObj[sectionName];
        const analysis = sectionsObj[sectionName];

        if (score == null || analysis == null) {
          return null;
        }

        return {
          name: sectionName,
          score: score,
          analysis: analysis,
        };
      })
      .filter((value): value is DisplayableSection => value != null);
  });

  calculateAtsScore(): void {
    const file = this.cvFile();
    const jobDesc = this.iaForm().getRawValue().jobDescription ?? '';
    const promptOption = {
      lang: this.switcher.language,
      type: 'ats',
    } as BuildPromptOptions;

    if (!file) {
      this.alerts
        .open('Por favor, subí tu CV en formato PDF para continuar.', {
          label: 'Archivo Faltante',
          appearance: 'warning',
        })
        .subscribe();
      return;
    }

    const formData = new FormData();

    formData.append('file', file as File, file.name);
    formData.append('jobDesc', jobDesc);
    formData.append('promptOption', JSON.stringify(promptOption));

    this.atsService.getAtsScore(formData).subscribe({
      next: (response: CvAtsResponse) => {
        console.log(response);
      },
      error: (err) => {
        console.error('Error al calcular puntaje ATS:', err);
        this.alerts
          .open('Hubo un error al analizar tu CV. Intenta de nuevo.', {
            label: 'Error de API',
            appearance: 'error',
          })
          .subscribe();
      },
    });
  }

  protected readonly failedFiles$ = new Subject<TuiFileLike | null>();
  protected readonly loadingFiles$ = new Subject<TuiFileLike | null>();
  protected readonly loadedFiles$ = this.control.valueChanges.pipe(
    switchMap((file) => this.processFile(file)),
  );

  protected removeFile(): void {
    this.control.setValue(null);
    this.cvFile.set(null);
  }

  private processFile(file: TuiFileLike | null): Observable<TuiFileLike | null> {
    this.failedFiles$.next(null);
    this.cvFile.set(null);

    if (this.control.invalid || !file) {
      this.loadingFiles$.next(null);
      return of(null);
    }

    queueMicrotask(() => {
      this.loadingFiles$.next(file);
    });

    if (file.type !== 'application/pdf') {
      console.error('El archivo no es PDF. Tipo detectado:', file.type);
      this.failedFiles$.next(file);
      this.loadingFiles$.next(null);
      return of(null);
    }

    this.cvFile.set(file);

    this.loadingFiles$.next(null);
    return of(file);
  }
}
