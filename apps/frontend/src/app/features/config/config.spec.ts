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
import { TranslocoTestingModule } from '@jsverse/transloco';
describe('Config Component', () => {
  let component: Config;
  let fixture: ComponentFixture<Config>;
  const MOCK_AI_MODELS = {
    OpenAI: ['gpt-4o', 'gpt-3.5-turbo'],
    Anthropic: ['claude-3-opus', 'claude-3-sonnet'],
    Local: [],
  };
  const aiSettingsServiceMock = {
    loadSettings: jest.fn(),
    saveSettings: jest.fn(),
  };
  const alertServiceMock = {
    open: jest.fn().mockReturnValue(of(true)),
  };
  const createComponent = () => {
    fixture = TestBed.createComponent(Config);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };
  beforeEach(async () => {
    jest.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [
        Config,
        ReactiveFormsModule,
        TranslocoTestingModule.forRoot({
          langs: { en: {}, es: {} },
          translocoConfig: { availableLangs: ['en', 'es'], defaultLang: 'es' },
        }),
      ],
      providers: [
        provideAnimations(),
        provideRouter([]),
        { provide: AiSettingsService, useValue: aiSettingsServiceMock },
        { provide: TuiAlertService, useValue: alertServiceMock },
        { provide: AI_MODELS_CONFIG, useValue: MOCK_AI_MODELS },
      ],
    }).compileComponents();
  });
  describe('Initialization (Constructor Logic)', () => {
    it('should initialize form with default values when NO settings are saved', () => {
      aiSettingsServiceMock.loadSettings.mockReturnValue(null);
      createComponent();
      const formValue = component.aiForm.value;
      expect(formValue.modelProvider).toBe('OpenAI');
      expect(formValue.modelVersion).toBe('gpt-4o');
      expect(formValue.systemPrompt).toBe('');
    });
    it('should initialize form with SAVED settings if valid', () => {
      const savedSettings: AiSettings = {
        modelProvider: 'Anthropic',
        modelVersion: 'claude-3-sonnet',
        systemPrompt: 'Act as a pro recruiter',
      };
      aiSettingsServiceMock.loadSettings.mockReturnValue(savedSettings);
      createComponent();
      const formValue = component.aiForm.value;
      expect(formValue.modelProvider).toBe('Anthropic');
      expect(formValue.modelVersion).toBe('claude-3-sonnet');
      expect(formValue.systemPrompt).toBe('Act as a pro recruiter');
    });
    it('should fallback to defaults if saved provider is invalid', () => {
      aiSettingsServiceMock.loadSettings.mockReturnValue({
        modelProvider: 'DeepSeek-Legacy',
        modelVersion: 'v1',
      });
      createComponent();
      expect(component.aiForm.get('modelProvider')?.value).toBe('OpenAI');
      expect(component.aiForm.get('modelVersion')?.value).toBe('gpt-4o');
    });
    it('should reset model to null/default if saved model does not exist for provider', () => {
      aiSettingsServiceMock.loadSettings.mockReturnValue({
        modelProvider: 'OpenAI',
        modelVersion: 'gpt-4-legacy-deprecated',
      });
      createComponent();
      expect(component.aiForm.get('modelProvider')?.value).toBe('OpenAI');
      expect(component.aiForm.get('modelVersion')?.value).toBe('gpt-4o');
    });
  });
  describe('Reactivity (Form Changes)', () => {
    beforeEach(() => {
      aiSettingsServiceMock.loadSettings.mockReturnValue(null);
      createComponent();
    });
    it('should update available models when provider changes', () => {
      expect(component['availableModels']()).toEqual(['gpt-4o', 'gpt-3.5-turbo']);
      component.aiForm.get('modelProvider')?.setValue('Anthropic');
      fixture.detectChanges();
      expect(component['availableModels']()).toEqual(['claude-3-opus', 'claude-3-sonnet']);
    });
    it('should auto-select first model when provider changes', () => {
      component.aiForm.patchValue({
        modelProvider: 'OpenAI',
        modelVersion: 'gpt-3.5-turbo',
      });
      component.aiForm.get('modelProvider')?.setValue('Anthropic');
      fixture.detectChanges();
      expect(component.aiForm.get('modelVersion')?.value).toBe('claude-3-opus');
    });
    it('should set modelVersion to null if provider has no models', () => {
      component.aiForm.get('modelProvider')?.setValue('Local');
      fixture.detectChanges();
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
      const formValues = {
        modelProvider: 'OpenAI',
        modelVersion: 'gpt-4o',
        systemPrompt: 'New Prompt',
      };
      component.aiForm.setValue(formValues);
      component.saveAiSettings();
      expect(aiSettingsServiceMock.saveSettings).toHaveBeenCalledWith(formValues);
      expect(alertServiceMock.open).toHaveBeenCalledWith(
        expect.stringContaining('guardada'),
        expect.objectContaining({ appearance: 'success' }),
      );
    });
  });
});
