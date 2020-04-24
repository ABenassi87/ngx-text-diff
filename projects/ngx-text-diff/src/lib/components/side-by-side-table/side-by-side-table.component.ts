import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DiffLineResult, DiffPart, DiffTableRowResult } from '../../ngx-text-diff.model';

@Component({
  selector: 'td-side-by-side-table',
  templateUrl: './side-by-side-table.component.html',
  styleUrls: ['./side-by-side-table.component.css'],
})
export class SideBySideTableComponent implements OnInit {
  @Input() id: string;
  @Input() data: Observable<DiffLineResult[]>;
  @Input() displayedColumns: string[] = ['lineNumber', 'prefix', 'lineContent'];
  @Input() prefix = '';

  constructor() {}

  ngOnInit(): void {}

  trackTableRows(index, row: DiffLineResult) {
    return row?.lineNumber ?? index;
  }

  trackDiffs(index, diff: DiffPart) {
    return index;
  }
}
