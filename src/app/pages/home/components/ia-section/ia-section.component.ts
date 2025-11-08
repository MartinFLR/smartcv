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
import {
  ControlContainer,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import {
  TuiButtonLoading,
  TuiCheckbox,
  TuiSlider,
  TuiTextarea,
} from '@taiga-ui/kit';
import { KeyValuePipe } from '@angular/common';
import { ExaggerationLevelPipe } from '../../../../utils/pipes/exaggeration-pipe';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { IaFormControls } from '../../../../../../shared/types/Controls';

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
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }),
    },
  ],
  templateUrl: './ia-section.component.html',
})
export class IaSection implements OnInit {
  iaForm = input.required<FormGroup<IaFormControls>>();
  isLoading = input.required<boolean>();
  optimize = output<void>();

  protected readonly exaggerationLevel: Record<number, string> = {
    0: 'low',
    1: 'medium',
    2: 'high',
  };
  protected readonly exaggerationDescriptions: Record<number, string> = {
    0: 'Fiel al CV, mantiene el tono profesional y realista. No inventa logros ni resultados.',
    1: 'Resalta logros existentes y los adapta ligeramente para enfatizar impacto, manteniendo credibilidad.',
    2: 'Maximiza el impacto, exagera logros y habilidades de forma creativa. Revisar cuidadosamente antes de usar.',
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
