import { TestBed } from '@angular/core/testing';

import { DataoforganizationlistService } from './dataoforganizationlist.service';

describe('DataoforganizationlistService', () => {
  let service: DataoforganizationlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataoforganizationlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
