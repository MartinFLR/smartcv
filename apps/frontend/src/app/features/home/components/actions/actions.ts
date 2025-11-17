import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { TuiAlertService, TuiButton, TuiGroup, TuiHint, TuiTextfield } from '@taiga-ui/core';
import { TuiSelect, TuiSwitch, TuiChevron, TuiDataListWrapper } from '@taiga-ui/kit';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../../../../core/services/profile/profile.service';
import { CvProfile } from '@smartcv/types';
import { TuiDialogService } from '@taiga-ui/experimental';
import { CreateProfile } from './profile/create-profile/create-profile';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { EditProfile } from './profile/edit-profile/edit-profile';
import { TuiRipple } from '@taiga-ui/addon-mobile';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-actions',
  standalone: true,
  imports: [
    TuiButton,
    TuiTextfield,
    TuiSelect,
    TuiChevron,
    TuiDataListWrapper,
    FormsModule,
    TuiSwitch,
    TuiHint,
    TuiRipple,
    TuiGroup,
    TranslocoDirective,
  ],
  templateUrl: './actions.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './actions.css',
})
export class Actions {
  private readonly profileService = inject(ProfileService);
  private readonly dialogs = inject(TuiDialogService);
  private readonly alerts = inject(TuiAlertService);

  isLoading = input.required<boolean>();
  isCvValid = input.required<boolean>();
  isCvLocked = input.required<boolean>();

  lockCv = output<boolean>();
  save = output<void>();
  download = output<void>();
  clear = output<void>();

  protected readonly profiles = this.profileService.profiles;
  protected selectedProfile = signal<CvProfile | null>(null);

  protected readonly profileStringifier = (profile: CvProfile): string => profile.name;

  constructor() {
    effect(() => {
      const currentProfile = this.selectedProfile();
      if (currentProfile) {
        this.profileService.loadProfileToActive(currentProfile.id);
      } else {
        this.clear.emit();
      }
    });
  }

  protected onProfileChange(profile: CvProfile | null): void {
    const previousProfile = this.selectedProfile();

    if (previousProfile && this.isCvValid()) {
      try {
        this.save.emit();
        this.profileService.updateActiveProfileData(previousProfile.id);
        this.showAlert(`Perfil "${previousProfile.name}" guardado.`);
      } catch (e) {
        this.showError((e as Error).message);
      }
    }

    this.selectedProfile.set(profile);

    if (profile) {
      this.showAlert(`Perfil "${profile.name}" cargado.`, 'info');
    }
  }

  protected createNewProfile(): void {
    const cvEsValido = this.isCvValid();

    if (cvEsValido && this.selectedProfile()) {
      this.saveCv();
    }

    this.dialogs
      .open<string>(new PolymorpheusComponent(CreateProfile), {
        label: 'Crear Nuevo Perfil',
        size: 's',
      })
      .subscribe((name) => {
        if (name) {
          try {
            let newProfile: CvProfile;

            if (cvEsValido) {
              this.save.emit();
              newProfile = this.profileService.saveCurrentCvAsProfile(name);
              this.showAlert('Perfil guardado y cargado.');
            } else {
              newProfile = this.profileService.createEmptyProfile(name);
              this.showAlert('Nuevo perfil vacío creado.');
            }

            this.selectedProfile.set(newProfile);
          } catch (e) {
            this.showError((e as Error).message);
          }
        }
      });
  }

  protected editProfileName(profile: CvProfile): void {
    this.dialogs
      .open<string>(new PolymorpheusComponent(EditProfile), {
        label: 'Editar Perfil',
        size: 's',
        data: profile.name,
      })
      .subscribe((newName) => {
        if (newName && newName !== profile.name) {
          try {
            const updatedProfile = this.profileService.updateProfileName(profile.id, newName);
            if (this.selectedProfile()?.id === updatedProfile.id) {
              this.selectedProfile.set(updatedProfile);
              this.showAlert(`Perfil actualizado.`);
            }
          } catch (e) {
            this.showError((e as Error).message);
          }
        }
      });
  }

  protected deleteProfile(id: string): void {
    this.profileService.deleteProfile(id);
    if (this.selectedProfile()?.id === id) {
      this.selectedProfile.set(null);
    }
  }

  protected reloadProfile(): void {
    const profile = this.selectedProfile();
    if (profile) {
      try {
        this.profileService.loadProfileToActive(profile.id);
        this.showAlert('CV Recargado correctamente.');
      } catch (e) {
        this.showError((e as Error).message);
      }
    }
  }

  protected saveCv(): void {
    this.save.emit();

    const profile = this.selectedProfile();
    if (profile) {
      try {
        this.profileService.updateActiveProfileData(profile.id);
        this.showAlert('CV Guardado y perfil actualizado.');
      } catch (e) {
        this.showError((e as Error).message);
      }
    }
  }

  protected clearSelection(): void {
    this.selectedProfile.set(null);
  }

  protected clearForm(): void {
    this.selectedProfile.set(null); // Esto dispara el effect, que va llamar a clear.emit()
  }

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
