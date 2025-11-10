import { TestBed } from '@angular/core/testing';

import { AtsSectionService } from './ats-section.service';

describe('AtsSectionService', () => {
  let service: AtsSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtsSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
