import {DiffTableRowResult} from "./ngx-text-diff.model";

export const isNil = (val: unknown) => val === undefined || val === null;
export const isEmpty = (val: any) => val == null || !(Object.keys(val) || val).length || (Object.keys(val) || val).length === 0;

export function countDiffs(result: DiffTableRowResult): number {
  let diffCount = 0;
  if (result.leftContent) {
    diffCount += result.leftContent.lineDiffs.filter(diff => diff.isDiff).length;
  }
  if (result.rightContent) {
    diffCount += result.rightContent.lineDiffs.filter(diff => diff.isDiff).length;
  }
  return diffCount;
}
