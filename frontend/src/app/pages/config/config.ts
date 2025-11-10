import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AiSettings, AiSettingsService } from '../../services/ai-settings/ai-settings.service';
import { TuiAlertService, TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiChevron, TuiDataListWrapper, TuiSelect } from '@taiga-ui/kit';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-config',
  imports: [
    FormsModule,
    TuiButton,
    TuiTextfield,
    TuiDataListWrapper,
    ReactiveFormsModule,
    RouterLink,
    TuiSelect,
    TuiChevron,
  ],
  templateUrl: './config.html',
  styleUrl: './config.css',
})
export class Config {
  private readonly fb = inject(FormBuilder);
  private readonly alerts = inject(TuiAlertService);
  private readonly aiSettingsService = inject(AiSettingsService);

  aiForm!: FormGroup;

  protected readonly aiModels = ['gemini-1.5-flash', 'gpt-4o', 'claude-3-sonnet'];

  constructor() {
    this.aiForm = this.fb.group({
      model: ['gemini-1.5-flash'],
      apiKey: [''],
      systemPrompt: [''],
    });
    this.aiForm.patchValue(this.aiSettingsService.loadSettings());
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
