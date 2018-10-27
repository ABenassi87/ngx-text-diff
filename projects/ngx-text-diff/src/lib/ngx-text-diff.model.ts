export type DiffTableFormat = 'SideBySide' | 'LineByLine' | 'MergeView';
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

export interface DiffTableRow {
  lineNumberLeft?: number;
  lineNumberRight?: number;
  prefix?: string;
  content: DiffPart[];
  belongTo?: SideDiff;
}

export interface DiffTableBothRow extends DiffTableRow {
  prefixRight?: string;
  contentRight?: DiffPart[];
}

export interface DiffTextContent {
  lineNumberLeft?: number;
  lineNumberRight?: number;
  prefix?: string;
  diffParts: DiffPart[];
  belongTo: SideDiff;
}

export interface DiffPart {
  prefix: string;
  diff?: string;
}

export interface DiffLineResult {
  lineNumber: number;
  prefix: string;
  lineContent: string;
  lineDiffs: string[];
}
