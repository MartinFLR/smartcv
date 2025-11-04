import {Component, computed, effect, inject, input, Signal, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TuiButton, TuiIcon, TuiTextfield} from '@taiga-ui/core';
import {
  CoverLetterControls,
  CoverLetterPayload, CvFormControls, CvFormShape,
  IaFormControls
} from '../../../../../../shared/types/types';
import {TuiButtonLoading, TuiChip, TuiCopy, TuiTextarea} from '@taiga-ui/kit';
import {TuiItemGroup} from '@taiga-ui/layout';
import {CvFormBuilderService} from '../../../../services/cv-form-builder/cv-form-builder.service';
import {DeliveryChannel, ToneLevel} from '../../../../../../shared/types/promptTypes';
import {CoverLetterService} from '../../../../services/cover-letter/cover-letter.service';
import {JsonPipe} from '@angular/common';
import {toSignal} from '@angular/core/rxjs-interop';
import {startWith} from 'rxjs';

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
    JsonPipe,

  ],
  templateUrl: './cover-letter-section.html',
  styleUrl: './cover-letter-section.css',
})
export class CoverLetterSection {
  cvForm = input.required<FormGroup<CvFormControls>>()
  iaForm = input.required<FormGroup<IaFormControls>>();

  cvFormBuilderService = inject(CvFormBuilderService)
  coverLetterService = inject(CoverLetterService)
  protected coverLetterForm: FormGroup<CoverLetterControls>;

  generatedLetter = signal('');
  savedRecruiterName = signal('')
  savedReferralName = signal('')

  isLoading = signal(false);

  protected toneValue: Signal<number | undefined>;
  protected deliveryChannelValue: Signal<number | undefined>;

  constructor() {
    this.coverLetterForm = this.cvFormBuilderService.buildCoverLetterForm();

    const toneControl = this.coverLetterForm.controls.tone as FormControl<number>;
    const deliveryChannelControl = this.coverLetterForm.controls.deliveryChannel as FormControl<number>;
    const recruiterNameControl = this.coverLetterForm.controls.recruiterName;
    const referralNameControl = this.coverLetterForm.controls.referralName;

    this.toneValue = toSignal(
      toneControl.valueChanges.pipe(startWith(toneControl.value))
    );
    this.deliveryChannelValue = toSignal(
      deliveryChannelControl.valueChanges.pipe(startWith(deliveryChannelControl.value))
    );

    effect(() => {
      if (this.isApplicationForm()) {
        this.savedRecruiterName.set(recruiterNameControl.value ?? '');
        recruiterNameControl.setValue('');
        recruiterNameControl.disable({ emitEvent: false });
      } else {
        recruiterNameControl.enable({ emitEvent: false });
        recruiterNameControl.setValue(this.savedRecruiterName());
      }
    });

    effect(() => {
      if (this.isInternalReference()) {
        referralNameControl.enable({ emitEvent: false });
        referralNameControl.setValue(this.savedReferralName());
      } else {
        this.savedReferralName.set(referralNameControl.value ?? '');
        referralNameControl.setValue('');
        referralNameControl.disable({ emitEvent: false });
      }
    });
  }

  isApplicationForm = computed(() => {
    const channel = this.deliveryChannelValue() ?? 0;
    return this.detectDeliveryChannel(channel) === 'applicationForm';
  });

  isInternalReference = computed(() => {
    const channel = this.deliveryChannelValue() ?? 0;
    return this.detectDeliveryChannel(channel) === 'internalReferral';
  });


  tones = [
    {
      name: 'Formal',
      value: 0,
      icon: 'briefcase'
    },
    {
      name: 'Entusiasta',
      value: 1,
      icon: '@tui.sparkles'
    },
    {
      name: 'Casual',
      value: 2,
      icon: '@tui.coffee'
    },
    {
      name: 'Neutral',
      value: 3,
      icon: '@tui.align-justify'
    },
    {
      name: 'Confidente',
      value: 4,
      icon: '@tui.shield'
    }
  ];
  channelDeliverys = [
    {
      name: 'Mensaje en LinkedIn',
      value: 0,
      icon: 'linkedin',
    },
    {
      name: 'Correo electrónico',
      value: 1,
      icon: 'mail',
    },
    {
      name: 'Formulario de postulación',
      value: 2,
      icon: 'file-text',
    },
    {
      name: 'Referente interno',
      value: 3,
      icon: 'users',
    },
  ];


  generateCoverLetter(): void {
    this.isLoading.set(true);
    this.generatedLetter.set('')
    const rawCv: CvFormShape = this.cvForm().getRawValue() as CvFormShape;
    const tone = this.detectTone(this.coverLetterForm.getRawValue().tone ?? 0);
    const deliveryChannel = this.detectDeliveryChannel(this.coverLetterForm.getRawValue().deliveryChannel ?? 0);

    const payload: CoverLetterPayload = {
      baseCv: rawCv,
      jobDesc: this.iaForm().getRawValue().jobDescription ?? '',
      promptOption: {
        type: 'coverLetter',
        recruiterName: this.coverLetterForm.getRawValue().recruiterName ?? '',
        companyName: this.coverLetterForm.getRawValue().companyName ?? '',
        referralName: this.coverLetterForm.getRawValue().referralName ?? '',
        tone: tone,
        deliveryChannel: deliveryChannel,
      }
    };

    console.log(payload)

    this.coverLetterService.generateCoverLetterStream(payload).subscribe({
      next: (chunk: string) => {
        this.generatedLetter.update(currentValue => currentValue + chunk);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
        this.generatedLetter.set('Error al generar la carta.');
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }




  private detectTone(num: number): ToneLevel {
    switch (num) {
      case 0: return 'formal';
      case 1: return 'enthusiast';
      case 2: return 'casual';
      case 3: return 'neutral';
      case 4: return 'confident';
      default: return 'formal';
    }
  }

  private detectDeliveryChannel(num: number): DeliveryChannel {
    switch (num) {
      case 0: return 'linkedinMessage';
      case 1: return 'email';
      case 2: return 'applicationForm';
      case 3: return 'internalReferral';
      default: return 'linkedinMessage';
    }
  }

}
