import { Injectable } from '@angular/core';
import { Diff, DIFF_DELETE, DIFF_EQUAL, DIFF_INSERT, diff_match_patch } from 'diff-match-patch';
import { DiffTableRow } from './ngx-text-diff.model';
import { isEmpty, isNil } from './ngx-text-diff.utils';

@Injectable({
  providedIn: 'root'
})
export class NgxTextDiffService {
  diffParser: diff_match_patch;

  constructor() {
    this.initParser();
  }

  private initParser() {
    this.diffParser = new diff_match_patch();
  }

  getDiffs(left: string, right: string): Promise<DiffTableRow[]> {
    return new Promise<DiffTableRow[]>((resolve, reject) => {
      const a = this.diffParser.diff_linesToChars_(left, right);
      const lineText1 = a.chars1;
      const lineText2 = a.chars2;
      const linesArray = a.lineArray;
      const diffs: Diff[] = this.diffParser.diff_main(lineText1, lineText2, true);
      this.diffParser.diff_charsToLines_(diffs, linesArray);
      const rows: DiffTableRow[] = this.formatOutput(diffs, linesArray);
      if (!rows) {
        reject('Error');
      }

      resolve(rows);
    });
  }

  private formatOutput(diffs: Diff[], lines: string[]): DiffTableRow[] {
    let lineLeft = 1;
    let lineRight = 1;
    const diffsRows = diffs.reduce((rows: DiffTableRow[], diff: Diff) => {
      if (!rows) {
        rows = [];
      }
      switch (diff[0]) {
        case DIFF_EQUAL:
          const commonValues = diff[1].split('\n');
          commonValues.filter(val => !isNil(val) && !isEmpty(val)).forEach(val => {
            const rTemp: DiffTableRow = {
              content: val,
              prefix: '',
              lineNumberRight: lineRight,
              lineNumberLeft: lineLeft,
              belongTo: 'both'
            };
            lineRight = lineRight + 1;
            lineLeft = lineLeft + 1;
            rows.push(rTemp);
          });
          break;
        case DIFF_INSERT:
          const insertValues = diff[1].split('\n');
          insertValues.filter(val => !isNil(val) && !isEmpty(val)).forEach(val => {
            const rRight: DiffTableRow = {
              content: val,
              prefix: '+',
              lineNumberRight: lineRight,
              belongTo: 'right'
            };
            lineRight = lineRight + 1;
            rows.push(rRight);
          });
          break;
        case DIFF_DELETE:
          const deleteValues = diff[1].split('\n');
          deleteValues.filter(val => !isNil(val) && !isEmpty(val)).forEach(val => {
            const rLeft: DiffTableRow = {
              content: val,
              prefix: '-',
              lineNumberLeft: lineLeft,
              belongTo: 'left'
            };
            lineLeft = lineLeft + 1;
            rows.push(rLeft);
          });
          break;
      }

      return rows;
    }, []);

    return diffsRows;
  }
}
