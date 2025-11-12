import { Injectable } from '@angular/core';
import { AiSettings } from '@smartcv/types';

@Injectable({
  providedIn: 'root',
})
export class AiSettingsService {
  private readonly STORAGE_KEY = 'ai-settings';

  loadSettings(): Partial<AiSettings> {
    const settings = localStorage.getItem(this.STORAGE_KEY);

    if (settings) {
      return JSON.parse(settings);
    }

    // Devuelve un objeto vacío si no hay settings,
    // para que la lógica del constructor en Config decida los defaults.
    return {};

    /* // O, si prefieres que el servicio defina los defaults, usa los nombres correctos:
    return settings
      ? JSON.parse(settings)
      : {
          provider: 'google', // <-- Corregido de 'modelProvider'
          model: 'gemini-1.5-flash', // <-- Corregido de 'modelVersion'
        };
    */
  }

  saveSettings(settings: AiSettings) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
  }
}
