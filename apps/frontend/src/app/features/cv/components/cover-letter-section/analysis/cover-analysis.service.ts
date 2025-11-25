import { computed, effect, inject, Injectable, Signal, signal, untracked } from '@angular/core';
import { CoverLetterPayload, CvForm, DeliveryChannel, ToneLevel } from '@smartcv/types';
import { startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { CoverLetterControls } from '../../../../../core/models/controls.model';
import { CvStateService } from '../../../services/cv-form/cv-form-state/cv-state.service';
import { CvFormBuilderService } from '../../../services/cv-form/cv-form-builder/cv-form-builder.service';
import { CoverApiService } from '../api/cover-api.service';

@Injectable({
  providedIn: 'root',
})
export class CoverAnalysisService {
  private readonly fb = inject(CvFormBuilderService);
  private readonly apiService = inject(CoverApiService);
  private readonly state = inject(CvStateService);

  public readonly form: FormGroup<CoverLetterControls>;
  public readonly generatedLetter = signal('');
  public readonly isLoading = signal(false);

  protected toneValue: Signal<number | undefined>;
  protected deliveryChannelValue: Signal<number | undefined>;

  private savedRecruiterName = '';
  private savedReferralName = '';

  public readonly isApplicationForm = computed(() => {
    const channel = this.deliveryChannelValue() ?? 0;
    return this.detectDeliveryChannel(channel) === 'applicationForm';
  });

  public readonly isInternalReference = computed(() => {
    const channel = this.deliveryChannelValue() ?? 0;
    return this.detectDeliveryChannel(channel) === 'internalReferral';
  });

  public get iaForm() {
    return this.state.iaForm;
  }

  constructor() {
    this.form = this.fb.buildCoverLetterForm();

    const toneControl = this.form.controls.tone as FormControl<number>;
    const deliveryControl = this.form.controls.deliveryChannel as FormControl<number>;

    this.toneValue = toSignal(toneControl.valueChanges.pipe(startWith(toneControl.value)), {
      initialValue: 0,
    });
    this.deliveryChannelValue = toSignal(
      deliveryControl.valueChanges.pipe(startWith(deliveryControl.value)),
      { initialValue: 0 },
    );

    effect(() => {
      const recruiterControl = this.form.controls.recruiterName;
      const isAppForm = this.isApplicationForm();

      untracked(() => {
        if (isAppForm) {
          this.savedRecruiterName = recruiterControl.value ?? '';
          recruiterControl.setValue('');
          recruiterControl.disable({ emitEvent: false });
        } else {
          recruiterControl.enable({ emitEvent: false });
          if (!recruiterControl.value && this.savedRecruiterName) {
            recruiterControl.setValue(this.savedRecruiterName);
          }
        }
      });
    });

    effect(() => {
      const referralControl = this.form.controls.referralName;
      const isInternal = this.isInternalReference();

      untracked(() => {
        if (isInternal) {
          referralControl.enable({ emitEvent: false });
          if (!referralControl.value && this.savedReferralName) {
            referralControl.setValue(this.savedReferralName);
          }
        } else {
          this.savedReferralName = referralControl.value ?? '';
          referralControl.setValue('');
          referralControl.disable({ emitEvent: false });
        }
      });
    });
  }

  public generate(): void {
    this.isLoading.set(true);
    this.generatedLetter.set('');

    const rawCv = this.state.cvForm.getRawValue() as CvForm;
    const jobDesc = this.state.iaForm.getRawValue().jobDescription ?? '';
    const formData = this.form.getRawValue();

    const payload: CoverLetterPayload = {
      baseCv: rawCv,
      jobDesc: jobDesc,
      promptOption: {
        type: 'coverLetter',
        recruiterName: formData.recruiterName ?? '',
        companyName: formData.companyName ?? '',
        referralName: formData.referralName ?? '',
        tone: this.detectTone(formData.tone ?? 0),
        deliveryChannel: this.detectDeliveryChannel(formData.deliveryChannel ?? 0),
      },
    };

    this.apiService.generateCoverLetterStream(payload).subscribe({
      next: (chunk: string) => {
        this.generatedLetter.update((current) => current + chunk);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
        this.generatedLetter.set('Error al generar la carta. Intenta nuevamente.');
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  private detectTone(num: number): ToneLevel {
    const map: Record<number, ToneLevel> = {
      0: 'formal',
      1: 'enthusiast',
      2: 'casual',
      3: 'neutral',
      4: 'confident',
    };
    return map[num] ?? 'formal';
  }

  private detectDeliveryChannel(num: number): DeliveryChannel {
    const map: Record<number, DeliveryChannel> = {
      0: 'linkedinMessage',
      1: 'email',
      2: 'applicationForm',
      3: 'internalReferral',
    };
    return map[num] ?? 'linkedinMessage';
  }
}
