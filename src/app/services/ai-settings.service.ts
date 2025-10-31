import { Injectable } from '@angular/core';

export interface AiSettings {
  model: string;
  apiKey: string;
  systemPrompt: string;
}

@Injectable({
  providedIn: 'root',
})
export class AiSettingsService {
  private readonly STORAGE_KEY = 'ai-settings';

  loadSettings(): Partial<AiSettings> {
    const settings = localStorage.getItem(this.STORAGE_KEY);
    return settings ? JSON.parse(settings) : { model: 'gemini-2.5-flash' };
  }

  saveSettings(settings: AiSettings) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
  }
}
