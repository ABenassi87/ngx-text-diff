import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DiffLineByLineResult, DiffLineResult, DiffPart } from '../../ngx-text-diff.model';

@Component({
  selector: 'td-line-by-line-table',
  templateUrl: './line-by-line-table.component.html',
  styleUrls: ['./line-by-line-table.component.css']
})
export class LineByLineTableComponent implements OnInit {
  @Input() id: string;
  @Input() data: Observable<DiffLineByLineResult[]>;
  @Input() displayedColumns: string[] = ['lineNumber', 'lineNumberRight', 'prefix', 'lineContent'];

  constructor() { }

  ngOnInit(): void {
  }

  trackTableRows(index, row: DiffLineByLineResult) {
    return row?.lineNumber ?? index;
  }

  trackDiffs(index, diff: DiffPart) {
    return index;
  }

}
