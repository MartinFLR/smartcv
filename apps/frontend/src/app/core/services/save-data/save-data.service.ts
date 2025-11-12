import { DOCUMENT, inject, Injectable, signal } from '@angular/core';
import { CvForm } from '@smartcv/types';

@Injectable({
  providedIn: 'root',
})
export class SaveDataService {
  private readonly document = inject(DOCUMENT);
  private readonly storage: Storage | null = this.document.defaultView?.localStorage ?? null;
  private readonly STORAGE_KEY = 'angular-cv-data';

  private readonly cvDataSignal = signal<CvForm | null>(this.loadDataInternal());
  public readonly activeCv = this.cvDataSignal.asReadonly();

  saveData(cvData: CvForm): void {
    if (!this.storage) {
      return;
    }
    try {
      const serializedData = JSON.stringify(cvData);
      this.storage.setItem(this.STORAGE_KEY, serializedData);
      this.cvDataSignal.set(cvData);
    } catch (e) {
      console.error('Error al guardar datos en localStorage:', e);
      throw new Error('No se pudo guardar el CV');
    }
  }

  clearData(): void {
    if (!this.storage) {
      return;
    }
    try {
      this.storage.removeItem(this.STORAGE_KEY);
      this.cvDataSignal.set(null);
    } catch (e) {
      console.error('Error al limpiar datos de localStorage:', e);
      throw new Error('No se pudo limpiar los datos');
    }
  }

  private loadDataInternal(): CvForm | null {
    if (!this.storage) {
      return null;
    }
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
