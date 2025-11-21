import { TestBed } from '@angular/core/testing';
import { SaveDataService } from './save-data.service';
import { WA_LOCAL_STORAGE } from '@ng-web-apis/common';
import { jest } from '@jest/globals';
import { MOCK_CV_FORM } from '../../../shared/testing/mocks/cv.form.mock';
import { DOCUMENT } from '@angular/common';

describe('SaveDataService', () => {
  let service: SaveDataService;

  const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  };

  const documentMock = {
    defaultView: {
      localStorage: mockLocalStorage,
    },
  };

  // Helper para inyectar un servicio fresco con un estado inicial específico
  const injectServiceWithStorage = (data: string | null) => {
    mockLocalStorage.getItem.mockReturnValue(data);

    TestBed.resetTestingModule(); // Reinicia el TestBed para cargar el nuevo mock de storage
    TestBed.configureTestingModule({
      providers: [
        SaveDataService,
        { provide: WA_LOCAL_STORAGE, useValue: mockLocalStorage },
        { provide: DOCUMENT, useValue: documentMock },
      ],
    });
    return TestBed.inject(SaveDataService);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockLocalStorage.setItem.mockImplementation(() => {});
    mockLocalStorage.removeItem.mockImplementation(() => {});
    mockLocalStorage.getItem.mockReturnValue(null);

    TestBed.configureTestingModule({
      providers: [
        SaveDataService,
        { provide: WA_LOCAL_STORAGE, useValue: mockLocalStorage },
        { provide: DOCUMENT, useValue: documentMock },
      ],
    });

    service = TestBed.inject(SaveDataService);
  });

  it('should be created and initialize with null CV data', () => {
    expect(service).toBeTruthy();
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('angular-cv-data');
    expect(service.activeCv()).toBeNull();
  });

  // ----------------------------------------------------------------------------------------------------

  describe('Data Loading (loadDataInternal)', () => {
    it('should load saved data on initialization and set activeCv signal', () => {
      const serializedData = JSON.stringify(MOCK_CV_FORM);

      const newService = injectServiceWithStorage(serializedData);

      expect(newService.activeCv()).toEqual(MOCK_CV_FORM);
    });

    it('should return null and clear storage if data is corrupted (SyntaxError path)', () => {
      // Arrange: Datos corruptos
      const corruptedData = '{"cv": "data" error';

      const newService = injectServiceWithStorage(corruptedData);

      // Assert
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('angular-cv-data');
      expect(newService.activeCv()).toBeNull();
    });
  });

  // ----------------------------------------------------------------------------------------------------

  describe('saveData', () => {
    it('should save data to storage and update activeCv signal', () => {
      const cvToSave = {
        ...MOCK_CV_FORM,
        personalInfo: { ...MOCK_CV_FORM.personalInfo, name: 'Guardado Test' },
      };

      service.saveData(cvToSave as any);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'angular-cv-data',
        JSON.stringify(cvToSave),
      );
      expect(service.activeCv()).toEqual(cvToSave);
    });

    it('should throw an error if localStorage fails during save', () => {
      // Arrange: Hacemos que setItem falle
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('Storage capacity exceeded');
      });

      // Act & Assert
      expect(() => service.saveData(MOCK_CV_FORM as any)).toThrow('No se pudo guardar el CV');
    });
  });

  // ----------------------------------------------------------------------------------------------------

  describe('clearData', () => {
    it('should remove item from storage and reset activeCv signal to null', () => {
      service.saveData(MOCK_CV_FORM as any);

      service.clearData();

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('angular-cv-data');
      expect(service.activeCv()).toBeNull();
    });

    it('should throw an error if localStorage fails during clear', () => {
      // Arrange
      mockLocalStorage.removeItem.mockImplementation(() => {
        throw new Error('Remove failed');
      });

      // Act & Assert
      expect(() => service.clearData()).toThrow('No se pudo limpiar los datos');
    });
  });
});
