import { inject, TestBed } from '@angular/core/testing';

import { NgxTextDiffService } from './ngx-text-diff.service';
import { DiffTableRow } from './ngx-text-diff.model';

export interface TextDiffTestCase {
  id: number;
  name: string;
  left: string;
  right: string;
  expectedResult?: DiffTableRow[];
  hasError?: boolean;
  error?: any;
}

const testCases: TextDiffTestCase[] = [
  {
    id: 1,
    name: 'Basic Diff',
    left: '<name>John Doe</name>',
    right: '<name>John Moe</name>',
    expectedResult: null,
    hasError: false
  }
];

describe('NgxTextDiffService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [NgxTextDiffService]
    }));

  it('should be created', () => {
    const service: NgxTextDiffService = TestBed.get(NgxTextDiffService);
    expect(service).toBeTruthy();
  });

  testCases.forEach(tc => {
    it(`TC ${tc.id} - ${tc.name}`, inject([NgxTextDiffService], (service: NgxTextDiffService) => {
      const actualResult = service.getDiffsByChars(tc.left, tc.right);

      expect(JSON.stringify(actualResult)).toEqual(JSON.stringify(tc.expectedResult));
    }));
  });
});
