import { inject, Injectable, signal } from '@angular/core';
import { CvForm } from '@smartcv/types';
import { WA_LOCAL_STORAGE } from '@ng-web-apis/common';

export interface CvMeta {
  isLocked: boolean;
  lastActiveProfileId?: string | null;
  template?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SaveDataService {
  private readonly storage = inject(WA_LOCAL_STORAGE);
  private readonly STORAGE_KEY = 'angular-cv-data';
  private readonly STORAGE_META_KEY = 'angular-cv-meta';

  private readonly cvDataSignal = signal<CvForm | null>(this.loadDataInternal());
  public readonly activeCv = this.cvDataSignal.asReadonly();

  saveData(cvData: CvForm): void {
    try {
      const serializedData = JSON.stringify(cvData);
      this.storage.setItem(this.STORAGE_KEY, serializedData);
      this.cvDataSignal.set(cvData);
    } catch (e) {
      console.error('Error al guardar datos en localStorage:', e);
      throw new Error('No se pudo guardar el CV');
    }
  }

  saveMeta(meta: CvMeta): void {
    try {
      const serializedMeta = JSON.stringify(meta);
      this.storage.setItem(this.STORAGE_META_KEY, serializedMeta);
    } catch (e) {
      console.error('Error al guardar metadata en localStorage:', e);
    }
  }

  loadMeta(): CvMeta {
    try {
      const serializedMeta = this.storage.getItem(this.STORAGE_META_KEY);
      if (serializedMeta === null) {
        return { isLocked: false };
      }
      return JSON.parse(serializedMeta) as CvMeta;
    } catch (e) {
      console.error('Error al cargar metadata:', e);
      return { isLocked: false };
    }
  }

  clearData(): void {
    try {
      this.storage.removeItem(this.STORAGE_KEY);
      this.storage.removeItem(this.STORAGE_META_KEY);
      this.cvDataSignal.set(null);
    } catch (e) {
      console.error('Error al limpiar datos de localStorage:', e);
      throw new Error('No se pudo limpiar los datos');
    }
  }

  private loadDataInternal(): CvForm | null {
    try {
      const serializedData = this.storage.getItem(this.STORAGE_KEY);
      if (serializedData === null) {
        return null;
      }
      return JSON.parse(serializedData) as CvForm;
    } catch (e) {
      console.error('Error al cargar datos (datos corruptos?):', e);
      this.storage?.removeItem(this.STORAGE_KEY);
      return null;
    }
  }
}
