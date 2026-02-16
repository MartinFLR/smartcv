import { DestroyRef, DOCUMENT, inject, Injectable, signal } from '@angular/core';
import { CvForm, CvProfile } from '@smartcv/types';
import { SaveDataService } from '../save-data/save-data.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, Subject, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly saveDataService = inject(SaveDataService);
  private readonly http = inject(HttpClient);
  private readonly STORAGE_KEY = 'cv-profiles';
  private readonly ACTIVE_PROFILE_KEY = 'cv-active-profile-id';
  private readonly API_URL = '/api/profiles';

  private readonly document = inject(DOCUMENT);
  private readonly storage: Storage | null = this.document.defaultView?.localStorage ?? null;

  private readonly profilesSignal = signal<CvProfile[]>([]);
  public readonly profiles = this.profilesSignal.asReadonly();

  public readonly profileIdChange = new Subject<{ oldId: string; newId: string }>();

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.loadProfiles();
  }

  private loadProfiles(): void {
    // Try loading from DB first
    this.http
      .get<CvProfile[]>(this.API_URL)
      .pipe(
        map((dbProfiles) =>
          dbProfiles.map((p) => ({
            id: p.id,
            name: p.name,
            jobTitle: p.data?.personalInfo?.job || 'Sin puesto',
            data: p.data,
          })),
        ),
        tap((profiles) => {
          this.profilesSignal.set(profiles);
        }),
        catchError(() => {
          console.warn('Backend no disponible, cargando de LocalStorage');
          this.loadProfilesFromStorage();
          return of([]);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
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

    // Optimistic Update / Temporary ID
    const tempId = crypto.randomUUID();
    const newProfile: CvProfile = {
      id: tempId,
      name: name,
      jobTitle: currentCv.personalInfo?.job || 'Sin puesto',
      data: cvDataCopy,
    };

    // Try saving to DB
    this.http
      .post<CvProfile>(this.API_URL, { name, data: cvDataCopy })
      .pipe(
        tap((dbProfile) => {
          // Replace optimistic profile with real DB profile
          this.profilesSignal.update((profiles) =>
            profiles.map((p) =>
              p.id === tempId
                ? {
                    ...newProfile,
                    id: dbProfile.id,
                  }
                : p,
            ),
          );

          // Update Active Profile ID in Storage if it matches the temp ID
          if (this.getLastActiveProfileId() === tempId) {
            this.saveLastActiveProfileId(dbProfile.id);
          }

          // Notify subscribers of ID change
          this.profileIdChange.next({ oldId: tempId, newId: dbProfile.id });
        }),
        catchError(() => {
          console.warn('Backend no disponible, guardando en LocalStorage');
          this.persistProfiles(); // Persist the optimistic profile which is already added below
          return of(null);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();

    // Update Local State immediately
    this.profilesSignal.update((profiles) => [newProfile, ...profiles]);

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

    // Try updating DB (Delete + Create strategy or simple overwrite if endpoint existed, but here we use Create logic for now or Custom Update)
    // Actually the Controller has findAll, create, remove. It's missing 'update'.
    // For now, we will handle it as "Delete old + Create new" if we want to sync, OR just ignore DB update if strictly following the plan that mentioned "create/delete".
    // BUT the user expects "update".
    // Let's implement a simple "Create with same name" or just rely on local storage fallback if the API doesn't support update yet.
    // Wait, the previous implementation plan said "ProfilesController (CRUD)". I implemented findAll, create, remove. I missed Update.
    this.persistProfiles();

    // Try updating DB
    this.http
      .put(`${this.API_URL}/${profileId}`, { data: cvDataCopy })
      .pipe(
        catchError(() => {
          console.warn('Fallo al actualizar en BD, pero actualizado localmente');
          return of(null);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
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
        photo: null,
        profileSummary: '',
      },
      education: [],
      experience: [],
      projects: [],
      skills: [],
    };

    // Optimistic
    const tempId = crypto.randomUUID();
    const newProfile: CvProfile = {
      id: tempId,
      name: name,
      jobTitle: '',
      data: emptyCvForm,
    };

    // DB Sync
    this.http
      .post<CvProfile>(this.API_URL, { name, data: emptyCvForm })
      .pipe(
        tap((dbProfile) => {
          this.profilesSignal.update((profiles) =>
            profiles.map((p) => (p.id === tempId ? { ...newProfile, id: dbProfile.id } : p)),
          );

          if (this.getLastActiveProfileId() === tempId) {
            this.saveLastActiveProfileId(dbProfile.id);
          }
          this.profileIdChange.next({ oldId: tempId, newId: dbProfile.id });
        }),
        catchError(() => {
          this.persistProfiles();
          return of(null);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();

    this.profilesSignal.update((profiles) => [...profiles, newProfile]);
    return newProfile;
  }

  deleteProfile(id: string): void {
    // Optimistic delete
    this.profilesSignal.update((profiles) => profiles.filter((p) => p.id !== id));
    this.persistProfiles();

    // DB Sync
    this.http
      .delete(`${this.API_URL}/${id}`)
      .pipe(
        catchError(() => {
          console.warn('Fallo al eliminar de BD, pero eliminado localmente');
          return of(null);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
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

    // DB Sync
    this.http
      .put(`${this.API_URL}/${id}`, { name: newName })
      .pipe(
        catchError(() => {
          console.warn('Fallo al renombrar en BD, pero renombrado localmente');
          return of(null);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();

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

  public saveLastActiveProfileId(id: string | null): void {
    if (!this.storage) return;
    if (id) {
      this.storage.setItem(this.ACTIVE_PROFILE_KEY, id);
    } else {
      this.storage.removeItem(this.ACTIVE_PROFILE_KEY);
    }
  }

  public getLastActiveProfileId(): string | null {
    if (!this.storage) return null;
    return this.storage.getItem(this.ACTIVE_PROFILE_KEY);
  }
}
