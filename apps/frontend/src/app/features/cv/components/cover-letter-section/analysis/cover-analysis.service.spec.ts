import { TestBed } from '@angular/core/testing';

import { CoverAnalysisService } from './cover-analysis.service';

describe('CoverAnalysisService', () => {
  let service: CoverAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoverAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
