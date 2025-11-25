import { computed, inject, Injectable, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TuiAlertService } from '@taiga-ui/core';
import { TuiLanguageSwitcherService } from '@taiga-ui/i18n/utils';
import { TuiFileLike } from '@taiga-ui/kit';
import { Observable, Subject, of, switchMap } from 'rxjs';
import { BuildPromptOptions, CvAtsResponse, SectionAnalysis } from '@smartcv/types';
import { CvStateService } from '../../../services/cv-form/cv-form-state/cv-state.service';
import { AtsApiService } from '../api/ats-api.service';

type SectionKey = keyof CvAtsResponse['sectionScores'];
export interface DisplayableSection {
  name: SectionKey;
  score: number;
  analysis: SectionAnalysis;
}

@Injectable({
  providedIn: 'root',
})
export class AtsAnalyzerService {
  private readonly apiService = inject(AtsApiService);
  private readonly alerts = inject(TuiAlertService);
  private readonly state = inject(CvStateService);
  private readonly switcher = inject(TuiLanguageSwitcherService);

  public readonly fileControl = new FormControl<TuiFileLike | null>(null, Validators.required);

  public readonly cvFile = signal<TuiFileLike | null>(null);
  public readonly isLoading = this.apiService.isLoading;
  public readonly response = this.apiService.response;

  public readonly failedFiles$ = new Subject<TuiFileLike | null>();
  public readonly loadingFiles$ = new Subject<TuiFileLike | null>();
  public readonly loadedFiles$ = this.fileControl.valueChanges.pipe(
    switchMap((file) => this.processFile(file)),
  );

  public readonly score = computed(() => this.response()?.matchScore ?? null);

  public readonly scoreColor = computed(() => {
    const s = this.score();
    if (s === null) return 'var(--tui-support-08)';
    if (s < 50) return 'var(--tui-status-negative)';
    if (s < 80) return 'var(--tui-status-warning)';
    return 'var(--tui-status-positive)';
  });

  public readonly scoreText = computed(() => {
    const s = this.score();
    return s === null ? '--' : s.toFixed(0);
  });

  public readonly fitLevel = computed(() => this.response()?.fitLevel);

  public readonly fitLevelColor = computed(() => {
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

  public readonly matchedKeywords = computed(() => this.response()?.matchedKeywords ?? []);
  public readonly missingKeywords = computed(() => this.response()?.missingKeywords ?? []);
  public readonly recommendations = computed(() => this.response()?.recommendations ?? []);
  public readonly warnings = computed(() => this.response()?.warnings ?? []);
  public readonly generalText = computed(() => this.response()?.text);

  public readonly analyzedSections = computed<DisplayableSection[]>(() => {
    const sectionsObj = this.response()?.sections;
    const scoresObj = this.response()?.sectionScores;

    if (!sectionsObj || !scoresObj) return [];

    return Object.keys(scoresObj)
      .map((key) => {
        const sectionName = key as SectionKey;
        const score = scoresObj[sectionName];
        const analysis = sectionsObj[sectionName];

        if (score == null || analysis == null) return null;

        return { name: sectionName, score, analysis };
      })
      .filter((val): val is DisplayableSection => val != null);
  });

  public get iaForm() {
    return this.state.iaForm;
  }

  public calculateAtsScore(): void {
    const file = this.cvFile();
    const jobDesc = this.iaForm.getRawValue().jobDescription ?? '';

    if (!file) {
      this.alerts
        .open('Por favor, subí tu CV en formato PDF para continuar.', {
          label: 'Archivo Faltante',
          appearance: 'warning',
        })
        .subscribe();
      return;
    }

    const promptOption = {
      lang: this.switcher.language,
      type: 'ats',
    } as BuildPromptOptions;

    const formData = new FormData();
    formData.append('file', file as File, file.name);
    formData.append('jobDesc', jobDesc);
    formData.append('promptOption', JSON.stringify(promptOption));

    this.apiService.getAtsScore(formData).subscribe({
      next: (response) => console.log('ATS Score calculado', response),
      error: (err) => {
        console.error('Error ATS:', err);
        this.alerts
          .open('Hubo un error al analizar tu CV. Intenta de nuevo.', {
            label: 'Error de API',
            appearance: 'error',
          })
          .subscribe();
      },
    });
  }

  public removeFile(): void {
    this.fileControl.setValue(null);
    this.cvFile.set(null);
  }

  private processFile(file: TuiFileLike | null): Observable<TuiFileLike | null> {
    this.failedFiles$.next(null);
    this.cvFile.set(null);

    if (this.fileControl.invalid || !file) {
      this.loadingFiles$.next(null);
      return of(null);
    }

    this.loadingFiles$.next(file);

    if (file.type !== 'application/pdf') {
      console.error('El archivo no es PDF:', file.type);
      this.failedFiles$.next(file);
      this.loadingFiles$.next(null);
      return of(null);
    }

    this.cvFile.set(file);
    this.loadingFiles$.next(null);
    return of(file);
  }
}
