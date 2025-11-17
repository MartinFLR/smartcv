import {
  Component,
  computed,
  inject,
  Injector,
  input,
  OnInit,
  output,
  signal,
  Signal,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiButtonLoading, TuiCheckbox, TuiSlider, TuiTextarea } from '@taiga-ui/kit';
import { KeyValuePipe } from '@angular/common';
import { ExaggerationLevelPipe } from '../../../../shared/pipes/exaggeration-pipe';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { IaFormControls } from '../../../../core/models/controls.model';
import { TuiCardLarge } from '@taiga-ui/layout';
import { TranslocoDirective, TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-ia-section',
  imports: [
    ReactiveFormsModule,
    TuiTextfield,
    TuiTextarea,
    TuiSlider,
    KeyValuePipe,
    ExaggerationLevelPipe,
    TuiCheckbox,
    TuiButton,
    TuiButtonLoading,
    TuiCardLarge,
    TranslocoDirective,
    TranslocoPipe,
  ],
  templateUrl: './ia-section.component.html',
})
export class IaSection implements OnInit {
  iaForm = input.required<FormGroup<IaFormControls>>();
  isLoading = input.required<boolean>();
  optimize = output<void>();

  protected readonly exaggerationLevel: Record<number, string> = {
    0: 'home.ia.exaggeration.level.low.name',
    1: 'home.ia.exaggeration.level.medium.name',
    2: 'home.ia.exaggeration.level.high.name',
  };
  protected readonly exaggerationDescriptions: Record<number, string> = {
    0: 'home.ia.exaggeration.level.low.description',
    1: 'home.ia.exaggeration.level.medium.description',
    2: 'home.ia.exaggeration.level.high.description',
  };

  protected readonly max = 2;
  protected readonly min = 0;
  protected readonly step = 1;

  protected segments = computed(() => this.max - this.min);

  protected currentExaggeration: Signal<number> = signal(0);

  private readonly injector = inject(Injector);

  ngOnInit(): void {
    const exaggerationControl = this.iaForm().get('exaggeration');

    if (exaggerationControl) {
      const initialValue = exaggerationControl.value ?? 0;

      this.currentExaggeration = toSignal(
        exaggerationControl.valueChanges.pipe(map((value) => value ?? 0)),
        {
          injector: this.injector,
          initialValue: initialValue,
        },
      );
    }
  }
}
