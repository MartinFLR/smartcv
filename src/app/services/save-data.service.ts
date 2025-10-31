import {DOCUMENT, inject, Injectable} from '@angular/core';
import {CvFormShape} from '../types/types';
import {TuiAlertService} from '@taiga-ui/core';

@Injectable({
  providedIn: 'root',
})
export class SaveDataService {
  private readonly document = inject(DOCUMENT);
  private readonly alerts = inject(TuiAlertService);

  private readonly storage: Storage | null = this.document.defaultView?.localStorage ?? null;

  private readonly STORAGE_KEY = 'angular-cv-data';

  /**
   * Guarda el estado actual del CV en localStorage.
   * @param cvData Los datos del formulario (CvFormShape).
   */
  saveData(cvData: CvFormShape): void {
    if (!this.storage) {
      // No hacer nada si no hay 'localStorage' (ej: SSR)
      return;
    }

    try {
      const serializedData = JSON.stringify(cvData);
      this.storage.setItem(this.STORAGE_KEY, serializedData);
      this.alerts.open('CV guardado localmente', {
        appearance: 'success',
        autoClose: 3000
      }).subscribe();
    } catch (e) {
      console.error('Error al guardar datos en localStorage:', e);
      this.alerts.open('No se pudo guardar el CV', {
        appearance: 'error'
      }).subscribe();
    }
  }

  /**
   * Carga los datos del CV desde localStorage.
   * @returns Los datos del CV (CvFormShape) o null si no hay nada guardado o hay error.
   */
  loadData(): CvFormShape | null {
    if (!this.storage) {
      return null;
    }

    try {
      const serializedData = this.storage.getItem(this.STORAGE_KEY);
      if (serializedData === null) {
        return null;
      }
      // Parseamos los datos guardados
      return JSON.parse(serializedData) as CvFormShape;
    } catch (e) {
      console.error('Error al cargar datos de localStorage (datos corruptos?):', e);
      // Si hay datos corruptos, los limpiamos para evitar futuros errores
      this.clearData(false); // false para no mostrar alerta de limpieza
      return null;
    }
  }

  /**
   * Limpia los datos del CV guardados en localStorage.
   * @param showAlert Notificar al usuario (default: true)
   */
  clearData(showAlert: boolean = true): void {
    if (!this.storage) {
      return;
    }

    try {
      this.storage.removeItem(this.STORAGE_KEY);
      if (showAlert) {
        this.alerts.open('Datos locales eliminados', {
          appearance: 'info',
          autoClose: 3000
        }).subscribe();
      }
    } catch (e) {
      console.error('Error al limpiar datos de localStorage:', e);
    }
  }
}
