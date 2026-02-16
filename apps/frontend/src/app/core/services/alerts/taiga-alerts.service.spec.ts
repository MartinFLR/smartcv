import { TestBed } from '@angular/core/testing';
import { TaigaAlertsService } from './taiga-alerts.service';
import { TuiAlertService } from '@taiga-ui/core';
import { TranslocoService } from '@jsverse/transloco';
import { jest } from '@jest/globals';
describe('TaigaAlertsService', () => {
  let service: TaigaAlertsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaigaAlertsService,
        { provide: TuiAlertService, useValue: { open: jest.fn() } },
        { provide: TranslocoService, useValue: { translate: jest.fn() } },
      ],
    });
    service = TestBed.inject(TaigaAlertsService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
