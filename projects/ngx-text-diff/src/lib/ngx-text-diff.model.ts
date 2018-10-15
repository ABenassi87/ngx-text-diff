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
  content: string;
  belongTo?: SideDiff;
}

export interface DiffTableBothRow extends DiffTableRow {
  prefixRight?: string;
  contentRight?: string;
}
