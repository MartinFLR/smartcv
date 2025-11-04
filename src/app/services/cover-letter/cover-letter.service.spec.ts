import { TestBed } from '@angular/core/testing';

import { CoverLetterService } from './cover-letter.service';

describe('CoverLetterService', () => {
  let service: CoverLetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoverLetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
