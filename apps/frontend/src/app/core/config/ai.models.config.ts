import { InjectionToken } from '@angular/core';
import { AiProviderModels } from '@smartcv/types';

export const AI_MODELS_CONFIG = new InjectionToken<AiProviderModels>(
  'Configuración de Modelos de IA',
);
