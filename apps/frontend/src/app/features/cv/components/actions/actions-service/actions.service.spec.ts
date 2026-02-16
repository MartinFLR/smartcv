import { TestBed } from '@angular/core/testing';
import { ActionsService } from './actions.service';
import { ProfileService } from '../../../../../core/services/profile/profile.service';
import { CvStateService } from '../../../services/cv-form/cv-form-state/cv-state.service';
import { CvFormDataService } from '../../../services/cv-form/cv-form-data/cv-form-data.service';
import { TuiDialogService } from '@taiga-ui/experimental';
import { TaigaAlertsService } from '../../../../../core/services/alerts/taiga-alerts.service';
import { TranslocoService } from '@jsverse/transloco';
import { signal } from '@angular/core';
import { of, Subject } from 'rxjs';
import { MOCK_CV_PROFILE } from '../../../../../shared/testing/mocks/cv.form.mock';
import { CvForm } from '@smartcv/types';

// Mocks for Polymorpheus components to avoid dependency issues
jest.mock('../profile/create-profile/create-profile', () => ({
  CreateProfile: class MockCreateProfile {},
}));
jest.mock('../profile/edit-profile/edit-profile', () => ({
  EditProfile: class MockEditProfile {},
}));

describe('ActionsService', () => {
  let service: ActionsService;

  const profileServiceMock = {
    profiles: signal([MOCK_CV_PROFILE]),
    profileIdChange: new Subject<{ oldId: string; newId: string }>(),
    getLastActiveProfileId: jest.fn(),
    saveLastActiveProfileId: jest.fn(),
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

  const cvStateServiceMock = {
    isValid: signal(true),
    isCvLocked: signal(false),
    isLoading: signal(false),
    template: signal('harvard'),
    cvForm: {
      getRawValue: jest.fn().mockReturnValue({} as CvForm),
    },
    resetForm: jest.fn(),
    setLockState: jest.fn(),
    setTemplate: jest.fn(),
  };

  const cvFormDataServiceMock = {
    saveCv: jest.fn(),
    downloadPdf: jest.fn(),
  };

  const dialogServiceMock = {
    open: jest.fn().mockReturnValue(of('Input Usuario')),
  };

  const taigaAlertsServiceMock = {
    showSuccess: jest.fn().mockReturnValue(of(null)),
    showWarning: jest.fn().mockReturnValue(of(null)),
    showError: jest.fn().mockReturnValue(of(null)),
    showInfo: jest.fn().mockReturnValue(of(null)),
  };

  const translocoServiceMock = {
    translate: jest.fn().mockReturnValue('Translated Text'),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      providers: [
        ActionsService,
        { provide: ProfileService, useValue: profileServiceMock },
        { provide: CvStateService, useValue: cvStateServiceMock },
        { provide: CvFormDataService, useValue: cvFormDataServiceMock },
        { provide: TuiDialogService, useValue: dialogServiceMock },
        { provide: TaigaAlertsService, useValue: taigaAlertsServiceMock },
        { provide: TranslocoService, useValue: translocoServiceMock },
      ],
    });
    service = TestBed.inject(ActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Profile Switching (selectProfile)', () => {
    it('should load profile and emit alert when selecting a profile', () => {
      service.selectProfile(MOCK_CV_PROFILE);

      expect(service.selectedProfile()).toBe(MOCK_CV_PROFILE);
      expect(profileServiceMock.loadProfileToActive).toHaveBeenCalledWith(MOCK_CV_PROFILE.id);
      expect(taigaAlertsServiceMock.showInfo).toHaveBeenCalled();
    });

    it('should save previous profile if CV was valid before switching', () => {
      // Simulate existing profile
      service.selectedProfile.set(MOCK_CV_PROFILE);
      cvStateServiceMock.isValid.set(true);

      const newProfile = { ...MOCK_CV_PROFILE, id: 'other-id' };

      service.selectProfile(newProfile);

      expect(cvFormDataServiceMock.saveCv).toHaveBeenCalled();
      expect(profileServiceMock.updateActiveProfileData).toHaveBeenCalledWith(MOCK_CV_PROFILE.id);
      expect(taigaAlertsServiceMock.showInfo).toHaveBeenCalled();
    });

    it('should clear form if null is selected', () => {
      service.selectProfile(null);

      expect(service.selectedProfile()).toBeNull();
      expect(cvStateServiceMock.resetForm).toHaveBeenCalled();
    });
  });

  describe('Create New Profile (createNewProfile)', () => {
    it('should create valid profile (Save + Create) if CV is valid', () => {
      cvStateServiceMock.isValid.set(true);
      service.selectedProfile.set(MOCK_CV_PROFILE); // Ensure we have a profile to trigger save logic if needed
      dialogServiceMock.open.mockReturnValue(of('Mi Nuevo Perfil'));

      service.createNewProfile();

      expect(cvFormDataServiceMock.saveCv).toHaveBeenCalled();
      expect(profileServiceMock.saveCurrentCvAsProfile).toHaveBeenCalledWith('Mi Nuevo Perfil');
      expect(service.selectedProfile()?.id).toBe('new-id');
    });

    it('should create empty profile if CV is invalid', () => {
      cvStateServiceMock.isValid.set(false);
      dialogServiceMock.open.mockReturnValue(of('Perfil Vacio'));

      service.createNewProfile();

      expect(profileServiceMock.createEmptyProfile).toHaveBeenCalledWith('Perfil Vacio');
      expect(service.selectedProfile()?.id).toBe('empty-id');
    });
  });

  describe('Edit Profile Name', () => {
    it('should update profile name if changed', () => {
      const profile = MOCK_CV_PROFILE;
      service.selectedProfile.set(profile);
      dialogServiceMock.open.mockReturnValue(of('Nombre Editado'));

      service.editProfileName(profile);

      expect(profileServiceMock.updateProfileName).toHaveBeenCalledWith(
        profile.id,
        'Nombre Editado',
      );
      expect(service.selectedProfile()?.name).toBe('Nombre Editado');
    });
  });

  describe('Delete Profile', () => {
    it('should delete and clear selection if current profile deleted', () => {
      service.selectedProfile.set(MOCK_CV_PROFILE);

      service.deleteProfile(MOCK_CV_PROFILE.id);

      expect(profileServiceMock.deleteProfile).toHaveBeenCalledWith(MOCK_CV_PROFILE.id);
      expect(service.selectedProfile()).toBeNull();
      expect(cvStateServiceMock.resetForm).toHaveBeenCalled();
    });
  });

  describe('Form Actions', () => {
    it('should save CV', () => {
      service.selectedProfile.set(MOCK_CV_PROFILE);

      service.saveCv();

      expect(cvFormDataServiceMock.saveCv).toHaveBeenCalled();
      expect(profileServiceMock.updateActiveProfileData).toHaveBeenCalledWith(MOCK_CV_PROFILE.id);
    });

    it('should clear form', () => {
      service.clearForm();

      expect(service.selectedProfile()).toBeNull();
      expect(cvStateServiceMock.resetForm).toHaveBeenCalled();
    });

    it('should download PDF if CV is valid', () => {
      cvStateServiceMock.isValid.set(true);
      service.downloadPdf();
      expect(cvFormDataServiceMock.downloadPdf).toHaveBeenCalled();
    });

    it('should NOT download PDF if CV is invalid', () => {
      cvStateServiceMock.isValid.set(false);
      service.downloadPdf();
      expect(cvFormDataServiceMock.downloadPdf).not.toHaveBeenCalled();
    });
  });
});
