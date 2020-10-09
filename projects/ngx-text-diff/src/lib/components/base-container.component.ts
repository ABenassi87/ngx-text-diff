import { Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DiffLineByLineResult, DiffPart } from '../model';

export class BaseContainerComponent implements OnInit {
  @Input() id: string;
  @Input() data: Observable<DiffLineByLineResult[]>;
  @Input() displayedColumns: string[] = ['lineNumber', 'lineNumberRight', 'prefix', 'lineContent'];

  constructor() {}

  ngOnInit(): void {}

  trackTableRows(index: number, row: DiffLineByLineResult): number {
    return row?.lineNumber ?? index;
  }

  trackDiffs(index: number, diff: DiffPart): number {
    return index;
  }
}
