import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Config } from './config';
import { AiSettingsService } from '../../core/services/ai-settings/ai-settings.service';
import { TuiAlertService } from '@taiga-ui/core';
import { AI_MODELS_CONFIG } from '../../core/config/ai.models.config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { jest } from '@jest/globals';
import { AiSettings } from '@smartcv/types';

describe('Config Component', () => {
  let component: Config;
  let fixture: ComponentFixture<Config>;

  // --- Mocks ---

  // 1. Mock de la configuración de modelos (Token)
  const MOCK_AI_MODELS = {
    OpenAI: ['gpt-4o', 'gpt-3.5-turbo'],
    Anthropic: ['claude-3-opus', 'claude-3-sonnet'],
    Local: [], // Caso borde: proveedor sin modelos
  };

  // 2. Mock del Servicio de Settings
  const aiSettingsServiceMock = {
    loadSettings: jest.fn(),
    saveSettings: jest.fn(),
  };

  // 3. Mock de Alertas
  const alertServiceMock = {
    open: jest.fn().mockReturnValue(of(true)),
  };

  // Helper para crear el componente (útil si queremos cambiar el mock de loadSettings antes de crear)
  const createComponent = () => {
    fixture = TestBed.createComponent(Config);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(async () => {
    // Reseteamos los mocks antes de cada test
    jest.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [Config, ReactiveFormsModule],
      providers: [
        provideAnimations(), // Necesario para componentes Tui
        provideRouter([]), // Necesario para RouterLink
        { provide: AiSettingsService, useValue: aiSettingsServiceMock },
        { provide: TuiAlertService, useValue: alertServiceMock },
        { provide: AI_MODELS_CONFIG, useValue: MOCK_AI_MODELS },
      ],
    }).compileComponents();
  });

  describe('Initialization (Constructor Logic)', () => {
    it('should initialize form with default values when NO settings are saved', () => {
      // Arrange: No hay settings guardados
      aiSettingsServiceMock.loadSettings.mockReturnValue(null);

      // Act
      createComponent();

      // Assert
      const formValue = component.aiForm.value;
      // Debería tomar el primer proveedor y su primer modelo por defecto
      expect(formValue.modelProvider).toBe('OpenAI');
      expect(formValue.modelVersion).toBe('gpt-4o');
      expect(formValue.systemPrompt).toBe('');
    });

    it('should initialize form with SAVED settings if valid', () => {
      // Arrange: Simulamos settings previos
      const savedSettings: AiSettings = {
        modelProvider: 'Anthropic',
        modelVersion: 'claude-3-sonnet',
        systemPrompt: 'Act as a pro recruiter',
      };
      aiSettingsServiceMock.loadSettings.mockReturnValue(savedSettings);

      // Act
      createComponent();

      // Assert
      const formValue = component.aiForm.value;
      expect(formValue.modelProvider).toBe('Anthropic');
      expect(formValue.modelVersion).toBe('claude-3-sonnet');
      expect(formValue.systemPrompt).toBe('Act as a pro recruiter');
    });

    it('should fallback to defaults if saved provider is invalid', () => {
      // Arrange: El proveedor guardado ya no existe en la config
      aiSettingsServiceMock.loadSettings.mockReturnValue({
        modelProvider: 'DeepSeek-Legacy', // No existe en MOCK_AI_MODELS
        modelVersion: 'v1',
      });

      // Act
      createComponent();

      // Assert
      // Debería volver a OpenAI (el primero de la lista)
      expect(component.aiForm.get('modelProvider')?.value).toBe('OpenAI');
      expect(component.aiForm.get('modelVersion')?.value).toBe('gpt-4o');
    });

    it('should reset model to null/default if saved model does not exist for provider', () => {
      // Arrange: Proveedor existe, pero el modelo guardado es viejo
      aiSettingsServiceMock.loadSettings.mockReturnValue({
        modelProvider: 'OpenAI',
        modelVersion: 'gpt-4-legacy-deprecated',
      });

      // Act
      createComponent();

      // Assert
      expect(component.aiForm.get('modelProvider')?.value).toBe('OpenAI');
      // Debería seleccionar el primer modelo válido disponible (gpt-4o)
      expect(component.aiForm.get('modelVersion')?.value).toBe('gpt-4o');
    });
  });

  describe('Reactivity (Form Changes)', () => {
    beforeEach(() => {
      // Inicializamos por defecto para estos tests
      aiSettingsServiceMock.loadSettings.mockReturnValue(null);
      createComponent();
    });

    it('should update available models when provider changes', () => {
      // Estado inicial: OpenAI
      expect(component['availableModels']()).toEqual(['gpt-4o', 'gpt-3.5-turbo']);

      // Act: Cambiamos a Anthropic
      component.aiForm.get('modelProvider')?.setValue('Anthropic');
      fixture.detectChanges();

      // Assert: El signal debe actualizarse
      expect(component['availableModels']()).toEqual(['claude-3-opus', 'claude-3-sonnet']);
    });

    it('should auto-select first model when provider changes', () => {
      // Arrange
      component.aiForm.patchValue({
        modelProvider: 'OpenAI',
        modelVersion: 'gpt-3.5-turbo', // Seleccionamos el 2do modelo
      });

      // Act: Cambiamos proveedor
      component.aiForm.get('modelProvider')?.setValue('Anthropic');
      fixture.detectChanges();

      // Assert: El modelo debe cambiar automáticamente al primero de Anthropic
      expect(component.aiForm.get('modelVersion')?.value).toBe('claude-3-opus');
    });

    it('should set modelVersion to null if provider has no models', () => {
      // Act: Cambiamos a 'Local' (que definimos vacío en el mock)
      component.aiForm.get('modelProvider')?.setValue('Local');
      fixture.detectChanges();

      // Assert
      expect(component['availableModels']()).toEqual([]);
      expect(component.aiForm.get('modelVersion')?.value).toBeNull();
    });
  });

  describe('Actions', () => {
    beforeEach(() => {
      aiSettingsServiceMock.loadSettings.mockReturnValue(null);
      createComponent();
    });

    it('should save settings and show alert', () => {
      // Arrange
      const formValues = {
        modelProvider: 'OpenAI',
        modelVersion: 'gpt-4o',
        systemPrompt: 'New Prompt',
      };
      component.aiForm.setValue(formValues);

      // Act
      component.saveAiSettings();

      // Assert
      expect(aiSettingsServiceMock.saveSettings).toHaveBeenCalledWith(formValues);
      expect(alertServiceMock.open).toHaveBeenCalledWith(
        expect.stringContaining('guardada'),
        expect.objectContaining({ appearance: 'success' }),
      );
    });
  });
});
