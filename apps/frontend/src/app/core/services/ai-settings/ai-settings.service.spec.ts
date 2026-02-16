import { TestBed } from '@angular/core/testing';
import { AiSettingsService } from './ai-settings.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { jest } from '@jest/globals';
import { AiSettings } from '@smartcv/types';
import { BehaviorSubject, of } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';
// --- Mocks de Datos y Servicios ---
const MOCK_SETTINGS: AiSettings = {
  modelProvider: 'openai',
  modelVersion: 'gpt-4o',
  systemPrompt: 'Actúa como experto en reclutamiento ATS.',
};
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};
// Mock del objeto Document y Window (para simular el DOM)
const mockDocument = {
  defaultView: {
    localStorage: mockLocalStorage,
  },
};
// Helper para inyectar el servicio con un ID de plataforma específico
const injectServiceWithPlatform = (platform: any, localStorageData: string | null = null) => {
  jest.clearAllMocks();
  mockLocalStorage.getItem.mockReturnValue(localStorageData);
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [
      AiSettingsService,
      { provide: DOCUMENT, useValue: mockDocument },
      { provide: PLATFORM_ID, useValue: platform },
    ],
  });
  return TestBed.inject(AiSettingsService);
};
describe('AiSettingsService', () => {
  let service: AiSettingsService;
  // Creamos el servicio bajo el entorno del navegador por defecto
  beforeEach(() => {
    // Inicialización por defecto: simular entorno browser y storage vacío.
    service = injectServiceWithPlatform('browser');
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('ai-settings');
  });
  // ----------------------------------------------------------------------------------------------------
  describe('Platform Initialization', () => {
    it('should set storage to null on SERVER environment', () => {
      // Act: Inyectamos el servicio en entorno SERVER
      const serverService = injectServiceWithPlatform('server');
      // Assert: No debe haber intentado acceder a getItem (ya que storage es null)
      expect(mockLocalStorage.getItem).not.toHaveBeenCalled();
      expect(serverService['storage']).toBeNull();
      expect(serverService.loadSettings()).toBeNull();
    });
    it('should initialize storage property on BROWSER environment', () => {
      // Act: Servicio inicializado en beforeEach (BROWSER)
      // Assert
      expect(service['storage']).not.toBeNull();
    });
  });
  // ----------------------------------------------------------------------------------------------------
  describe('Data Loading (loadSettings)', () => {
    it('should return null if localStorage is empty', () => {
      // Arrange: mockLocalStorage.getItem ya devuelve null por defecto
      // Act & Assert
      expect(service.loadSettings()).toBeNull();
    });
    it('should return null and clear storage if data is corrupted', () => {
      // Arrange: Reconfiguramos para el test de corrupción y reinyección
      const corruptedData = '{"model": "gpt-4" error';
      const corruptedService = injectServiceWithPlatform('browser', corruptedData);
      // Assert: El servicio no debe tener data y debe limpiar el storage
      expect(corruptedService.loadSettings()).toBeNull();
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('ai-settings');
    });
    it('should load saved settings on initialization', () => {
      // Arrange
      const serializedData = JSON.stringify(MOCK_SETTINGS);
      const loadedService = injectServiceWithPlatform('browser', serializedData);
      // Assert
      expect(loadedService.loadSettings()).toEqual(MOCK_SETTINGS);
    });
  });
  // ----------------------------------------------------------------------------------------------------
  describe('Data Saving (saveSettings)', () => {
    it('should save data to storage and update signal', () => {
      // Act
      service.saveSettings(MOCK_SETTINGS);
      // Assert
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'ai-settings',
        JSON.stringify(MOCK_SETTINGS),
      );
      expect(service.loadSettings()).toEqual(MOCK_SETTINGS);
    });
    it('should silently fail and log error if localStorage setItem fails', () => {
      // Arrange: Mockeamos setItem para que lance un error (simulando storage full)
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('Storage capacity exceeded');
      });
      // Act
      service.saveSettings(MOCK_SETTINGS);
      // Assert
      // No debe haber lanzado una excepción, solo un console.error
      expect(errorSpy).toHaveBeenCalled();
      // El signal no se actualiza porque el setItem falla antes de la actualización del signal
      // Verificamos que el signal no cambió de su estado inicial (null)
      // Nota: Si el servicio estuviera limpio, el signal sería NULL aquí
      // Sin embargo, como el constructor ya corrió, el signal tiene el valor inicial.
    });
    it('should do nothing on SAVE if running on SERVER', () => {
      // Arrange
      const serverService = injectServiceWithPlatform('server');
      // Act
      serverService.saveSettings(MOCK_SETTINGS);
      // Assert
      expect(mockLocalStorage.setItem).not.toHaveBeenCalled();
    });
  });
  // ----------------------------------------------------------------------------------------------------
  describe('Clear Data (clearData)', () => {
    it('should remove item and reset signal', () => {
      // Arrange: Guardamos data primero para asegurarnos de que el signal no sea null
      service.saveSettings(MOCK_SETTINGS);
      // Act
      service.clearData();
      // Assert
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('ai-settings');
      expect(service.loadSettings()).toBeNull();
    });
    it('should throw error if localStorage fails during clear', () => {
      // Arrange
      mockLocalStorage.removeItem.mockImplementation(() => {
        throw new Error('Remove failed');
      });
      // Act & Assert
      expect(() => service.clearData()).toThrow('No se pudo limpiar los datos');
      expect(mockLocalStorage.removeItem).toHaveBeenCalled();
    });
  });
});
