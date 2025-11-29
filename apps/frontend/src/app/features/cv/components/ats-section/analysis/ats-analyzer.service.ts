import { computed, inject, Injectable, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TuiLanguageSwitcherService } from '@taiga-ui/i18n/utils';
import { TuiFileLike } from '@taiga-ui/kit';
import { Observable, Subject, of, switchMap } from 'rxjs';
import { BuildPromptOptions, CvAtsResponse, SectionAnalysis } from '@smartcv/types';
import { CvStateService } from '../../../services/cv-form/cv-form-state/cv-state.service';
import { AtsApiService } from '../api/ats-api.service';
import { TaigaAlertsService } from '../../../../../core/services/alerts/taiga-alerts.service';

type SectionKey = keyof CvAtsResponse['sectionScores'];

export interface DisplayableSection {
  name: SectionKey;
  translationKey: string;
  score: number;
  analysis: SectionAnalysis;
}

@Injectable({
  providedIn: 'root',
})
export class AtsAnalyzerService {
  private readonly apiService = inject(AtsApiService);
  private readonly state = inject(CvStateService);
  private readonly switcher = inject(TuiLanguageSwitcherService);
  private readonly taigaAlerts = inject(TaigaAlertsService);

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

  public readonly scoreText = computed(() => {
    const s = this.score();
    return s === null ? '--' : s.toFixed(0);
  });

  public readonly fitLevel = computed(() => this.response()?.fitLevel);

  public readonly fitLevelTranslationKey = computed<string>(() => {
    const level = this.fitLevel();
    const s = this.score();
    if (!level && s === null) return 'cv.ats.points.level.placeholder';

    switch (level) {
      case 'Low':
        return 'cv.ats.points.level.low.name';
      case 'Medium':
        return 'cv.ats.points.level.medium.name';
      case 'High':
        return 'cv.ats.points.level.high.name';
      default:
        if ((s ?? 0) < 50) return 'cv.ats.points.level.low.name';
        if ((s ?? 0) < 80) return 'cv.ats.points.level.medium.name';
        return 'cv.ats.points.level.high.name';
    }
  });

  public readonly fitLevelColor = computed(() => {
    const level = this.fitLevel();
    const s = this.score();

    if (!level && s === null) return 'var(--tui-support-08)';

    const scoreVal = s ?? 0;

    if (level === 'Low' || scoreVal < 50) return 'var(--tui-status-negative)';
    if (level === 'Medium' || scoreVal < 80) return 'var(--tui-status-warning)';
    if (level === 'High' || scoreVal >= 80) return 'var(--tui-status-positive)';

    return 'var(--tui-support-08)';
  });

  public readonly fitLevelTextColor = computed(() => {
    const level = this.fitLevel();
    const s = this.score() ?? 0;
    if (level === 'Medium' || (s >= 50 && s < 80)) {
      return 'var(--tui-text-primary)';
    }
    return 'var(--tui-text-primary-on-accent)';
  });

  public readonly scoreColor = this.fitLevelColor;

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

        const translationKey = `cv.ats.sections.${sectionName}.name`;

        return {
          name: sectionName,
          translationKey,
          score,
          analysis,
        };
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
      this.taigaAlerts.showWarning('alerts.ats.errors.pdf_format').subscribe();
      return;
    }
    if (!jobDesc) {
      this.taigaAlerts.showWarning('alerts.ats.errors.no_jobDescription').subscribe();
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
        console.error(err);
        this.taigaAlerts.showError('alerts.ats.errors.analysis_failed').subscribe();
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
      this.taigaAlerts.showWarning('alerts.ats.errors.pdf_format').subscribe();
      this.failedFiles$.next(file);
      this.loadingFiles$.next(null);
      return of(null);
    }

    this.cvFile.set(file);
    this.loadingFiles$.next(null);
    return of(file);
  }
}
