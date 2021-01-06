import { Injectable } from '@angular/core';
import { Diff, DIFF_DELETE, DIFF_EQUAL, DIFF_INSERT, diff_match_patch } from 'diff-match-patch';
import { DiffLineResult, DiffPart, DiffTableRowResult, ProcessLinesOptions } from './ngx-text-diff.model';
import { isEmpty, isNil } from './ngx-text-diff.utils';

@Injectable({
  providedIn: 'root',
})
export class NgxTextDiffService {
  diffParser: diff_match_patch;

  constructor() {
    this.initParser();
  }

  private initParser() {
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
      const [diffType, diffValue] = diff;
      let leftDiffRow: DiffTableRowResult = null;
      let rightDiffRow: DiffTableRowResult = null;
      switch (diffType) {
        case DIFF_EQUAL: // 0
          diffValue
            .split('\n')
            .filter((value, index, array) => {
              if (index === array.length - 1) {
                return !isEmpty(value);
              }
              return true;
            })
            .forEach(line => {
              rows.push({
                leftContent: {
                  lineNumber: lineLeft,
                  lineContent: line,
                  lineDiffs: [],
                  prefix: '',
                },
                rightContent: {
                  lineNumber: lineRight,
                  lineContent: line,
                  lineDiffs: [],
                  prefix: '',
                },
                belongTo: 'both',
                hasDiffs: false,
                numDiffs: 0,
              });
              lineRight = lineRight + 1;
              lineLeft = lineLeft + 1;
            });
          break;
        case DIFF_DELETE: // -1
          diffValue
            .split('\n')
            .filter((value, index, array) => {
              if (index === array.length - 1) {
                return !isEmpty(value);
              }
              return true;
            })
            .forEach(line => {
              rightDiffRow = rows.find(
                row => !row.leftContent && row.rightContent && row.rightContent.lineNumber === lineLeft && row.rightContent.prefix !== ''
              );
              if (rightDiffRow) {
                rightDiffRow.leftContent = {
                  lineNumber: lineLeft,
                  lineContent: line,
                  lineDiffs: this.getDiffParts(
                    line,
                    rightDiffRow.rightContent.lineContent
                  ),
                  prefix: '-',
                };
                rightDiffRow.rightContent.lineDiffs = this.getDiffParts(
                  rightDiffRow.rightContent.lineContent,
                  line
                );
                rightDiffRow.belongTo = 'both';
                rightDiffRow.numDiffs = this.countDiffs(rightDiffRow);
              } else {
                rows.push({
                  leftContent: {
                    lineNumber: lineLeft,
                    lineContent: line,
                    lineDiffs: [{ content: line, isDiff: true }],
                    prefix: '-',
                  },
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
            .filter((value, index, array) => {
              if (index === array.length - 1) {
                return !isEmpty(value);
              }
              return true;
            })
            .forEach(line => {
              leftDiffRow = rows.find(
                row => row.leftContent && !row.rightContent && row.leftContent.lineNumber === lineRight && row.leftContent.prefix !== ''
              );
              if (leftDiffRow) {
                leftDiffRow.rightContent = {
                  lineNumber: lineRight,
                  lineContent: line,
                  lineDiffs: this.getDiffParts(
                    line,
                    leftDiffRow.leftContent.lineContent
                  ),
                  prefix: '+',
                };
                leftDiffRow.leftContent.lineDiffs = this.getDiffParts(
                  leftDiffRow.leftContent.lineContent,
                  line
                );
                leftDiffRow.belongTo = 'both';
                leftDiffRow.numDiffs = this.countDiffs(leftDiffRow);
              } else {
                rows.push({
                  leftContent: null,
                  rightContent: {
                    lineNumber: lineRight,
                    lineContent: line,
                    lineDiffs: [{ content: line, isDiff: true }],
                    prefix: '+',
                  },
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

  private formatOutput2(diffs: Diff[]): DiffTableRowResult[][] {
    let lineLeft = 1;
    let lineRight = 1;
    const indexesProcessed = new Set();

    return diffs.map((diff: Diff, index: number, array: Diff[]) => {
      const [type, value] = diff;
      const rows: DiffTableRowResult[] = [];

      if (!indexesProcessed.has(index)) {
        switch (type) {
          case DIFF_EQUAL: // 0
            rows.concat(this.getLines(value).map(line => ({
              leftContent: {
                lineNumber: lineLeft,
                lineContent: line,
                lineDiffs: [],
                prefix: '',
              },
              rightContent: {
                lineNumber: lineRight,
                lineContent: line,
                lineDiffs: [],
                prefix: '',
              },
              belongTo: 'both',
              hasDiffs: false,
              numDiffs: 0,
            })));

            lineRight = lineRight + 1;
            lineLeft = lineLeft + 1;
            break;
          case DIFF_DELETE: // -1
            const [nextType, nextValue] = array.length - 1 > index ? array[index+1] : [];

            if(nextType === DIFF_INSERT) {

            }
            this.getLines(value).map(line => {

              return [];
            })
            break;
        }
      }

      indexesProcessed.add(index);
      return rows;

    })
  }



  private countDiffs(result: DiffTableRowResult): number {
    let diffCount = 0;
    if (result.leftContent) {
      diffCount += result.leftContent.lineDiffs.filter(diff => diff.isDiff).length;
    }
    if (result.rightContent) {
      diffCount += result.rightContent.lineDiffs.filter(diff => diff.isDiff).length;
    }
    return diffCount;
  }


  private countDiffs2(lineDiffs: DiffPart[]): number {
    return lineDiffs.filter(diff => diff.isDiff).length;
  }

  private getDiffParts(value: string, compareValue: string): DiffPart[] {
    const diffs: Diff[] = this.diffParser.diff_main(value, compareValue);
    return diffs.filter(([type]) => type !== DIFF_INSERT).map(([type, content]): DiffPart => ({ content, isDiff: type !== DIFF_EQUAL }));
  }

  private getLines(diffValue: string): string[] {
    return diffValue
      .split('\n')
      .filter((value, index, array) => index !== array.length - 1 || !isEmpty(value))
  }

  private processLines(options: ProcessLinesOptions): DiffTableRowResult[] {
    const {leftLines, rightLines, leftNumber, rightNumber} = options;

    return [];
  }
}
