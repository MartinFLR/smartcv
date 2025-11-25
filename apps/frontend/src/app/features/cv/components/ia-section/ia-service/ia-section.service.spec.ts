import { TestBed } from '@angular/core/testing';

import { IaSectionService } from './ia-section.service';

describe('IaSectionService', () => {
  let service: IaSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IaSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
