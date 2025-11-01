import {Component, computed, input, output} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {IaFormControls} from '../../../../../../shared/types/types';
import {TuiButton, TuiTextfield} from '@taiga-ui/core';
import {TuiButtonLoading, TuiCheckbox, TuiSlider, TuiTextarea} from '@taiga-ui/kit';
import {KeyValuePipe} from '@angular/common';
import {ExxagerationLevelPipe} from '../../../../utils/pipes/exxageration-pipe';

@Component({
  selector: 'app-ia-tools',
  imports: [
    ReactiveFormsModule,
    TuiTextfield,
    TuiTextarea,
    TuiSlider,
    KeyValuePipe,
    ExxagerationLevelPipe,
    TuiCheckbox,
    TuiButton,
    TuiButtonLoading
  ],
  templateUrl: './ia-tools.html',
  styleUrl: './ia-tools.css',
})
export class IaTools {
  iaForm = input.required<FormGroup<IaFormControls>>();
  isLoading = input.required<boolean>();
  optimize = output<void>();

  protected readonly exaggerationLevel: Record<number, string> = {
    0: 'low', 1: 'medium', 2: 'high',
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

  // Usamos un computed signal para el valor, asegurando reactividad
  protected currentExaggeration = computed(() => {
    return this.iaForm()?.get('exaggeration')?.value ?? 0;
  });
}
