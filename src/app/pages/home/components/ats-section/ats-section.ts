import {Component, computed, inject, input, signal, Signal} from '@angular/core';
import {
  TuiAlertService,
  TuiButton,
  TuiHint,
  TuiLabel,
  TuiNotification,
  TuiTextfieldComponent
} from '@taiga-ui/core';
import {
  TuiButtonLoading,
  TuiChip,
  TuiFile,
  TuiFileLike, TuiFileRejectedPipe,
  TuiFiles, TuiFilesComponent, TuiInputFilesDirective,
  TuiProgress, TuiTextarea
} from '@taiga-ui/kit';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {IaFormControls} from '../../../../../../shared/types/Controls';
import {CvAtsPayload, CvAtsResponse, SectionScoreItem} from '../../../../../../shared/types/AtsTypes';
import {AtsSectionService} from './ats-service/ats-section.service';
import {TuiItemGroup} from '@taiga-ui/layout';
import {AsyncPipe, TitleCasePipe} from '@angular/common';
import {catchError, finalize, map, Observable, of, Subject, switchMap, tap, timer} from 'rxjs';

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
  ],
  templateUrl: './ats-section.html',
  styleUrl: './ats-section.css',
})
export class ATSSection {
  iaForm = input.required<FormGroup<IaFormControls>>();

  private atsService = inject(AtsSectionService);
  private alerts = inject(TuiAlertService);

  isLoading = signal<boolean>(false);
  response = signal<CvAtsResponse | null>(null);

  protected readonly control = new FormControl<TuiFileLike | null>(
    null,
    Validators.required,
  );

  protected readonly failedFiles$ = new Subject<TuiFileLike | null>();
  protected readonly loadingFiles$ = new Subject<TuiFileLike | null>();

  protected cvFileBuffer = signal<string | ArrayBuffer | null>(null);

  protected readonly loadedFiles$ = this.control.valueChanges.pipe(
    switchMap((file) => this.processFile(file)),
  );

  protected removeFile(): void {
    this.control.setValue(null);
  }

  private processFile(file: TuiFileLike | null): Observable<TuiFileLike | null> {

    queueMicrotask(() => {
      this.failedFiles$.next(null);
      this.cvFileBuffer.set(null);
    });

    if (this.control.invalid || !file) {
      return of(null);
    }

    queueMicrotask(() => {
      this.loadingFiles$.next(file);
    });

    // El resto de tu lógica de FileReader...
    return new Observable<ArrayBuffer>(subscriber => {
      if (file.type !== 'application/pdf') {
        subscriber.error(new Error('El archivo no es PDF'));
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        subscriber.next(e.target?.result as ArrayBuffer);
        subscriber.complete();
      };
      reader.onerror = (e) => {
        subscriber.error(e.target?.error ?? new Error('Error al leer el archivo'));
      };
      reader.readAsArrayBuffer(file as File);
    }).pipe(
      tap(buffer => {
        this.cvFileBuffer.set(buffer);
      }),
      map(() => file),
      catchError(error => {
        console.error(error);
        this.failedFiles$.next(file);
        return of(null);
      }),
      finalize(() => {
        this.loadingFiles$.next(null);
      })
    );
  }
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
      case 'Low': return 'var(--tui-status-negative)';
      case 'Medium': return 'var(--tui-status-warning)';
      case 'High': return 'var(--tui-status-positive)';
      default: return 'var(--tui-support-08)';
    }
  });

  protected matchedKeywords = computed(() => this.response()?.matchedKeywords ?? []);
  protected missingKeywords = computed(() => this.response()?.missingKeywords ?? []);
  protected recommendations = computed(() => this.response()?.recommendations ?? []);
  protected warnings = computed(() => this.response()?.warnings ?? []);

  protected sectionScores: Signal<SectionScoreItem[]> = computed(() => {
    const scores = this.response()?.sectionScores;
    if (!scores) return [];
    return Object.entries(scores)
      .filter(([, value]) => value !== undefined && value !== null) as SectionScoreItem[];
  });


  calculateAtsScore(): void {
    const fileBuffer = this.cvFileBuffer();
    const jobDesc = this.iaForm().getRawValue().jobDescription ?? '';

    if (!fileBuffer) {
      this.alerts.open('Por favor, subí tu CV en formato PDF para continuar.', {
        label: 'Archivo Faltante',
        appearance: 'warning' // 'status' es la prop correcta para TuiAlert
      }).subscribe();
      return;
    }

    this.isLoading.set(true);
    this.response.set(null);

    const payload: CvAtsPayload = {
      file: fileBuffer,
      jobDesc: jobDesc,
    };

    this.atsService.getAtsScore(payload).subscribe({
      next: (response: CvAtsResponse) => {
        this.response.set(response);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al calcular puntaje ATS:', err);
        this.alerts.open('Hubo un error al analizar tu CV. Intenta de nuevo.', {
          label: 'Error de API',
          appearance: 'error'
        }).subscribe();
        this.isLoading.set(false);
        this.response.set(null);
      },
    });
  }
}
