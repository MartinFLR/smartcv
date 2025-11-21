import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Actions } from './actions';
import { ProfileService } from '../../../../core/services/profile/profile.service';
import { TuiAlertService } from '@taiga-ui/core';
import { TuiDialogService } from '@taiga-ui/experimental'; // Ojo: según tu import en el componente es experimental
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { signal } from '@angular/core';
import { of, throwError } from 'rxjs';
import { jest } from '@jest/globals';
import { MOCK_CV_PROFILE } from '../../../../shared/testing/mocks/cv.form.mock';

jest.mock('./profile/create-profile/create-profile', () => ({
  CreateProfile: class MockCreateProfile {},
}));
jest.mock('./profile/edit-profile/edit-profile', () => ({
  EditProfile: class MockEditProfile {},
}));

describe('Actions Component', () => {
  let component: Actions;
  let fixture: ComponentFixture<Actions>;

  const profileServiceMock = {
    profiles: signal([MOCK_CV_PROFILE]),
    loadProfileToActive: jest.fn(),
    updateActiveProfileData: jest.fn(),
    deleteProfile: jest.fn(),
    saveCurrentCvAsProfile: jest
      .fn()
      .mockReturnValue({ ...MOCK_CV_PROFILE, id: 'new-id', name: 'Nuevo Perfil' }),
    createEmptyProfile: jest
      .fn()
      .mockReturnValue({ ...MOCK_CV_PROFILE, id: 'empty-id', name: 'Perfil Vacío' }),
    updateProfileName: jest.fn().mockReturnValue({ ...MOCK_CV_PROFILE, name: 'Nombre Editado' }),
  };

  const dialogServiceMock = {
    open: jest.fn().mockReturnValue(of('Input Usuario')),
  };

  const alertServiceMock = {
    open: jest.fn().mockReturnValue(of(true)),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Actions,
        TranslocoTestingModule.forRoot({
          langs: { en: {}, es: {} },
          translocoConfig: { availableLangs: ['en', 'es'], defaultLang: 'es' },
        }),
      ],
      providers: [
        provideAnimations(),
        { provide: ProfileService, useValue: profileServiceMock },
        { provide: TuiDialogService, useValue: dialogServiceMock },
        { provide: TuiAlertService, useValue: alertServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Actions);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('isLoading', false);
    fixture.componentRef.setInput('isCvValid', true);
    fixture.componentRef.setInput('isCvLocked', false);

    jest.spyOn(component.save, 'emit');
    jest.spyOn(component.clear, 'emit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Profile Switching (onProfileChange)', () => {
    it('should load profile and emit alert when selecting a profile', () => {
      component['onProfileChange'](MOCK_CV_PROFILE);

      expect(component['selectedProfile']()).toBe(MOCK_CV_PROFILE);
      expect(alertServiceMock.open).toHaveBeenCalled();
    });

    it('should save previous profile if CV was valid before switching', () => {
      component['selectedProfile'].set(MOCK_CV_PROFILE);
      fixture.componentRef.setInput('isCvValid', true);

      const newProfile = { ...MOCK_CV_PROFILE, id: 'other-id' };

      component['onProfileChange'](newProfile);

      expect(component.save.emit).toHaveBeenCalled();
      expect(profileServiceMock.updateActiveProfileData).toHaveBeenCalledWith(MOCK_CV_PROFILE.id);
      expect(alertServiceMock.open).toHaveBeenCalled();
    });

    it('should catch error if saving previous profile fails', () => {
      // Arrange
      component['selectedProfile'].set(MOCK_CV_PROFILE);
      profileServiceMock.updateActiveProfileData.mockImplementationOnce(() => {
        throw new Error('Error al guardar');
      });

      // Act
      component['onProfileChange'](null);

      // Assert
      expect(alertServiceMock.open).toHaveBeenCalledWith(
        expect.stringContaining('Error al guardar'),
        expect.objectContaining({ appearance: 'error' }),
      );
    });
  });

  describe('Create New Profile (createNewProfile)', () => {
    it('should create valid profile (Save + Create) if CV is valid', () => {
      fixture.componentRef.setInput('isCvValid', true);
      dialogServiceMock.open.mockReturnValue(of('Mi Nuevo Perfil'));

      component['createNewProfile']();

      expect(component.save.emit).toHaveBeenCalled();
      expect(profileServiceMock.saveCurrentCvAsProfile).toHaveBeenCalledWith('Mi Nuevo Perfil');
      expect(component['selectedProfile']()?.id).toBe('new-id');
    });

    it('should create empty profile if CV is invalid', () => {
      fixture.componentRef.setInput('isCvValid', false);
      dialogServiceMock.open.mockReturnValue(of('Perfil Vacio'));

      component['createNewProfile']();

      expect(component.save.emit).not.toHaveBeenCalled();
      expect(profileServiceMock.createEmptyProfile).toHaveBeenCalledWith('Perfil Vacio');
      expect(component['selectedProfile']()?.id).toBe('empty-id');
    });
  });

  describe('Edit Profile Name', () => {
    it('should update profile name if changed', () => {
      const profile = MOCK_CV_PROFILE;
      component['selectedProfile'].set(profile);
      dialogServiceMock.open.mockReturnValue(of('Nombre Editado'));

      component['editProfileName'](profile);

      expect(profileServiceMock.updateProfileName).toHaveBeenCalledWith(
        profile.id,
        'Nombre Editado',
      );
      expect(component['selectedProfile']()?.name).toBe('Nombre Editado');
    });
  });

  describe('Delete Profile', () => {
    it('should delete and clear selection if current profile deleted', () => {
      component['selectedProfile'].set(MOCK_CV_PROFILE);

      component['deleteProfile'](MOCK_CV_PROFILE.id);

      expect(profileServiceMock.deleteProfile).toHaveBeenCalledWith(MOCK_CV_PROFILE.id);
      expect(component['selectedProfile']()).toBeNull();
    });
  });

  describe('Form Actions', () => {
    it('should save CV', () => {
      component['selectedProfile'].set(MOCK_CV_PROFILE);

      component['saveCv']();

      expect(component.save.emit).toHaveBeenCalled();
      expect(profileServiceMock.updateActiveProfileData).toHaveBeenCalledWith(MOCK_CV_PROFILE.id);
    });

    it('should clear form and trigger clear output via effect', () => {
      component['clearForm']();
      fixture.detectChanges();

      expect(component['selectedProfile']()).toBeNull();
    });
  });
});
