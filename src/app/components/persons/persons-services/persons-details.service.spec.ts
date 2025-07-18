import { TestBed } from '@angular/core/testing';

import { PersonsDetailsService } from './persons-details.service';

describe('PersonsDetailsService', () => {
  let service: PersonsDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonsDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
