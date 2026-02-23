import { Component, inject, Signal, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AiSettingsService } from '../../core/services/ai-settings/ai-settings.service';
import { TuiAlertService, TuiButton, TuiTextfield, TuiLabel, TuiIcon } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiSelect } from '@taiga-ui/kit';
import { RouterLink } from '@angular/router';
import { TuiCardLarge } from '@taiga-ui/layout';
import { TuiPassword } from '@taiga-ui/kit';
import { AiProviderModels, AiSettings } from '@smartcv/types';
import { map, skip, startWith } from 'rxjs';
import { AI_MODELS_CONFIG } from '../../core/config/ai.models.config';

import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-config',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    TuiButton,
    TuiTextfield,
    TuiDataListWrapper,
    TuiSelect,
    TuiChevron,
    TuiCardLarge,
    TranslocoDirective,
    TuiLabel,
    TuiPassword,
    TuiIcon,
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
  private readonly destroyRef = inject(DestroyRef);

  aiForm: FormGroup;
  protected readonly aiProviders: string[];
  protected availableModels: Signal<string[]>;

  constructor() {
    this.aiProviders = Object.keys(this.modelsByProvider);

    const savedSettings = this.aiSettingsService.loadSettings();

    const initialProvider =
      savedSettings?.modelProvider && this.aiProviders.includes(savedSettings.modelProvider)
        ? savedSettings.modelProvider
        : this.aiProviders[0];

    const initialModels = this.modelsByProvider[initialProvider] || [];

    let initialModel = savedSettings?.modelVersion || null;

    if (initialModel && !initialModels.includes(initialModel)) {
      initialModel = null;
    }

    if (!initialModel && initialModels.length > 0) {
      initialModel = initialModels[0];
    }

    this.aiForm = this.fb.group({
      modelProvider: [initialProvider],
      modelVersion: [initialModel],
      systemPrompt: [savedSettings?.systemPrompt || ''],
      apiKeys: this.fb.group({
        geminiApiKey: [''],
        openaiApiKey: [''],
        claudeApiKey: [''],
        mistralApiKey: [''],
      }),
    });

    this.aiSettingsService.getApiKeys().subscribe((keys) => {
      this.aiForm.get('apiKeys')?.patchValue(keys);
    });

    const providerChanges$ = this.aiForm
      .get('modelProvider')!
      .valueChanges.pipe(startWith(initialProvider));

    this.availableModels = toSignal(
      providerChanges$.pipe(map((provider) => this.modelsByProvider[provider] || [])),
      { initialValue: initialModels },
    );

    providerChanges$.pipe(skip(1), takeUntilDestroyed(this.destroyRef)).subscribe((newProvider) => {
      const newModels = this.modelsByProvider[newProvider] || [];
      this.aiForm.get('modelVersion')!.setValue(newModels[0] || null);
    });
  }

  saveAiSettings(): void {
    const { apiKeys, ...settings } = this.aiForm.value;

    this.aiSettingsService.saveSettings(settings as AiSettings);
    this.aiSettingsService.saveApiKeys(apiKeys).subscribe(() => {
      this.alerts
        .open('Configuración de IA y claves guardada.', {
          appearance: 'success',
        })
        .subscribe();
    });
  }
}
