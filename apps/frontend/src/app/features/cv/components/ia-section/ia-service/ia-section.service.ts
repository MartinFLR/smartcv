import { inject, Injectable } from '@angular/core';
import { CvForm } from '@smartcv/types';
import { finalize, map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { TuiAlertService } from '@taiga-ui/core';
import { CvFormManagerService } from '../../../services/cv-form/cv-form-manager/cv-form-manager-service';
import { CvFormDataService } from '../../../services/cv-form/cv-form-data/cv-form-data.service';
import { CvStateService } from '../../../services/cv-form/cv-form-state/cv-state.service';

@Injectable({
  providedIn: 'root',
})
export class IaSectionService {
  private readonly state = inject(CvStateService);
  private readonly dataService = inject(CvFormDataService);
  private readonly formManager = inject(CvFormManagerService);
  private readonly alerts = inject(TuiAlertService);

  public get form() {
    return this.state.iaForm;
  }
  public get isLoading() {
    return this.state.isLoading;
  }

  public readonly currentExaggeration = toSignal(
    this.form.controls.exaggeration.valueChanges.pipe(
      startWith(this.form.controls.exaggeration.value ?? 0),
      map((val) => val ?? 0),
    ),
    { initialValue: 0 },
  );

  public setExaggeration(value: number): void {
    this.form.controls.exaggeration.setValue(value);
  }

  public optimizeCv(): void {
    if (this.isLoading()) return;

    if (this.form.invalid) {
      this.showAlert('Falta la Job Description.', 'error');
      return;
    }

    this.state.isLoading.set(true);

    const rawIaForm = this.form.getRawValue();

    const baseCv =
      this.state.isCvLocked() && this.state.lockedCv()
        ? this.state.lockedCv()!
        : (this.state.cvForm.getRawValue() as CvForm);

    this.dataService
      .optimizeCv(
        baseCv,
        rawIaForm.jobDescription ?? '',
        rawIaForm.exaggeration ?? 0,
        // rawIaForm.makeEnglish
      )
      .pipe(finalize(() => this.state.isLoading.set(false)))
      .subscribe({
        next: (response) => {
          this.formManager.patchFormArrays(this.state.cvForm, response);

          this.state.cvForm.patchValue({
            personalInfo: {
              ...this.state.cvForm.value.personalInfo,
              profileSummary: response.profileSummary,
              job: response.job,
            },
          });

          this.dataService.saveCv(this.state.cvForm.getRawValue() as CvForm);

          this.showAlert('CV optimizado con IA. ¡Revisá los cambios!', 'success', 5000);
        },
        error: (err) => {
          console.error('Error de IA:', err);
          const message = err.message || 'Error al conectar con la IA.';
          this.showAlert(message, 'error', 7000);
        },
      });
  }

  private showAlert(message: string, appearance: 'success' | 'error', autoClose = 3000): void {
    this.alerts.open(message, { appearance, autoClose }).subscribe();
  }
}
