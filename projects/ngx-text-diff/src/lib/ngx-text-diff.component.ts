import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DiffContent, DiffTableBothRow, DiffTableFormat, DiffTableFormatOption, DiffTableRow } from './ngx-text-diff.model';
import { NgxTextDiffService } from './ngx-text-diff.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'td-ngx-text-diff',
  templateUrl: './ngx-text-diff.component.html',
  styleUrls: ['./ngx-text-diff.component.css']
})
export class NgxTextDiffComponent implements OnInit {
  @Input() format: DiffTableFormat = 'SideBySide';
  @Input() left = '';
  @Input() right = '';
  @Input() loading = false;
  @Input() diffContentObservable$: Observable<DiffContent>;
  subscriptions: Subscription[] = [];
  rows: DiffTableRow[] = [];
  filteredRows: DiffTableRow[] = [];
  leftRightRows: DiffTableBothRow[] = [];
  filteredLeftRightRows: DiffTableBothRow[] = [];
  showLinesDiffs = false;
  diffs = 0;

  formatOptions: DiffTableFormatOption[] = [
    {
      id: 'side-by-side',
      name: 'side-by-side',
      label: 'Side by Side',
      value: 'SideBySide',
      icon: 'la-code'
    },
    {
      id: 'line-by-line',
      name: 'line-by-line',
      label: 'Line by Line',
      value: 'LineByLine',
      icon: 'la-file-text'
    }
  ];

  constructor(private diff: NgxTextDiffService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.diffContentObservable$) {
      this.subscriptions.push(
        this.diffContentObservable$.subscribe(content => {
          this.left = content.leftContent;
          this.right = content.rightContent;
          this.renderDiffs();
          this.cd.detectChanges();
        })
      );
    }
    this.renderDiffs();
  }

  showLinesDiffsChange(value: boolean) {
    this.showLinesDiffs = value;
    if (this.showLinesDiffs) {
      this.filteredLeftRightRows = this.leftRightRows.filter(row => row.prefix === '-' || row.prefixRight === '+');
      this.filteredRows = this.rows.filter(row => row.prefix === '-' || row.prefix === '+');
    } else {
      this.filteredLeftRightRows = this.leftRightRows;
      this.filteredRows = this.rows;
    }
  }

  setDiffTableFormat(format: DiffTableFormat) {
    this.format = format;
  }

  renderDiffs() {
    this.loading = true;
    this.leftRightRows = [];
    this.rows = [];
    this.diffs = 0;
    this.diff.getDiffs(this.left, this.right).then((diffRows: DiffTableRow[]) => {
      diffRows.forEach(row => {
        switch (row.belongTo) {
          case 'both':
            this.leftRightRows.push({
              lineNumberLeft: row.lineNumberLeft,
              lineNumberRight: row.lineNumberRight,
              prefix: row.prefix,
              prefixRight: row.prefix,
              content: row.content,
              contentRight: row.content
            });
            break;
          case 'left':
            if (!this.leftRightRows.some(rowTemp => row.lineNumberLeft === rowTemp.lineNumberLeft)) {
              const rightRow = diffRows.find(rowTemp => row.lineNumberLeft === rowTemp.lineNumberRight && rowTemp.belongTo === 'right');
              this.leftRightRows.push({
                lineNumberLeft: row.lineNumberLeft,
                lineNumberRight: rightRow ? rightRow.lineNumberRight : null,
                prefix: row.prefix,
                prefixRight: rightRow ? rightRow.prefix : null,
                content: row.content,
                contentRight: rightRow ? rightRow.content : null
              });
            }
            break;
          case 'right':
            if (!this.leftRightRows.some(rowTemp => row.lineNumberRight === rowTemp.lineNumberRight)) {
              const leftRow = diffRows.find(rowTemp => row.lineNumberRight === rowTemp.lineNumberLeft && rowTemp.belongTo === 'left');
              this.leftRightRows.push({
                lineNumberLeft: leftRow ? leftRow.lineNumberLeft : null,
                lineNumberRight: row.lineNumberRight,
                prefix: leftRow ? leftRow.prefix : null,
                prefixRight: row.prefix,
                content: leftRow ? leftRow.content : null,
                contentRight: row.content
              });
            }
            break;
        }
      });
      this.rows = diffRows;
      this.diffs = this.leftRightRows.filter(row => row.prefix === '-' || row.prefixRight === '+').length;
      this.filteredLeftRightRows = this.leftRightRows;
      this.filteredRows = this.rows;
      this.loading = false;
    });
  }
}
