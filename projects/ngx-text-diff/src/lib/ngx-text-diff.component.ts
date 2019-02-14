import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { DiffContent, DiffPart, DiffTableFormat, DiffTableFormatOption, DiffTableRowResult, DiffResults } from './ngx-text-diff.model';
import { NgxTextDiffService } from './ngx-text-diff.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'td-ngx-text-diff',
  templateUrl: './ngx-text-diff.component.html',
  styleUrls: ['./ngx-text-diff.component.css'],
})
export class NgxTextDiffComponent implements OnInit, OnDestroy {
  private _hideMatchingLines = false;

  @Input() format: DiffTableFormat = 'SideBySide';
  @Input() left = '';
  @Input() right = '';
  @Input() diffContent: Observable<DiffContent>;
  @Input() loading = false;
  @Input() showToolbar = true;
  @Input() showBtnToolbar = true;
  @Input()
  get hideMatchingLines() {
    return this._hideMatchingLines;
  }

  set hideMatchingLines(hide: boolean) {
    this.hideMatchingLinesChanged(hide);
  }
  @Input() outerContainerClass: string;
  @Input() outerContainerStyle: any;
  @Input() toolbarClass: string;
  @Input() toolbarStyle: any;
  @Input() compareRowsClass: string;
  @Input() compareRowsStyle: any;
  @Output() compareResults = new EventEmitter<DiffResults>();
  subscriptions: Subscription[] = [];
  tableRows: DiffTableRowResult[] = [];
  filteredTableRows: DiffTableRowResult[] = [];
  tableRowsLineByLine: DiffTableRowResult[] = [];
  filteredTableRowsLineByLine: DiffTableRowResult[] = [];
  diffsCount = 0;

  formatOptions: DiffTableFormatOption[] = [
    {
      id: 'side-by-side',
      name: 'side-by-side',
      label: 'Side by Side',
      value: 'SideBySide',
      icon: 'la-code',
    },
    {
      id: 'line-by-line',
      name: 'line-by-line',
      label: 'Line by Line',
      value: 'LineByLine',
      icon: 'la-file-text',
    },
  ];

  constructor(private diff: NgxTextDiffService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.loading = true;
    if (this.diffContent) {
      this.subscriptions.push(
        this.diffContent.subscribe(content => {
          this.loading = true;
          this.left = content.leftContent;
          this.right = content.rightContent;
          this.renderDiffs()
            .then(() => {
              this.cd.detectChanges();
              this.loading = false;
            })
            .catch(() => (this.loading = false));
        })
      );
    }
    this.renderDiffs()
      .then(() => (this.loading = false))
      .catch(e => (this.loading = false));
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }

  hideMatchingLinesChanged(value: boolean) {
    this._hideMatchingLines = value;
    if (this.hideMatchingLines) {
      this.filteredTableRows = this.tableRows.filter(
        row => (row.leftContent && row.leftContent.prefix === '-') || (row.rightContent && row.rightContent.prefix === '+')
      );
      this.filteredTableRowsLineByLine = this.tableRowsLineByLine.filter(
        row => (row.leftContent && row.leftContent.prefix === '-') || (row.rightContent && row.rightContent.prefix === '+')
      );
    } else {
      this.filteredTableRows = this.tableRows;
      this.filteredTableRowsLineByLine = this.tableRowsLineByLine;
    }
  }

  setDiffTableFormat(format: DiffTableFormat) {
    this.format = format;
  }

  async renderDiffs() {
    try {
      this.diffsCount = 0;
      this.tableRows = await this.diff.getDiffsByLines(this.left, this.right);
      this.tableRowsLineByLine = this.tableRows.reduce((tableLineByLine: DiffTableRowResult[], row: DiffTableRowResult) => {
        if (!tableLineByLine) {
          tableLineByLine = [];
        }
        if (row.hasDiffs) {
          if (row.leftContent) {
            tableLineByLine.push({
              leftContent: row.leftContent,
              rightContent: null,
              belongTo: row.belongTo,
              hasDiffs: true,
              numDiffs: row.numDiffs,
            });
          }
          if (row.rightContent) {
            tableLineByLine.push({
              leftContent: null,
              rightContent: row.rightContent,
              belongTo: row.belongTo,
              hasDiffs: true,
              numDiffs: row.numDiffs,
            });
          }
        } else {
          tableLineByLine.push(row);
        }

        return tableLineByLine;
      }, []);
      this.diffsCount = this.tableRows.filter(row => row.hasDiffs).length;
      this.filteredTableRows = this.tableRows;
      this.filteredTableRowsLineByLine = this.tableRowsLineByLine;
      this.emitCompareResultsEvent();
    } catch (e) {
      throw e;
    }
  }

  emitCompareResultsEvent() {
    const diffResults: DiffResults = {
      hasDiff: this.diffsCount > 0,
      diffsCount: this.diffsCount,
      rowsWithDiff: this.tableRows
        .filter(row => row.hasDiffs)
        .map(row => ({
          leftLineNumber: row.leftContent ? row.leftContent.lineNumber : null,
          rightLineNumber: row.rightContent ? row.rightContent.lineNumber : null,
          numDiffs: row.numDiffs,
        })),
    };

    this.compareResults.next(diffResults);
  }

  trackTableRows(index, row: DiffTableRowResult) {
    return row && row.leftContent ? row.leftContent.lineContent : row && row.rightContent ? row.rightContent.lineContent : undefined;
  }

  trackDiffs(index, diff: DiffPart) {
    return diff && diff.content ? diff.content : undefined;
  }
}
