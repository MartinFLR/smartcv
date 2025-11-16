import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { AiSettings } from '@smartcv/types';

@Injectable({
  providedIn: 'root',
})
export class AiSettingsService {
  private readonly STORAGE_KEY = 'ai-settings';

  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly storage: Storage | null = null;

  private readonly settingsSignal = signal<AiSettings | null>(this.loadDataInternal());

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.storage = this.document.defaultView?.localStorage ?? null;
    }

    this.settingsSignal = signal<AiSettings | null>(this.loadDataInternal());
  }

  loadSettings(): AiSettings | null {
    return this.settingsSignal();
  }

  saveSettings(settings: AiSettings): void {
    if (!this.storage) {
      return;
    }
    try {
      const serializedData = JSON.stringify(settings);
      this.storage.setItem(this.STORAGE_KEY, serializedData);
      this.settingsSignal.set(settings);
    } catch (e) {
      console.error('Error al guardar datos en localStorage:', e);
    }
  }

  clearData(): void {
    if (!this.storage) {
      return;
    }
    try {
      this.storage.removeItem(this.STORAGE_KEY);
      this.settingsSignal.set(null);
    } catch (e) {
      console.error('Error al limpiar datos de localStorage:', e);
      throw new Error('No se pudo limpiar los datos');
    }
  }

  private loadDataInternal(): AiSettings | null {
    if (!this.storage) {
      return null;
    }
    try {
      const serializedData = this.storage.getItem(this.STORAGE_KEY);
      if (serializedData === null) {
        return null;
      }
      return JSON.parse(serializedData) as AiSettings;
    } catch (e) {
      console.error('Error al cargar datos (datos corruptos?):', e);
      this.storage?.removeItem(this.STORAGE_KEY);
      return null;
    }
  }
}
