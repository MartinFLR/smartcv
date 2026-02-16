import { TestBed } from '@angular/core/testing';
import { ProfileService } from './profile.service';
import { SaveDataService } from '../save-data/save-data.service';
import { DOCUMENT } from '@angular/common';
import { jest } from '@jest/globals';
import { CvForm, CvProfile } from '@smartcv/types';
import { MOCK_CV_FORM } from '../../../shared/testing/mocks/cv.form.mock';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
describe('ProfileService', () => {
  let service: ProfileService;
  const saveDataServiceMock = {
    activeCv: jest.fn(),
    saveData: jest.fn(),
    loadMeta: jest.fn().mockReturnValue({ isLocked: false }),
    saveMeta: jest.fn(),
  };
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
  };
  const documentMock = {
    defaultView: {
      localStorage: localStorageMock,
    },
  };
  const httpClientMock = {
    get: jest.fn().mockReturnValue(throwError(() => new Error('Network error'))),
    post: jest.fn().mockReturnValue(of({})),
    put: jest.fn().mockReturnValue(of({})),
    delete: jest.fn().mockReturnValue(of({})),
  };
  const mockUuid = '1234-5678-9012';
  Object.defineProperty(global, 'crypto', {
    value: {
      randomUUID: jest.fn().mockReturnValue(mockUuid),
    },
    writable: true,
  });
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    TestBed.configureTestingModule({
      providers: [
        ProfileService,
        { provide: SaveDataService, useValue: saveDataServiceMock },
        { provide: DOCUMENT, useValue: documentMock },
        { provide: HttpClient, useValue: httpClientMock },
      ],
    });
    service = TestBed.inject(ProfileService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(localStorageMock.getItem).toHaveBeenCalledWith('cv-profiles');
  });
  describe('Initialization', () => {
    it('should initialize with empty array if storage is null', () => {
      expect(service.profiles()).toEqual([]);
    });
    it('should load profiles from storage if they exist', () => {
      jest.clearAllMocks();
      const storedProfiles = [{ id: 'abc', name: 'Stored Profile', data: {} }];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(storedProfiles));
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          ProfileService,
          { provide: SaveDataService, useValue: saveDataServiceMock },
          { provide: DOCUMENT, useValue: documentMock },
          { provide: HttpClient, useValue: httpClientMock },
        ],
      });
      const newService = TestBed.inject(ProfileService);
      expect(newService.profiles()).toHaveLength(1);
      expect(newService.profiles()[0].id).toBe('abc');
    });
  });
  describe('Profile Management', () => {
    it('should create an empty profile, add it to state and persist it', () => {
      // Act
      const profile = service.createEmptyProfile('New Profile');
      // Assert
      expect(profile.name).toBe('New Profile');
      expect(profile.id).toBe(mockUuid);
      expect(service.profiles()).toContainEqual(profile);
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'cv-profiles',
        JSON.stringify([profile]),
      );
    });
    it('should delete profile and update storage', () => {
      // Arrange
      service.createEmptyProfile('To Delete');
      expect(service.profiles().length).toBe(1);
      // Act
      service.deleteProfile(mockUuid);
      // Assert
      expect(service.profiles().length).toBe(0);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('cv-profiles', '[]');
    });
    it('should update profile name', () => {
      // Arrange
      service.createEmptyProfile('Original Name');
      // Act
      const updated = service.updateProfileName(mockUuid, 'Updated Name');
      // Assert
      expect(updated.name).toBe('Updated Name');
      expect(service.profiles()[0].name).toBe('Updated Name');
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });
    it('should throw error when updating non-existent profile name', () => {
      expect(() => service.updateProfileName('non-existent-id', 'Name')).toThrow(
        'Perfil no encontrado para actualizar.',
      );
    });
  });
  describe('Interaction with Active CV', () => {
    it('should load profile to active (SaveDataService)', () => {
      const profile = service.createEmptyProfile('Test Load');
      const result = service.loadProfileToActive(mockUuid);
      expect(result).toBe(true);
      expect(saveDataServiceMock.saveData).toHaveBeenCalledWith(profile.data);
    });
    it('should return false if trying to load non-existent profile', () => {
      const result = service.loadProfileToActive('ghost-id');
      expect(result).toBe(false);
      expect(saveDataServiceMock.saveData).not.toHaveBeenCalled();
    });
    it('should save current CV as new profile', () => {
      saveDataServiceMock.activeCv.mockReturnValue(MOCK_CV_FORM);
      // Act
      const newProfile = service.saveCurrentCvAsProfile('Backup CV');
      // Assert
      expect(newProfile.name).toBe('Backup CV');
      expect(newProfile.data).toEqual(MOCK_CV_FORM); // Debe ser una copia
      expect(newProfile.jobTitle).toBe(MOCK_CV_FORM.personalInfo.job);
      expect(service.profiles()).toContainEqual(newProfile);
    });
    it('should throw error if trying to save profile without active CV', () => {
      // Arrange
      saveDataServiceMock.activeCv.mockReturnValue(null);
      // Act & Assert
      expect(() => service.saveCurrentCvAsProfile('Fail')).toThrow(
        'No hay CV activo para guardar.',
      );
    });
    it('should update active profile data', () => {
      // Arrange
      service.createEmptyProfile('My Profile'); // ID: mockUuid
      const modifiedCv = {
        ...MOCK_CV_FORM,
        personalInfo: { ...MOCK_CV_FORM.personalInfo, job: 'New Job Title' },
      };
      saveDataServiceMock.activeCv.mockReturnValue(modifiedCv);
      // Act
      service.updateActiveProfileData(mockUuid);
      // Assert
      const updatedProfile = service.profiles().find((p) => p.id === mockUuid);
      expect(updatedProfile?.data).toEqual(modifiedCv);
      expect(updatedProfile?.jobTitle).toBe('New Job Title');
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });
  });
});
