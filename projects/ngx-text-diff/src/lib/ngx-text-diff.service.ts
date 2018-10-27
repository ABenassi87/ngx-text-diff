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

  getDiffsByLines(left: string, right: string): Promise<DiffTableRow[]> {
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

  getDiffsByChars(left: string, right: string): Promise<DiffTableRow[]> {
    return new Promise<DiffTableRow[]>((resolve, reject) => {
      const rows: DiffTableRow[] = [];
      const diffs: Diff[] = this.diffParser.diff_main(left, right, true);
      this.diffParser.diff_cleanupSemantic(diffs);

      if (!rows) {
        reject('Error');
      }

      resolve(rows);
    });
  }

  getPatch(left: string, right: string): Promise<DiffTableRow[]> {
    return new Promise<DiffTableRow[]>((resolve, reject) => {
      const rows = [];
      const a = this.diffParser.diff_linesToChars_(left, right);
      const lineText1 = a.chars1;
      const lineText2 = a.chars2;
      const linesArray = a.lineArray;
      const diffs: Diff[] = this.diffParser.diff_main(lineText1, lineText2, true);
      this.diffParser.diff_charsToLines_(diffs, linesArray);
      const patch = this.diffParser.patch_make(diffs);

      resolve(rows);
    });
  }

  private formatOutput(diffs: Diff[], lines: string[]): DiffTableRow[] {
    lines.splice(0, 1);
    let lineLeft = 1;
    let lineRight = 1;
    const diffsRows = diffs.reduce((rows: DiffTableRow[], diff: Diff) => {
      if (!rows) {
        rows = [];
      }
      let diffValues = diff[1];
      while (!isNil(diffValues) || !isEmpty(diffValues) || diffValues.length > 0) {
        const findIndex = lines.findIndex(line => diffValues.includes(line));
        if (findIndex >= 0) {
          const line = lines[findIndex];
          switch (diff[0]) {
            case DIFF_EQUAL:
              const rTemp: DiffTableRow = {
                content: [
                  {
                    prefix: line
                  }
                ],
                prefix: '',
                lineNumberRight: lineRight,
                lineNumberLeft: lineLeft,
                belongTo: 'both'
              };
              lineRight = lineRight + 1;
              lineLeft = lineLeft + 1;
              rows.push(rTemp);
              break;
            case DIFF_INSERT:
              const rRight: DiffTableRow = {
                content: [
                  {
                    prefix: '',
                    diff: line
                  }
                ],
                prefix: '+',
                lineNumberRight: lineRight,
                belongTo: 'right'
              };
              lineRight = lineRight + 1;
              rows.push(rRight);
              break;
            case DIFF_DELETE:
              const rLeft: DiffTableRow = {
                content: [
                  {
                    prefix: '',
                    diff: line
                  }
                ],
                prefix: '-',
                lineNumberLeft: lineLeft,
                belongTo: 'left'
              };
              lineLeft = lineLeft + 1;
              rows.push(rLeft);
              break;
            default:
              break;
          }
          diffValues = diffValues.replace(line, '');
          lines.splice(findIndex, 1);
        } else {
          break;
        }
      }

      return rows;
    }, []);

    return diffsRows;
  }
}
