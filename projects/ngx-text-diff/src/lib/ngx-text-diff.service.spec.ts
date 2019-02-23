import { inject, TestBed } from '@angular/core/testing';

import { NgxTextDiffService } from './ngx-text-diff.service';
import { DiffTableRowResult } from './ngx-text-diff.model';

export interface TextDiffTestCase {
  id: number;
  name: string;
  left: string;
  right: string;
  expectedResult?: DiffTableRowResult[];
  hasError?: boolean;
  error?: any;
}

/*const testCases: TextDiffTestCase[] = [
  {
    id: 1,
    name: 'Basic Diff',
    left: '<name>John Doe</name>',
    right: '<name>John Moe</name>',
    expectedResult: [
      {
        rightContent: { lineNumber: 1, lineContent: '<name>John Moe</name>', prefix: '+', lineDiffs: ['M'] },
        leftContent: { lineNumber: 1, lineContent: '<name>John Doe</name>', prefix: '-', lineDiffs: ['D'] },
        belongTo: 'both'
      }
    ],
    hasError: false
  },
  {
    id: 2,
    name: 'Two Diffs',
    left: '<name>John Does</name>',
    right: '<name>John Moez</name>',
    expectedResult: [
      {
        rightContent: { lineNumber: 1, lineContent: '<name>John Moez</name>', prefix: '+', lineDiffs: ['M', 'z'] },
        leftContent: { lineNumber: 1, lineContent: '<name>John Does</name>', prefix: '-', lineDiffs: ['D', 's'] },
        belongTo: 'both'
      }
    ],
    hasError: false
  },
  {
    id: 3,
    name: 'Two Lines Diffs',
    left: '<name>John Does</name>\n<email>john.Moe@widget.com</email>',
    right: '<name>John Moez</name>\n<address>Test</address>',
    expectedResult: [
      {
        rightContent: { lineNumber: 1, lineContent: '<name>John Moez</name>', prefix: '+', lineDiffs: ['M', 'z'] },
        leftContent: { lineNumber: 1, lineContent: '<name>John Does</name>', prefix: '-', lineDiffs: ['D', 's'] },
        belongTo: 'both'
      },
      {
        rightContent: { lineNumber: 2, lineContent: '<address>Test</address>', prefix: '+', lineDiffs: ['<address>Test</address>'] },
        leftContent: {
          lineNumber: 2,
          lineContent: '<email>john.Moe@widget.com</email>',
          prefix: '-',
          lineDiffs: ['<email>john.Moe@widget.com</email>']
        },
        belongTo: 'both'
      }
    ],
    hasError: false
  }
];*/

describe('NgxTextDiffService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [NgxTextDiffService]
    }));

  it('should be created', () => {
    const service: NgxTextDiffService = TestBed.get(NgxTextDiffService);
    expect(service).toBeTruthy();
  });

  /*testCases.forEach(tc => {
    it(`TC ${tc.id} - ${tc.name}`, inject([NgxTextDiffService], (service: NgxTextDiffService) => {
      const actualResult = service.getDiffsByChars(tc.left, tc.right);
      actualResult.then(result => {
        expect(JSON.stringify(result)).toEqual(JSON.stringify(tc.expectedResult));
      });
    }));
  });*/
});
