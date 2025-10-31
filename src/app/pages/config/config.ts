import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AiSettings, AiSettingsService} from '../../services/ai-settings.service';
import {TuiAlertService, TuiButton, TuiIcon, TuiTextfield} from '@taiga-ui/core';
import {ProfileService} from '../../services/profile.service';
import {SaveDataService} from '../../services/save-data.service';
import {CvProfile} from '../../../../shared/types/types';
import {TuiCard} from '@taiga-ui/layout';
import {TuiChevron, TuiDataListWrapper, TuiSelect, TuiTextarea} from '@taiga-ui/kit';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-config',
  imports: [
    FormsModule,
    TuiButton,
    TuiCard,
    TuiTextfield,
    TuiDataListWrapper,
    TuiIcon,
    ReactiveFormsModule,
    RouterLink,
    TuiTextarea,
    TuiSelect,
    TuiChevron,
  ],
  templateUrl: './config.html',
  styleUrl: './config.css',
})
export class Config {
// --- Inyección de Servicios ---
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly alerts = inject(TuiAlertService);
  private readonly aiSettingsService = inject(AiSettingsService);
  private readonly profileService = inject(ProfileService);
  private readonly saveDataService = inject(SaveDataService); // Para guardar el CV actual

  // --- Formularios ---
  aiForm!: FormGroup;

  // --- Signals ---
  profiles = signal<CvProfile[]>([]);
  newProfileName = signal(''); // Para el input de "Nuevo Perfil"

  // --- Listas para Selects ---
  protected readonly aiModels = ['gemini-1.5-flash', 'gpt-4o', 'claude-3-sonnet'];

  constructor() {
    // 1. Cargar configuración de IA
    this.aiForm = this.fb.group({
      model: ['gemini-1.5-flash'],
      apiKey: [''],
      systemPrompt: [''],
    });
    this.aiForm.patchValue(this.aiSettingsService.loadSettings());

    // 2. Cargar perfiles guardados
    this.loadProfilesList();
  }

  // --- Métodos de IA ---
  saveAiSettings(): void {
    this.aiSettingsService.saveSettings(this.aiForm.value as AiSettings);
    this.alerts.open('Configuración de IA guardada.', { appearance: 'success' }).subscribe();
  }

  // --- Métodos de Perfiles ---
  private loadProfilesList(): void {
    this.profiles.set(this.profileService.getProfiles());
  }

  saveNewProfile(): void {
    const name = this.newProfileName();
    if (!name.trim()) {
      this.alerts.open('Por favor, dale un nombre al perfil.', { appearance: 'warning' }).subscribe();
      return;
    }

    this.profileService.saveCurrentCvAsProfile(name);
    this.loadProfilesList(); // Refrescar la lista
    this.newProfileName.set(''); // Limpiar el input
    this.alerts.open('Perfil guardado con éxito.', { appearance: 'success' }).subscribe();
  }

  loadProfile(id: string): void {
    const success = this.profileService.loadProfileToActive(id);
    if (success) {
      this.alerts.open('Perfil cargado. Redirigiendo...', { appearance: 'success' }).subscribe();
      // Navegamos a la home. Como la home se carga de nuevo,
      // su constructor leerá el CV activo desde saveDataService.
      this.router.navigate(['/']);
    }
  }

  deleteProfile(id: string): void {
    this.profileService.deleteProfile(id);
    this.loadProfilesList(); // Refrescar la lista
    this.alerts.open('Perfil eliminado.', { appearance: 'success' }).subscribe();
  }
}
