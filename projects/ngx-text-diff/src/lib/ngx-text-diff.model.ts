export type DiffTableFormat = 'SideBySide' | 'LineByLine';
export type SideDiff = 'both' | 'left' | 'right';

export interface DiffTableFormatOption {
  id: string;
  name: string;
  label: string;
  value: DiffTableFormat;
  icon?: string;
  disabled?: boolean;
}

export interface DiffContent {
  leftContent: string;
  rightContent: string;
}

export interface DiffPart {
  content: string;
  isDiff: boolean;
}

export interface DiffLineResult {
  lineNumber: number;
  prefix: string;
  lineContent: string;
  lineDiffs: DiffPart[];
}

export interface DiffTableRowResult {
  leftContent: DiffLineResult | any;
  rightContent: DiffLineResult | any;
  belongTo: SideDiff;
  hasDiffs: boolean;
  numDiffs: number;
}

type RowsWithDiff = {
  leftLineNumber: number | null;
  rightLineNumber: number | null;
  numDiffs: number;
}

export interface DiffResults {
  hasDiff: boolean;
  diffsCount: number;
  rowsWithDiff: RowsWithDiff[];
}
