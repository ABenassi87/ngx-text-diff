import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DiffContent, DiffPart, DiffTableFormat, DiffTableFormatOption, DiffTableRowResult } from './ngx-text-diff.model';
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
  @Input() diffContent: Observable<DiffContent>;
  @Input() loading = false;
  @Input() showBtnToolbar = true;
  subscriptions: Subscription[] = [];
  tableRows: DiffTableRowResult[] = [];
  filteredTableRows: DiffTableRowResult[] = [];
  tableRowsLineByLine: DiffTableRowResult[] = [];
  filteredTableRowsLineByLine: DiffTableRowResult[] = [];
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
    if (this.diffContent) {
      this.subscriptions.push(
        this.diffContent.subscribe(content => {
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
      this.loading = true;
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
              hasDiffs: true
            });
          }
          if (row.rightContent) {
            tableLineByLine.push({
              leftContent: null,
              rightContent: row.rightContent,
              belongTo: row.belongTo,
              hasDiffs: true
            });
          }
        } else {
          tableLineByLine.push(row);
        }

        return tableLineByLine;
      }, []);
      this.diffsCount = this.tableRows.filter(
        row => (row.leftContent && row.leftContent.prefix === '-') || (row.rightContent && row.rightContent.prefix === '+')
      ).length;
      this.filteredTableRows = this.tableRows;
      this.filteredTableRowsLineByLine = this.tableRowsLineByLine;
      this.loading = false;
    } catch (e) {}
  }

  trackTableRows(index, row: DiffTableRowResult) {
    return row && row.leftContent ? row.leftContent.lineContent : row && row.rightContent ? row.rightContent.lineContent : undefined;
  }

  trackDiffs(index, diff: DiffPart) {
    return diff && diff.content ? diff.content : undefined;
  }
}
