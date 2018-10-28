import { Injectable } from '@angular/core';
import { Diff, DIFF_DELETE, DIFF_EQUAL, DIFF_INSERT, diff_match_patch } from 'diff-match-patch';
import { DiffLineResult, DiffPart, DiffTableRowResult } from './ngx-text-diff.model';
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

  getDiffsByLines(left: string, right: string): Promise<DiffTableRowResult[]> {
    return new Promise<DiffTableRowResult[]>((resolve, reject) => {
      const a = this.diffParser.diff_linesToChars_(left, right);
      const lineText1 = a.chars1;
      const lineText2 = a.chars2;
      const linesArray = a.lineArray;
      const diffs: Diff[] = this.diffParser.diff_main(lineText1, lineText2, true);
      this.diffParser.diff_charsToLines_(diffs, linesArray);
      const rows: DiffTableRowResult[] = this.formatOutputNew(diffs, linesArray);
      if (!rows) {
        reject('Error');
      }

      resolve(rows);
    });
  }

  private formatOutputNew(diffs: Diff[], lines?: string[]): DiffTableRowResult[] {
    if (lines) {
      return this.formatDiffsFromLines(diffs, lines);
    }
  }

  private formatDiffsFromLines(diffs: Diff[], lines: string[]): DiffTableRowResult[] {
    lines.splice(0, 1);
    let lineLeft = 1;
    let lineRight = 1;
    const diffRowsResult = diffs.reduce((rows: DiffTableRowResult[], diff: Diff) => {
      if (!rows) {
        rows = [];
      }
      let diffValues = diff[1];
      while (!isNil(diffValues) || !isEmpty(diffValues) || diffValues.length > 0) {
        const findIndex = lines.findIndex(line => diffValues.includes(line));
        if (findIndex >= 0) {
          const line = lines[findIndex];
          let leftDiffRow: DiffTableRowResult = null;
          let rightDiffRow: DiffTableRowResult = null;
          let leftContent: DiffLineResult = null;
          let rightContent: DiffLineResult = null;
          let rowTemp: DiffTableRowResult = null;
          switch (diff[0]) {
            case DIFF_EQUAL:
              leftContent = {
                lineNumber: lineLeft,
                lineContent: line,
                lineDiffs: [],
                prefix: ''
              };
              rightContent = {
                lineNumber: lineRight,
                lineContent: line,
                lineDiffs: [],
                prefix: ''
              };
              rowTemp = {
                leftContent,
                rightContent,
                belongTo: 'both',
                hasDiffs: false
              };
              rows.push(rowTemp);
              lineRight = lineRight + 1;
              lineLeft = lineLeft + 1;
              break;
            case DIFF_INSERT:
              leftDiffRow = rows.find(
                row => row.leftContent && !row.rightContent && row.leftContent.lineNumber === lineRight && row.leftContent.prefix !== ''
              );
              rightContent = {
                lineNumber: lineRight,
                lineContent: line,
                lineDiffs: [{ content: line, isDiff: true }],
                prefix: '+'
              };
              if (leftDiffRow) {
                leftDiffRow.rightContent = rightContent;
                leftDiffRow.leftContent.lineDiffs = this.getDiffPartsNew(
                  leftDiffRow.leftContent.lineContent,
                  leftDiffRow.rightContent.lineContent
                );
                leftDiffRow.rightContent.lineDiffs = this.getDiffPartsNew(
                  leftDiffRow.rightContent.lineContent,
                  leftDiffRow.leftContent.lineContent
                );
                leftDiffRow.belongTo = 'both';
              } else {
                rows.push({
                  leftContent: null,
                  rightContent,
                  hasDiffs: true,
                  belongTo: 'right'
                });
              }
              lineRight = lineRight + 1;
              break;
            case DIFF_DELETE:
              rightDiffRow = rows.find(
                row => !row.leftContent && row.rightContent && row.rightContent.lineNumber === lineLeft && row.rightContent.prefix !== ''
              );
              leftContent = {
                lineNumber: lineLeft,
                lineContent: line,
                lineDiffs: [{ content: line, isDiff: true }],
                prefix: '-'
              };
              if (rightDiffRow) {
                rightDiffRow.leftContent = leftContent;
                rightDiffRow.leftContent.lineDiffs = this.getDiffPartsNew(
                  rightDiffRow.leftContent.lineContent,
                  rightDiffRow.rightContent.lineContent
                );
                rightDiffRow.rightContent.lineDiffs = this.getDiffPartsNew(
                  rightDiffRow.rightContent.lineContent,
                  rightDiffRow.leftContent.lineContent
                );
                rightDiffRow.belongTo = 'both';
              } else {
                rows.push({
                  leftContent,
                  rightContent: null,
                  hasDiffs: true,
                  belongTo: 'left'
                });
              }
              lineLeft = lineLeft + 1;
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

    return diffRowsResult;
  }

  private getDiffParts(value: string, compareValue: string): string[] {
    const diffText: string[] = [];
    let i = 0;
    let j = 0;
    let diff = '';

    while (i < value.length) {
      if (value[i] === compareValue[j] && j < compareValue.length) {
        if (diff !== '') {
          diffText.push(diff);
          diff = '';
        }
      } else {
        diff += value[i];
      }
      i++;
      j++;
    }

    if (diff !== '') {
      diffText.push(diff);
    }

    return diffText;
  }

  private getDiffPartsNew(value: string, compareValue: string): DiffPart[] {
    const diffParts: DiffPart[] = [];
    let i = 0;
    let j = 0;
    let shared = '';
    let diff = '';

    while (i < value.length) {
      if (value[i] === compareValue[j] && j < compareValue.length) {
        if (diff !== '') {
          diffParts.push({
            content: diff,
            isDiff: true
          });
          diff = '';
        }
        shared += value[i];
      } else {
        if (shared !== '') {
          diffParts.push({
            content: shared,
            isDiff: false
          });
          shared = '';
        }
        diff += value[i];
      }
      i++;
      j++;
    }

    if (diff !== '') {
      diffParts.push({
        content: diff,
        isDiff: true
      });
    } else if (shared !== '') {
      diffParts.push({
        content: shared,
        isDiff: false
      });
    }

    return diffParts;
  }
}
