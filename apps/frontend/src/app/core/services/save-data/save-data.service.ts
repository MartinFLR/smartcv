import { inject, Injectable, signal } from '@angular/core';
import { CvForm } from '@smartcv/types';
import { WA_LOCAL_STORAGE } from '@ng-web-apis/common';

@Injectable({
  providedIn: 'root',
})
export class SaveDataService {
  private readonly storage = inject(WA_LOCAL_STORAGE);
  private readonly STORAGE_KEY = 'angular-cv-data';

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

  clearData(): void {
    try {
      this.storage.removeItem(this.STORAGE_KEY);
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
