import { TestBed } from '@angular/core/testing';

import { HomeStateService } from './home-state.service';

describe('HomeStateService', () => {
  let service: HomeStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
