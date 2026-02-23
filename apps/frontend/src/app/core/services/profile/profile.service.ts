import { DestroyRef, DOCUMENT, inject, Injectable, signal } from '@angular/core';
import { CvForm, CvProfile } from '@smartcv/types';
import { SaveDataService } from '../save-data/save-data.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  private logHttpError(context: string, err: unknown): void {
    if (err instanceof HttpErrorResponse) {
      console.error(`❌ [ProfileService] ${context}:`, {
        status: err.status,
        statusText: err.statusText,
        url: err.url,
        message: err.message,
        errorBody: err.error,
      });
    } else if (err instanceof Error) {
      console.error(`❌ [ProfileService] ${context}:`, err.message, err);
    } else {
      console.error(`❌ [ProfileService] ${context}:`, err);
    }
  }

  private loadProfiles(): void {
    console.log('[ProfileService] Cargando perfiles desde BD...');
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
          console.log(`[ProfileService] ✅ ${profiles.length} perfiles cargados desde BD`);
          this.profilesSignal.set(profiles);
        }),
        catchError((err) => {
          this.logHttpError('Error al cargar perfiles desde BD, usando LocalStorage', err);
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
    console.log(`[ProfileService] saveCurrentCvAsProfile("${name}") iniciado`);

    const currentCv = this.saveDataService.activeCv();
    console.log('[ProfileService] activeCv() =', currentCv ? 'tiene datos' : 'NULL');

    if (!currentCv) {
      throw new Error('No hay CV activo para guardar.');
    }
    const cvDataCopy = JSON.parse(JSON.stringify(currentCv));

    const tempId = crypto.randomUUID();
    const newProfile: CvProfile = {
      id: tempId,
      name: name,
      jobTitle: currentCv.personalInfo?.job || 'Sin puesto',
      data: cvDataCopy,
    };

    const payloadSize = JSON.stringify({ name, data: cvDataCopy }).length;
    console.log(
      `[ProfileService] Enviando POST ${this.API_URL} (payload: ${(payloadSize / 1024).toFixed(1)}KB, tempId: ${tempId})`,
    );

    this.http
      .post<CvProfile>(this.API_URL, { name, data: cvDataCopy })
      .pipe(
        tap((dbProfile) => {
          console.log(`[ProfileService] ✅ Perfil guardado en BD con id: ${dbProfile.id}`);
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

          if (this.getLastActiveProfileId() === tempId) {
            this.saveLastActiveProfileId(dbProfile.id);
          }

          this.profileIdChange.next({ oldId: tempId, newId: dbProfile.id });
        }),
        catchError((err) => {
          this.logHttpError('Error al guardar perfil en BD (saveCurrentCvAsProfile)', err);
          this.persistProfiles();
          return of(null);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();

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

    this.persistProfiles();

    this.http
      .put(`${this.API_URL}/${profileId}`, { data: cvDataCopy })
      .pipe(
        catchError((err) => {
          this.logHttpError('Error al actualizar perfil en BD', err);
          return of(null);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  createEmptyProfile(name: string): CvProfile {
    console.log(`[ProfileService] createEmptyProfile("${name}") iniciado`);

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

    const tempId = crypto.randomUUID();
    const newProfile: CvProfile = {
      id: tempId,
      name: name,
      jobTitle: '',
      data: emptyCvForm,
    };

    const payloadSize = JSON.stringify({ name, data: emptyCvForm }).length;
    console.log(
      `[ProfileService] Enviando POST ${this.API_URL} (payload: ${payloadSize} bytes, tempId: ${tempId})`,
    );

    this.http
      .post<CvProfile>(this.API_URL, { name, data: emptyCvForm })
      .pipe(
        tap((dbProfile) => {
          console.log(`[ProfileService] ✅ Perfil vacío guardado en BD con id: ${dbProfile.id}`);
          this.profilesSignal.update((profiles) =>
            profiles.map((p) => (p.id === tempId ? { ...newProfile, id: dbProfile.id } : p)),
          );

          if (this.getLastActiveProfileId() === tempId) {
            this.saveLastActiveProfileId(dbProfile.id);
          }
          this.profileIdChange.next({ oldId: tempId, newId: dbProfile.id });
        }),
        catchError((err) => {
          this.logHttpError('Error al crear perfil vacío en BD (createEmptyProfile)', err);
          this.persistProfiles();
          return of(null);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();

    this.profilesSignal.update((profiles) => [...profiles, newProfile]);
    this.persistProfiles();
    return newProfile;
  }

  deleteProfile(id: string): void {
    this.profilesSignal.update((profiles) => profiles.filter((p) => p.id !== id));
    this.persistProfiles();

    this.http
      .delete(`${this.API_URL}/${id}`)
      .pipe(
        catchError((err) => {
          this.logHttpError('Error al eliminar perfil de BD', err);
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

    this.http
      .put(`${this.API_URL}/${id}`, { name: newName })
      .pipe(
        catchError((err) => {
          this.logHttpError('Error al renombrar perfil en BD', err);
          return of(null);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();

    return updatedProfile;
  }

  private loadProfilesFromStorage(): void {
    if (!this.storage) {
      console.warn('[ProfileService] localStorage no disponible');
      return;
    }
    const profiles = this.storage.getItem(this.STORAGE_KEY);
    const parsed = profiles ? JSON.parse(profiles) : [];
    console.log(`[ProfileService] ${parsed.length} perfiles cargados desde LocalStorage`);
    this.profilesSignal.set(parsed);
  }

  private persistProfiles(): void {
    if (!this.storage) {
      console.warn('[ProfileService] localStorage no disponible, no se puede persistir');
      return;
    }
    try {
      this.storage.setItem(this.STORAGE_KEY, JSON.stringify(this.profiles()));
    } catch (e) {
      console.error('[ProfileService] Error al persistir perfiles en localStorage:', e);
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
