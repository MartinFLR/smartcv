import { TestBed } from '@angular/core/testing';

import { AiSettingsService } from './ai-settings.service';

describe('AiSettingsService', () => {
  let service: AiSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
