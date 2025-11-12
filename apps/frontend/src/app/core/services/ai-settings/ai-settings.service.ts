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
    return {};
  }

  saveSettings(settings: AiSettings) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
  }
}
