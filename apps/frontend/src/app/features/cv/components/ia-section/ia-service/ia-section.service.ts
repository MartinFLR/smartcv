import { inject, Injectable } from '@angular/core';
import { CvForm } from '@smartcv/types';
import { finalize, map, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CvFormManagerService } from '../../../services/cv-form/cv-form-manager/cv-form-manager.service';
import { CvFormDataService } from '../../../services/cv-form/cv-form-data/cv-form-data.service';
import { CvStateService } from '../../../services/cv-form/cv-form-state/cv-state.service';
import { TaigaAlertsService } from '../../../../../core/services/alerts/taiga-alerts.service';

@Injectable({
  providedIn: 'root',
})
export class IaSectionService {
  private readonly state = inject(CvStateService);
  private readonly dataService = inject(CvFormDataService);
  private readonly formManager = inject(CvFormManagerService);
  private readonly taigaAlerts = inject(TaigaAlertsService);

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
      this.taigaAlerts.showWarning('alerts.ats.errors.no_jobDescription').subscribe();
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
          this.taigaAlerts.showSuccess('alerts.ia.success.cv_optimized').subscribe();
        },
        error: (err) => {
          console.error(err);
          this.taigaAlerts.showError('API Error').subscribe();
        },
      });
  }
}
