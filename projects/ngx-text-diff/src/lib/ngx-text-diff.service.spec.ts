import { TestBed } from '@angular/core/testing';

import { NgxTextDiffService } from './ngx-text-diff.service';

describe('NgxTextDiffService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxTextDiffService = TestBed.get(NgxTextDiffService);
    expect(service).toBeTruthy();
  });
});
