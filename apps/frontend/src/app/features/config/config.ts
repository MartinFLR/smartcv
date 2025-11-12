import { Component, inject, Signal, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AiSettingsService } from '../../core/services/ai-settings/ai-settings.service';
import { TuiAlertService, TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiSelect } from '@taiga-ui/kit';
import { RouterLink } from '@angular/router';
import { TuiCardLarge } from '@taiga-ui/layout';
import { AiProviderModels, AiSettings } from '@smartcv/types';
import { map, skip, startWith } from 'rxjs';
import { AI_MODELS_CONFIG } from '../../core/config/ai.models.config';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-config',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    TuiButton,
    TuiTextfield,
    TuiDataListWrapper,
    TuiSelect,
    TuiChevron,
    TuiCardLarge,
  ],
  templateUrl: './config.html',
  styleUrl: './config.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Config {
  private readonly fb = inject(FormBuilder);
  private readonly alerts = inject(TuiAlertService);
  private readonly aiSettingsService = inject(AiSettingsService);

  private readonly modelsByProvider = inject<AiProviderModels>(AI_MODELS_CONFIG);

  aiForm!: FormGroup;
  protected readonly aiProviders: string[];
  protected availableModels: Signal<string[]>;

  constructor() {
    this.aiProviders = Object.keys(this.modelsByProvider);

    this.aiForm = this.fb.group({
      provider: [this.aiProviders[0]],
      model: [''],
      systemPrompt: [''],
    });

    const savedSettings = this.aiSettingsService.loadSettings();

    if (savedSettings && Object.keys(savedSettings).length > 0) {
      this.aiForm.patchValue(savedSettings);
    } else {
      if (this.modelsByProvider[this.aiProviders[0]]) {
        this.aiForm.get('model')!.setValue(this.modelsByProvider[this.aiProviders[0]][0]);
      }
    }

    const providerChanges$ = this.aiForm
      .get('provider')!
      .valueChanges.pipe(startWith(this.aiForm.get('provider')!.value));

    this.availableModels = toSignal(
      providerChanges$.pipe(map((provider) => this.modelsByProvider[provider] || [])),
      {
        initialValue: this.modelsByProvider[this.aiForm.get('provider')!.value] || [],
      },
    );

    providerChanges$.pipe(skip(1)).subscribe(() => {
      if (this.availableModels()?.length > 0) {
        this.aiForm.get('model')!.setValue(this.availableModels()[0]);
      } else {
        this.aiForm.get('model')!.setValue(null);
      }
    });
  }

  saveAiSettings(): void {
    this.aiSettingsService.saveSettings(this.aiForm.value as AiSettings);
    this.alerts
      .open('Configuración de IA guardada.', {
        appearance: 'success',
      })
      .subscribe();
  }
}
