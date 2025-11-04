import {Component, inject, input, output, signal} from '@angular/core';
import {ControlContainer, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TuiButton, TuiIcon, TuiLoader, TuiTextfield} from '@taiga-ui/core';
import {
  CoverLetterControls,
  CoverLetterPayload, CvFormControls, CvFormShape,
  EducationControls,
  IaFormControls
} from '../../../../../../shared/types/types';
import {TuiButtonLoading, TuiChip, TuiCopy, TuiInputChip, TuiTextarea, TuiTextareaLimit} from '@taiga-ui/kit';
import {TuiItemGroup} from '@taiga-ui/layout';
import {CvFormBuilderService} from '../../../../services/cv-form-builder/cv-form-builder.service';
import {ToneLevel} from '../../../../../../shared/types/promptTypes';
import {CoverLetterService} from '../../../../services/cover-letter/cover-letter.service';
import {JsonPipe} from '@angular/common';

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
    TuiLoader,
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
  generatedLetter = signal('');

  isLoading = signal(false);
  cvFormBuilderService = inject(CvFormBuilderService)
  coverLetterService = inject(CoverLetterService)

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
  protected coverLetterForm: FormGroup<CoverLetterControls>;

  constructor() {
    this.coverLetterForm = this.cvFormBuilderService.buildCoverLetterForm();
  }

  generateCoverLetter(): void {
    this.isLoading.set(true);
    const rawCv: CvFormShape = this.cvForm().getRawValue() as CvFormShape;
    const tone = this.detectTone(this.coverLetterForm.getRawValue().tone ?? 0);

    const payload: CoverLetterPayload = {
      baseCv: rawCv,
      jobDesc: this.iaForm().getRawValue().jobDescription ?? '',
      promptOption: {
        recruiterName: this.coverLetterForm.getRawValue().recruiterName ?? '',
        companyName: this.coverLetterForm.getRawValue().companyName ?? '',
        tone: tone
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

}
