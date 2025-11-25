import { TestBed } from '@angular/core/testing';

import { TaigaAlertsService } from './taiga-alerts.service';

describe('TaigaAlertsService', () => {
  let service: TaigaAlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaigaAlertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
