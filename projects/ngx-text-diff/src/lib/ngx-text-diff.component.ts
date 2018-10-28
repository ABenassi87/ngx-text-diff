import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  DiffContent,
  DiffTableBothRow,
  DiffTableFormat,
  DiffTableFormatOption,
  DiffTableRow,
  DiffTableRowResult
} from './ngx-text-diff.model';
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
  @Input() showBtnToolbar = true;
  subscriptions: Subscription[] = [];
  rows: DiffTableRow[] = [];
  filteredRows: DiffTableRow[] = [];
  leftRightRows: DiffTableBothRow[] = [];
  filteredLeftRightRows: DiffTableBothRow[] = [];
  results: DiffTableRowResult[] = [];
  filteredResults: DiffTableRowResult[] = [];
  showLinesDiffs = false;
  diffsCount = 0;

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
          this.renderDiffs().then(() => {
            this.cd.detectChanges();
          });
        })
      );
    }
    this.renderDiffs().then();
  }

  showLinesDiffsChange(value: boolean) {
    this.showLinesDiffs = value;
    if (this.showLinesDiffs) {
      this.filteredResults = this.results.filter(
        row => (row.leftContent && row.leftContent.prefix === '-') || (row.rightContent && row.rightContent.prefix === '+')
      );
    } else {
      this.filteredResults = this.results;
    }
  }

  setDiffTableFormat(format: DiffTableFormat) {
    this.format = format;
  }

  async renderDiffs() {
    try {
      this.loading = true;
      this.diffsCount = 0;
      this.results = await this.diff.getDiffsByLines(this.left, this.right);
      this.diffsCount = this.results.filter(
        row => (row.leftContent && row.leftContent.prefix === '-') || (row.rightContent && row.rightContent.prefix === '+')
      ).length;
      this.filteredResults = this.results;
      this.loading = false;
    } catch (e) {
    }
  }

  trackResults(index, row: DiffTableRowResult) {
    return row && row.leftContent ? row.leftContent.lineContent : row && row.rightContent ? row.rightContent.lineContent : undefined;
  }
}
