import { inject, Injectable, signal } from '@angular/core';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { TuiDialogService } from '@taiga-ui/experimental';
import { CvForm, CvProfile } from '@smartcv/types';
import { CvFormDataService } from '../../../services/cv-form/cv-form-data/cv-form-data.service';
import { ProfileService } from '../../../../../core/services/profile/profile.service';
import { CvStateService } from '../../../services/cv-form/cv-form-state/cv-state.service';
import { TaigaAlertsService } from '../../../../../core/services/alerts/taiga-alerts.service';
import { CreateProfile } from '../profile/create-profile/create-profile';
import { EditProfile } from '../profile/edit-profile/edit-profile';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class ActionsService {
  private readonly profileService = inject(ProfileService);
  private readonly cvState = inject(CvStateService);
  private readonly dataService = inject(CvFormDataService);
  private readonly dialogs = inject(TuiDialogService);
  private readonly transloco = inject(TranslocoService);
  private readonly taigaAlerts = inject(TaigaAlertsService);

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
      this.taigaAlerts.showInfo('alerts.profiles.loaded', { name: newProfile.name }).subscribe();
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
    this.taigaAlerts.showInfo('alerts.profiles.deleted').subscribe();
  }

  public saveCv(asProfileUpdate = false): void {
    try {
      const rawData = this.cvState.cvForm.getRawValue() as CvForm;
      this.dataService.saveCv(rawData);

      const currentProfile = this.selectedProfile();

      if (currentProfile) {
        this.profileService.updateActiveProfileData(currentProfile.id);

        if (!asProfileUpdate) {
          this.taigaAlerts.showSuccess('alerts.cv.saved_updated').subscribe();
        } else {
          this.taigaAlerts
            .showSuccess('alerts.cv.saved_in_profile', { name: currentProfile.name })
            .subscribe();
        }
      } else if (!asProfileUpdate) {
        this.taigaAlerts.showSuccess('alerts.cv.saved_local').subscribe();
      }
    } catch (e) {
      this.handleError(e);
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
    this.taigaAlerts.showInfo('alerts.forms.cleared').subscribe();
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
        label: this.transloco.translate('cv.actions.create.label'),
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
              this.taigaAlerts.showSuccess('alerts.profiles.created_from_data').subscribe();
            } else {
              newProfile = this.profileService.createEmptyProfile(name);
              this.taigaAlerts.showSuccess('alerts.profiles.created_empty').subscribe();
            }

            this.selectedProfile.set(newProfile);
          } catch (e) {
            this.handleError(e);
          }
        },
      });
  }

  public editProfileName(profile: CvProfile): void {
    this.dialogs
      .open<string>(new PolymorpheusComponent(EditProfile), {
        label: this.transloco.translate('cv.actions.edit.label'),
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
            this.taigaAlerts.showSuccess('alerts.profiles.renamed').subscribe();
          } catch (e) {
            this.handleError(e);
          }
        }
      });
  }

  public reloadProfile(): void {
    const profile = this.selectedProfile();
    if (profile) {
      try {
        this.profileService.loadProfileToActive(profile.id);
        this.taigaAlerts.showSuccess('alerts.profiles.reloaded').subscribe();
      } catch (e) {
        this.handleError(e);
      }
    }
  }

  private handleError(e: unknown): void {
    const message = e instanceof Error ? e.message : 'Error desconocido';

    this.taigaAlerts.showError('alerts.generic_error', { details: message }).subscribe();
  }
}
