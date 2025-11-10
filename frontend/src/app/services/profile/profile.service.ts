import { DOCUMENT, inject, Injectable, signal } from '@angular/core'; // Importar DOCUMENT
import { CvForm, CvProfile } from '../../../../../shared/types/Types';
import { SaveDataService } from '../save-data/save-data.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly saveDataService = inject(SaveDataService);
  private readonly STORAGE_KEY = 'cv-profiles';

  private readonly document = inject(DOCUMENT);
  private readonly storage: Storage | null = this.document.defaultView?.localStorage ?? null;

  private readonly profilesSignal = signal<CvProfile[]>([]);
  public readonly profiles = this.profilesSignal.asReadonly();

  constructor() {
    this.loadProfilesFromStorage();
  }

  loadProfileToActive(id: string): boolean {
    const profileToLoad = this.profiles().find((p) => p.id === id);

    if (profileToLoad) {
      const profileDataCopy = JSON.parse(JSON.stringify(profileToLoad.data));
      this.saveDataService.saveData(profileDataCopy);
      return true;
    }
    return false;
  }

  saveCurrentCvAsProfile(name: string): CvProfile {
    const currentCv = this.saveDataService.activeCv();
    if (!currentCv) {
      throw new Error('No hay CV activo para guardar.');
    }
    const cvDataCopy = JSON.parse(JSON.stringify(currentCv));

    const newProfile: CvProfile = {
      id: crypto.randomUUID(),
      name: name,
      jobTitle: currentCv.personalInfo?.job || 'Sin puesto',
      data: cvDataCopy,
    };

    this.profilesSignal.update((profiles) => [...profiles, newProfile]);
    this.persistProfiles();

    return newProfile;
  }

  updateActiveProfileData(profileId: string): void {
    const currentCv = this.saveDataService.activeCv();
    if (!currentCv) {
      throw new Error('No hay CV activo para guardar.');
    }

    const cvDataCopy = JSON.parse(JSON.stringify(currentCv));

    this.profilesSignal.update((profiles) =>
      profiles.map((p) => {
        if (p.id === profileId) {
          return {
            ...p,
            data: cvDataCopy,
            jobTitle: cvDataCopy.personalInfo?.job || 'Sin puesto',
          };
        }
        return p;
      }),
    );

    this.persistProfiles();
  }

  createEmptyProfile(name: string): CvProfile {
    const emptyCvForm: CvForm = {
      personalInfo: {
        name: name,
        job: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        web: '',
        profileSummary: '',
      },
      education: [
        {
          title: '',
          institution: '',
          dateIn: '',
          dateFin: '',
          bullets: '',
        },
      ],
      experience: [
        {
          role: '',
          company: '',
          dateIn: '',
          dateFin: '',
          bullets: '',
        },
      ],
      projects: [
        {
          name: '',
          dateIn: '',
          dateFin: '',
          bullets: '',
          subtitle: '',
        },
      ],
      skills: [
        {
          skills: [],
          languages: [],
          certifications: [
            {
              name: '',
              date: '',
            },
          ],
          additional: [],
        },
      ],
    };

    const newProfile: CvProfile = {
      id: crypto.randomUUID(),
      name: name,
      jobTitle: '',
      data: emptyCvForm,
    };

    this.profilesSignal.update((profiles) => [...profiles, newProfile]);
    this.persistProfiles();

    return newProfile;
  }

  deleteProfile(id: string): void {
    this.profilesSignal.update((profiles) => profiles.filter((p) => p.id !== id));
    this.persistProfiles();
  }

  updateProfileName(id: string, newName: string): CvProfile {
    let updatedProfile: CvProfile | undefined;

    this.profilesSignal.update((profiles) =>
      profiles.map((p) => {
        if (p.id === id) {
          updatedProfile = { ...p, name: newName };
          return updatedProfile;
        }
        return p;
      }),
    );

    this.persistProfiles();

    if (!updatedProfile) {
      throw new Error('Perfil no encontrado para actualizar.');
    }
    return updatedProfile;
  }

  private loadProfilesFromStorage(): void {
    if (!this.storage) {
      return;
    }
    const profiles = this.storage.getItem(this.STORAGE_KEY);
    this.profilesSignal.set(profiles ? JSON.parse(profiles) : []);
  }

  private persistProfiles(): void {
    if (!this.storage) {
      return;
    }
    try {
      this.storage.setItem(this.STORAGE_KEY, JSON.stringify(this.profiles()));
    } catch (e) {
      console.error('Error al persistir perfiles en localStorage:', e);
    }
  }
}
