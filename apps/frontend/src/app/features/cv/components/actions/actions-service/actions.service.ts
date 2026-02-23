import { effect, inject, Injectable, signal, untracked, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { TuiDialogService } from '@taiga-ui/core';
import { TUI_CONFIRM } from '@taiga-ui/kit';
import { CvForm, CvProfile } from '@smartcv/types';
import { CvFormDataService } from '../../../services/cv-form/cv-form-data/cv-form-data.service';
import { ProfileService } from '../../../../../core/services/profile/profile.service';
import { CvStateService } from '../../../services/cv-form/cv-form-state/cv-state.service';
import { TaigaAlertsService } from '../../../../../core/services/alerts/taiga-alerts.service';
import { CreateProfile } from '../profile/create-profile/create-profile';
import { EditProfile } from '../profile/edit-profile/edit-profile';
import { TranslocoService } from '@jsverse/transloco';
import { filter } from 'rxjs';

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
  private readonly destroyRef = inject(DestroyRef);

  public readonly selectedProfile = signal<CvProfile | null>(null);
  public readonly profiles = this.profileService.profiles;

  public readonly isCvValid = this.cvState.isValid;
  public readonly isCvLocked = this.cvState.isCvLocked;
  public readonly isLoading = this.cvState.isLoading;
  public readonly template = this.cvState.template;

  constructor() {
    effect(() => {
      const profiles = this.profiles();
      const lastProfileId = this.profileService.getLastActiveProfileId();

      if (profiles.length > 0 && lastProfileId && !this.selectedProfile()) {
        const foundProfile = profiles.find((p) => p.id === lastProfileId);
        if (foundProfile) {
          untracked(() => {
            this.selectedProfile.set(foundProfile);
          });
        }
      }
    });

    this.profileService.profileIdChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((change) => {
        const { oldId, newId } = change;
        const current = this.selectedProfile();
        if (current && current.id === oldId) {
          this.selectedProfile.set({ ...current, id: newId });
          this.profileService.saveLastActiveProfileId(newId);
          console.log(`Updated active profile ID from ${oldId} to ${newId}`);
        }
      });
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
      this.clearForm(false); // No confirmation needed when switching to "empty" via select
    }
  }

  public deleteProfile(id: string): void {
    this.dialogs
      .open<boolean>(TUI_CONFIRM, {
        label: '¿Eliminar perfil?',
        size: 's',
        data: {
          content: 'Esta acción no se puede deshacer.',
          yes: 'Eliminar',
          no: 'Cancelar',
        },
      })
      .pipe(filter((yes) => yes))
      .subscribe(() => {
        this.profileService.deleteProfile(id);
        if (this.selectedProfile()?.id === id) {
          this.selectedProfile.set(null);
          this.profileService.saveLastActiveProfileId(null);
          this.clearForm(false); // Don't ask again
        }
        this.taigaAlerts.showInfo('alerts.profiles.deleted').subscribe();
      });
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
    this.dataService.downloadPdf(rawData, this.template());
  }

  public clearForm(requireConfirmation = true): void {
    if (requireConfirmation) {
      this.dialogs
        .open<boolean>(TUI_CONFIRM, {
          label: '¿Limpiar formulario?',
          size: 's',
          data: {
            content: 'Se perderán todos los datos no guardados.',
            yes: 'Limpiar',
            no: 'Cancelar',
          },
        })
        .pipe(filter((yes) => yes))
        .subscribe(() => {
          this.performClear();
        });
    } else {
      this.performClear();
    }
  }

  private performClear(): void {
    this.selectedProfile.set(null);
    this.cvState.resetForm();
    this.taigaAlerts.showInfo('alerts.forms.cleared').subscribe();
  }

  public toggleLock(locked: boolean): void {
    this.cvState.setLockState(locked);
  }

  public setTemplate(template: string): void {
    this.cvState.setTemplate(template);
  }

  public createNewProfile(): void {
    const cvEsValido = this.isCvValid();
    const hasSelectedProfile = !!this.selectedProfile();
    console.log(
      `[ActionsService] createNewProfile() - cvEsValido: ${cvEsValido}, hasSelectedProfile: ${hasSelectedProfile}`,
    );

    if (cvEsValido && this.selectedProfile()) {
      console.log('[ActionsService] Guardando perfil actual antes de crear uno nuevo...');
      this.saveCv(true);
    }

    this.dialogs
      .open<string>(new PolymorpheusComponent(CreateProfile), {
        label: this.transloco.translate('cv.actions.create.label'),
        size: 's',
      })
      .subscribe({
        next: (name) => {
          console.log(`[ActionsService] Dialog devolvió nombre: "${name}" (type: ${typeof name})`);
          if (!name) {
            console.warn('[ActionsService] Nombre vacío/undefined, abortando creación');
            return;
          }

          try {
            let newProfile: CvProfile;

            if (cvEsValido) {
              console.log('[ActionsService] CV válido → saveCurrentCvAsProfile');
              this.saveCv(true);
              newProfile = this.profileService.saveCurrentCvAsProfile(name);
              this.taigaAlerts.showSuccess('alerts.profiles.created_from_data').subscribe();
            } else {
              console.log('[ActionsService] CV inválido → createEmptyProfile');
              newProfile = this.profileService.createEmptyProfile(name);
              this.taigaAlerts.showSuccess('alerts.profiles.created_empty').subscribe();
            }

            console.log(
              `[ActionsService] ✅ Perfil creado localmente: id=${newProfile.id}, name=${newProfile.name}`,
            );
            this.selectedProfile.set(newProfile);
          } catch (e) {
            console.error('[ActionsService] ❌ Error en createNewProfile:', e);
            this.handleError(e);
          }
        },
        error: (err) => {
          console.error('[ActionsService] ❌ Error en dialog de crear perfil:', err);
        },
        complete: () => {
          console.log('[ActionsService] Dialog de crear perfil cerrado');
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
