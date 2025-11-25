import { TestBed } from '@angular/core/testing';

import { CvStateService } from './cv-state.service';

describe('CvStateService', () => {
  let service: CvStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
