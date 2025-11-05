import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AiSettings, AiSettingsService} from '../../services/ai-settings/ai-settings.service';
import {TuiAlertService, TuiButton, TuiTextfield} from '@taiga-ui/core';
import {ProfileService} from '../../services/profile/profile.service';
import {SaveDataService} from '../../services/save-data/save-data.service';
import {CvProfile} from '../../../../shared/types/Types';
import {TuiCard} from '@taiga-ui/layout';
import {TuiChevron, TuiDataListWrapper, TuiSelect} from '@taiga-ui/kit';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-config',
  imports: [
    FormsModule,
    TuiButton,
    TuiCard,
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
  private readonly router = inject(Router);
  private readonly alerts = inject(TuiAlertService);
  private readonly aiSettingsService = inject(AiSettingsService);
  private readonly profileService = inject(ProfileService);
  private readonly saveDataService = inject(SaveDataService);

  aiForm!: FormGroup;

  // --- Signals ---
  profiles = signal<CvProfile[]>([]);
  newProfileName = signal('');

  protected readonly aiModels = ['gemini-1.5-flash', 'gpt-4o', 'claude-3-sonnet'];

  constructor() {
    this.aiForm = this.fb.group({
      model: ['gemini-1.5-flash'],
      apiKey: [''],
      systemPrompt: [''],
    });
    this.aiForm.patchValue(this.aiSettingsService.loadSettings());

    this.loadProfilesList();
  }

  saveAiSettings(): void {
    this.aiSettingsService.saveSettings(this.aiForm.value as AiSettings);
    this.alerts.open('Configuración de IA guardada.',
      {
        appearance: 'success'
      }).subscribe();
  }

  private loadProfilesList(): void {
    this.profiles.set(this.profileService.getProfiles());
  }

  saveNewProfile(): void {
    const name = this.newProfileName();
    if (!name.trim()) {
      this.alerts.open('Por favor, dale un nombre al perfil.',
        {
          appearance: 'warning'
        }).subscribe();
      return;
    }

    this.profileService.saveCurrentCvAsProfile(name);
    this.loadProfilesList();
    this.newProfileName.set('');
    this.alerts.open('Perfil guardado con éxito.',
      {
        appearance: 'success'
      }).subscribe();
  }

  loadProfile(id: string): void {
    const success = this.profileService.loadProfileToActive(id);
    if (success) {
      this.alerts.open('Perfil cargado. Redirigiendo...',
        {
          appearance: 'success'
        }).subscribe();
      this.router.navigate(['/']);
    }
  }

  deleteProfile(id: string): void {
    this.profileService.deleteProfile(id);
    this.loadProfilesList();
    this.alerts.open('Perfil eliminado.',
      {
        appearance: 'success'
      }).subscribe();
  }
}
