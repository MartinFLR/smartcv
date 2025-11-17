import { TestBed } from '@angular/core/testing';

import { CvFormDataService } from './cv-form-data.service';

describe('CvFormDataService', () => {
  let service: CvFormDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvFormDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
