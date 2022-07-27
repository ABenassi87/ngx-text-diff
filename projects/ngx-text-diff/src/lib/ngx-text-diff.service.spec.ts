import { TestBed } from '@angular/core/testing';

import { NgxTextDiffService } from './ngx-text-diff.service';

describe('NgxTextDiffService', () => {
  let service: NgxTextDiffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxTextDiffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
