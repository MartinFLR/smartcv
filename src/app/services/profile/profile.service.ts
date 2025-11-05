import {inject, Injectable} from '@angular/core';
import {CvProfile} from '../../../../shared/types/Types';
import {SaveDataService} from '../save-data/save-data.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly saveDataService = inject(SaveDataService);
  private readonly STORAGE_KEY = 'cv-profiles';

  getProfiles(): CvProfile[] {
    const profiles = localStorage.getItem(this.STORAGE_KEY);
    return profiles ? JSON.parse(profiles) : [];
  }

  loadProfileToActive(id: string): boolean {
    const profiles = this.getProfiles();
    const profileToLoad = profiles.find((p) => p.id === id);

    if (profileToLoad) {
      this.saveDataService.saveData(profileToLoad.data);
      return true;
    }
    return false;
  }

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

  deleteProfile(id: string): void {
    let profiles = this.getProfiles();
    profiles = profiles.filter((p) => p.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(profiles));
  }
}
