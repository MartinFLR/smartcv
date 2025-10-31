import {inject, Injectable} from '@angular/core';
import {CvProfile} from '../../../shared/types/types';
import {SaveDataService} from './save-data.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly saveDataService = inject(SaveDataService);
  private readonly STORAGE_KEY = 'cv-profiles';

  /**
   * Obtiene todos los perfiles guardados.
   */
  getProfiles(): CvProfile[] {
    const profiles = localStorage.getItem(this.STORAGE_KEY);
    return profiles ? JSON.parse(profiles) : [];
  }

  /**
   * Carga un perfil guardado y lo establece como el CV "activo"
   * en el saveDataService (el que usa tu página 'home').
   */
  loadProfileToActive(id: string): boolean {
    const profiles = this.getProfiles();
    const profileToLoad = profiles.find((p) => p.id === id);

    if (profileToLoad) {
      this.saveDataService.saveData(profileToLoad.data);
      return true;
    }
    return false;
  }

  /**
   * Guarda el CV *actual* (del saveDataService) como un nuevo perfil con nombre.
   */
  saveCurrentCvAsProfile(name: string): CvProfile | null {
    const currentCv = this.saveDataService.loadData();
    if (!currentCv) {
      console.error('No hay CV activo para guardar.');
      return null;
    }

    const newProfile: CvProfile = {
      id: crypto.randomUUID(),
      name: name,
      jobTitle: currentCv.personalInfo?.job || 'Sin puesto',
      data: currentCv,
    };

    const profiles = this.getProfiles();
    profiles.push(newProfile);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profiles));

    return newProfile;
  }

  /**
   * Elimina un perfil guardado.
   */
  deleteProfile(id: string): void {
    let profiles = this.getProfiles();
    profiles = profiles.filter((p) => p.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profiles));
  }
}
