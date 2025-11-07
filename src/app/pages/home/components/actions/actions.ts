import {Component, effect, inject, INJECTOR, input, output, signal} from '@angular/core';
import {TuiButton, TuiDialog, TuiDialogService, TuiHint} from '@taiga-ui/core';
import {
  TuiSelectDirective, TuiSwitch,
} from '@taiga-ui/kit';
import {FormsModule} from '@angular/forms';
import {TuiIcon, TuiTextfield} from '@taiga-ui/core';
import {TuiChevron, TuiDataListWrapper, TuiTooltip} from '@taiga-ui/kit';
import {ProfileService} from '../../../../services/profile/profile.service';
import {CvProfile} from '../../../../../../shared/types/Types';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';

@Component({
  selector: 'app-actions',
  imports: [
    TuiButton,
    TuiSelectDirective,
    TuiTextfield,
    TuiChevron,
    TuiDataListWrapper,
    TuiIcon,
    TuiTooltip,
    FormsModule,
    TuiSwitch,
    TuiHint
  ],
  templateUrl: './actions.html',
  styleUrl: './actions.css',
})
export class Actions {
  private readonly profileService = inject(ProfileService);
  private readonly dialogs = inject(TuiDialogService);
  private readonly injector = inject(INJECTOR);

  isLoading = input.required<boolean>();
  isCvValid = input.required<boolean>();

  save = output<void>();
  download = output<void>();
  clear = output<void>();

  protected readonly profiles = signal<CvProfile[]>([]);
  protected selectedProfileId = signal<string | null>(null);

  protected readonly profileStringifier = (profile: CvProfile): string => profile.name;

  constructor() {
    this.loadProfiles();

    effect(() => {
      const id = this.selectedProfileId();
      if (id) {
        this.profileService.loadProfileToActive(id);
      }
    });
  }

  private loadProfiles(): void {
    this.profiles.set(this.profileService.getProfiles());
  }

  protected createNewProfile(): void {
    this.dialogs
      .open<string>(
        new PolymorpheusComponent(TuiDialog, this.injector),
        {
          label: 'Crear nuevo perfil de CV',
          data: {
            heading: '¿Qué nombre querés darle?',
            button: 'Crear',
          },
        }
      )
      .subscribe((name) => {
        if (name) {
          const newProfile = this.profileService.saveCurrentCvAsProfile(name);
          this.profiles.set(this.profileService.getProfiles());
          this.selectedProfileId.set(newProfile.id);
        }
      });
  }

  protected editProfileName(profile: CvProfile): void {
    this.dialogs
      .open<string>({
        label: 'Editar nombre',
        data: {
          heading: 'Ingresá el nuevo nombre',
          value: profile.name,
          button: 'Guardar',
        },
        injector: this.injector,
      })
      .subscribe((newName) => {
        if (newName && newName !== profile.name) {
          const updatedProfiles = this.profileService.updateProfileName(profile.id, newName);
          this.profiles.set(updatedProfiles);
        }
      });
  }

  protected reloadProfile(): void {
    const id = this.selectedProfileId();
    if (id) {
      this.profileService.loadProfileToActive(id);
    }
  }

  protected deleteProfile(id: string): void {
    const updatedProfiles = this.profileService.deleteProfile(id);
    this.profiles.set(updatedProfiles);
    if (this.selectedProfileId() === id) {
      this.selectedProfileId.set(null);
    }
  }

  protected clearSelection(): void {
    this.selectedProfileId.set(null);
  }

  protected clearForm(): void {
    this.clearSelection();
    this.clear.emit();
  }
}
