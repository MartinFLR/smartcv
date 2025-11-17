import { TestBed } from '@angular/core/testing';

import { CvFormManagerService } from './cv-form-manager-service';

describe('CvFormManagerService', () => {
  let service: CvFormManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvFormManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
