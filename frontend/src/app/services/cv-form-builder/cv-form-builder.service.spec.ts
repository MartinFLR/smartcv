import { TestBed } from '@angular/core/testing';

import { CvFormBuilderService } from './cv-form-builder.service';

describe('CvFormBuilderService', () => {
  let service: CvFormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvFormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
