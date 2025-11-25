import { inject, Injectable, signal } from '@angular/core';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { CreateProfile } from '../profile/create-profile/create-profile';
import { CvForm, CvProfile } from '@smartcv/types';
import { TuiAlertService } from '@taiga-ui/core';
import { TuiDialogService } from '@taiga-ui/experimental';
import { CvFormDataService } from '../../../services/cv-form/cv-form-data/cv-form-data.service';
import { ProfileService } from '../../../../../core/services/profile/profile.service';
import { CvStateService } from '../../../services/cv-form/cv-form-state/cv-state.service';
import { EditProfile } from '../profile/edit-profile/edit-profile';

@Injectable({
  providedIn: 'root',
})
export class ActionsService {
  private readonly profileService = inject(ProfileService);
  private readonly cvState = inject(CvStateService);
  private readonly dataService = inject(CvFormDataService);
  private readonly dialogs = inject(TuiDialogService);
  private readonly alerts = inject(TuiAlertService);

  public readonly selectedProfile = signal<CvProfile | null>(null);
  public readonly profiles = this.profileService.profiles;

  public readonly isCvValid = this.cvState.isValid;
  public readonly isCvLocked = this.cvState.isCvLocked;
  public readonly isLoading = this.cvState.isLoading;

  constructor() {
    this.restoreActiveProfileSession();
  }

  private restoreActiveProfileSession(): void {
    const lastProfileId = this.profileService.getLastActiveProfileId();

    if (lastProfileId) {
      const foundProfile = this.profiles().find((p) => p.id === lastProfileId);

      if (foundProfile) {
        this.selectedProfile.set(foundProfile);
      }
    }
  }

  public selectProfile(newProfile: CvProfile | null): void {
    const previousProfile = this.selectedProfile();

    if (previousProfile && this.isCvValid()) {
      this.saveCv(true);
    }

    this.selectedProfile.set(newProfile);

    this.profileService.saveLastActiveProfileId(newProfile?.id ?? null);

    if (newProfile) {
      this.profileService.loadProfileToActive(newProfile.id);
      this.showAlert(`Perfil "${newProfile.name}" cargado.`, 'info');
    } else {
      this.clearForm();
    }
  }

  public deleteProfile(id: string): void {
    this.profileService.deleteProfile(id);
    if (this.selectedProfile()?.id === id) {
      this.selectedProfile.set(null);
      this.profileService.saveLastActiveProfileId(null);
      this.clearForm();
    }
    this.showAlert('Perfil eliminado.', 'info');
  }

  public saveCv(asProfileUpdate = false): void {
    try {
      const rawData = this.cvState.cvForm.getRawValue() as CvForm;

      this.dataService.saveCv(rawData);

      const currentProfile = this.selectedProfile();
      if (currentProfile) {
        this.profileService.updateActiveProfileData(currentProfile.id);
        if (!asProfileUpdate) {
          this.showAlert('CV Guardado y perfil actualizado.');
        } else {
          this.showAlert(`Cambios guardados en "${currentProfile.name}".`);
        }
      } else if (!asProfileUpdate) {
        this.showAlert('CV guardado localmente.', 'success');
      }
    } catch (e) {
      this.showError((e as Error).message);
    }
  }

  public downloadPdf(): void {
    if (!this.isCvValid()) return;
    const rawData = this.cvState.cvForm.getRawValue() as CvForm;
    this.dataService.downloadPdf(rawData);
  }

  public clearForm(): void {
    this.selectedProfile.set(null);
    this.cvState.resetForm();
    this.showAlert('Formulario limpiado.', 'info');
  }

  public toggleLock(locked: boolean): void {
    this.cvState.setLockState(locked);
  }

  public createNewProfile(): void {
    const cvEsValido = this.isCvValid();

    if (cvEsValido && this.selectedProfile()) {
      this.saveCv(true);
    }

    this.dialogs
      .open<string>(new PolymorpheusComponent(CreateProfile), {
        label: 'Crear Nuevo Perfil',
        size: 's',
      })
      .subscribe({
        next: (name) => {
          if (!name) return;

          try {
            let newProfile: CvProfile;

            if (cvEsValido) {
              this.saveCv(true);
              newProfile = this.profileService.saveCurrentCvAsProfile(name);
              this.showAlert('Perfil creado con los datos actuales.');
            } else {
              newProfile = this.profileService.createEmptyProfile(name);
              this.showAlert('Nuevo perfil vacío creado.');
            }

            this.selectedProfile.set(newProfile);
          } catch (e) {
            this.showError((e as Error).message);
          }
        },
      });
  }

  public editProfileName(profile: CvProfile): void {
    this.dialogs
      .open<string>(new PolymorpheusComponent(EditProfile), {
        label: 'Editar Perfil',
        size: 's',
        data: profile.name,
      })
      .subscribe((newName) => {
        if (newName && newName !== profile.name) {
          try {
            const updated = this.profileService.updateProfileName(profile.id, newName);

            if (this.selectedProfile()?.id === updated.id) {
              this.selectedProfile.set(updated);
            }
            this.showAlert(`Nombre actualizado.`);
          } catch (e) {
            this.showError((e as Error).message);
          }
        }
      });
  }

  public reloadProfile(): void {
    const profile = this.selectedProfile();
    if (profile) {
      try {
        this.profileService.loadProfileToActive(profile.id);
        this.showAlert('Cambios descartados. Perfil recargado.');
      } catch (e) {
        this.showError((e as Error).message);
      }
    }
  }

  // --- Utils ---
  private showAlert(
    message: string,
    appearance: 'success' | 'warning' | 'error' | 'info' = 'success',
  ): void {
    this.alerts.open(message, { appearance, autoClose: 3000 }).subscribe();
  }

  private showError(message: string): void {
    this.alerts.open(message, { appearance: 'error', autoClose: 5000 }).subscribe();
  }
}
