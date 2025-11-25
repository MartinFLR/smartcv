import { TestBed } from '@angular/core/testing';

import { AtsAnalyzerService } from './ats-analyzer.service';

describe('AtsAnalyzerService', () => {
  let service: AtsAnalyzerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtsAnalyzerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
