import {Injectable} from '@angular/core';
import { Diff, DIFF_DELETE, DIFF_EQUAL, DIFF_INSERT, diff_match_patch } from 'diff-match-patch';
import {DiffLineResult, DiffPart, DiffTableRowResult} from "./ngx-text-diff.model";
import {isEmpty, countDiffs} from "./ngx-text-diff.utils";

@Injectable({
  providedIn: 'root'
})
export class NgxTextDiffService {
  private diffParser: any;

  constructor() {
    this.diffParser = new diff_match_patch();
  }

  getDiffsByLines(left: string, right: string): Promise<DiffTableRowResult[]> {
    return new Promise<DiffTableRowResult[]>((resolve, reject) => {
      const a = this.diffParser.diff_linesToChars_(left, right);
      const lineText1 = a.chars1;
      const lineText2 = a.chars2;
      const linesArray = a.lineArray;
      const diffs: Diff[] = this.diffParser.diff_main(lineText1, lineText2, true);
      this.diffParser.diff_charsToLines_(diffs, linesArray);
      const rows: DiffTableRowResult[] = this.formatOutput(diffs);
      if (!rows) {
        reject('Error');
      }

      resolve(rows);
    });
  }

  private formatOutput(diffs: Diff[]): DiffTableRowResult[] {
    let lineLeft = 1;
    let lineRight = 1;
    return diffs.reduce((rows: DiffTableRowResult[], diff: Diff) => {
      if (!rows) {
        rows = [];
      }
      const [diffType, diffValue] = diff;
      let leftDiffRow: DiffTableRowResult | undefined;
      let rightDiffRow: DiffTableRowResult | undefined;
      let leftContent: DiffLineResult | undefined;
      let rightContent: DiffLineResult | undefined;
      let rowTemp: DiffTableRowResult | undefined;
      switch (diffType) {
        case DIFF_EQUAL: // 0
          diffValue
            .split('\n')
            .filter((value: string, index: number, array: Array<string>) => {
              if (index === array.length - 1) {
                return !isEmpty(value);
              }
              return true;
            })
            .forEach((line: string) => {
              leftContent = {
                lineNumber: lineLeft,
                lineContent: line,
                lineDiffs: [],
                prefix: '',
              };
              rightContent = {
                lineNumber: lineRight,
                lineContent: line,
                lineDiffs: [],
                prefix: '',
              };
              rowTemp = {
                leftContent,
                rightContent,
                belongTo: 'both',
                hasDiffs: false,
                numDiffs: 0,
              };
              rows.push(rowTemp);
              lineRight = lineRight + 1;
              lineLeft = lineLeft + 1;
            });
          break;
        case DIFF_DELETE: // -1
          diffValue
            .split('\n')
            .filter((value: string, index: number, array: Array<string>) => {
              if (index === array.length - 1) {
                return !isEmpty(value);
              }
              return true;
            })
            .forEach((line: string) => {
              rightDiffRow = rows.find(
                row => !row.leftContent && row.rightContent && row.rightContent.lineNumber === lineLeft && row.rightContent.prefix !== ''
              );

              leftContent = {
                lineNumber: lineLeft,
                lineContent: line,
                lineDiffs: [{ content: line, isDiff: true }],
                prefix: '-',
              };
              if (rightDiffRow?.rightContent) {
                rightDiffRow.leftContent = leftContent;
                rightDiffRow.leftContent.lineDiffs = this.getDiffParts(
                  rightDiffRow.leftContent.lineContent,
                  rightDiffRow.rightContent.lineContent
                );
                rightDiffRow.rightContent.lineDiffs = this.getDiffParts(
                  rightDiffRow.rightContent.lineContent,
                  rightDiffRow.leftContent.lineContent
                );
                rightDiffRow.belongTo = 'both';
                rightDiffRow.numDiffs = countDiffs(rightDiffRow);
              } else {
                rows.push({
                  leftContent,
                  rightContent: null,
                  hasDiffs: true,
                  belongTo: 'left',
                  numDiffs: 1,
                });
              }
              lineLeft = lineLeft + 1;
            });
          break;
        case DIFF_INSERT: // 1
          diffValue
            .split('\n')
            .filter((value: string, index: number, array: Array<string>) => {
              if (index === array.length - 1) {
                return !isEmpty(value);
              }
              return true;
            })
            .forEach((line: string) => {
              leftDiffRow = rows.find(
                row => row.leftContent && !row.rightContent && row.leftContent.lineNumber === lineRight && row.leftContent.prefix !== ''
              );
              rightContent = {
                lineNumber: lineRight,
                lineContent: line,
                lineDiffs: [{ content: line, isDiff: true }],
                prefix: '+',
              };
              if (leftDiffRow?.leftContent) {
                leftDiffRow.rightContent = rightContent;
                leftDiffRow.leftContent.lineDiffs = this.getDiffParts(
                  leftDiffRow.leftContent.lineContent,
                  leftDiffRow.rightContent.lineContent
                );
                leftDiffRow.rightContent.lineDiffs = this.getDiffParts(
                  leftDiffRow.rightContent.lineContent,
                  leftDiffRow.leftContent.lineContent
                );
                leftDiffRow.belongTo = 'both';
                leftDiffRow.numDiffs = countDiffs(leftDiffRow);
              } else {
                rows.push({
                  leftContent: null,
                  rightContent,
                  hasDiffs: true,
                  belongTo: 'right',
                  numDiffs: 1,
                });
              }
              lineRight = lineRight + 1;
            });
          break;
      }
      return rows;
    }, []);
  }



  private getDiffParts(value: string, compareValue: string = ''): DiffPart[] {
    const diffs: Diff[] = this.diffParser.diff_main(value, compareValue);
    return diffs.filter(([type]) => type !== DIFF_INSERT).map(([type, content]): DiffPart => ({ content, isDiff: type !== DIFF_EQUAL }));
  }
}
