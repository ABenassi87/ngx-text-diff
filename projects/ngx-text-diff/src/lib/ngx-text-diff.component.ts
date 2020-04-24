import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  DiffContent,
  DiffLineByLineResult,
  DiffLineResult,
  DiffPart,
  DiffResults,
  DiffTableFormat,
  DiffTableFormatOption,
  DiffTableLineByLine,
  DiffTableRowResult,
  DiffTableSideBySide,
} from './ngx-text-diff.model';
import { NgxTextDiffService } from './ngx-text-diff.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ContainerDirective } from './directives/ngx-text-diff-container.directive';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';

@Component({
  selector: 'td-ngx-text-diff',
  templateUrl: './ngx-text-diff.component.html',
  styleUrls: ['./ngx-text-diff.component.css'],
})
export class NgxTextDiffComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(ContainerDirective) containers: QueryList<ContainerDirective>;
  @Input() format: DiffTableFormat = 'SideBySide';
  @Input() left = '';
  @Input() right = '';
  @Input() diffContent: Observable<DiffContent>;
  @Input() loading = false;
  @Input() showToolbar = true;
  @Input() showBtnToolbar = true;
  @Input() hideMatchingLines = false;
  @Input() outerContainerClass: string;
  @Input() outerContainerStyle: any;
  @Input() toolbarClass: string;
  @Input() toolbarStyle: any;
  @Input() compareRowsClass: string;
  @Input() compareRowsStyle: any;
  @Input() synchronizeScrolling = true;
  @Output() compareResults = new EventEmitter<DiffResults>();
  subscriptions: Subscription[] = [];
  tableRows: DiffTableRowResult[] = [];
  diffsCount = 0;

  private _leftContent: BehaviorSubject<DiffLineResult[]> = new BehaviorSubject<DiffLineResult[]>([]);
  leftContent$: Observable<DiffLineResult[]> = this._leftContent.asObservable();

  private _rightContent: BehaviorSubject<DiffLineResult[]> = new BehaviorSubject<DiffLineResult[]>([]);
  rightContent$: Observable<DiffLineResult[]> = this._rightContent.asObservable();

  private _lineByLine: BehaviorSubject<DiffLineByLineResult[]> = new BehaviorSubject<DiffLineByLineResult[]>([]);
  lineByLine$: Observable<DiffLineByLineResult[]> = this._lineByLine.asObservable();

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

  constructor(private scrollService: ScrollDispatcher, private diff: NgxTextDiffService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.diffContent) {
      this.subscriptions.push(
        this.diffContent.subscribe(content => {
          this.left = content.leftContent;
          this.right = content.rightContent;
          this.initTable();
        })
      );
    }

    this.initTable();
  }

  ngAfterViewInit() {
    this.initScrollListener();
  }

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }

  hideMatchingLinesChanged(hideMatchingLines: boolean) {
    if (this.hideMatchingLines !== hideMatchingLines) {
      this.hideMatchingLines = hideMatchingLines;
      this.populateTable();
    }
  }

  setDiffTableFormat(format: DiffTableFormat) {
    if (format !== this.format) {
      this.format = format;
      this.populateTable();
    }
  }

  initTable() {
    this.diff
      .getDiffsByLines(this.left, this.right)
      .then(results => {
        this.tableRows = results;
        this.populateTable();
      })
      .catch(err => {
        this.tableRows = [];
        this.populateTable();
      });
  }

  populateTable() {
    switch (this.format) {
      case 'LineByLine':
        this.populateLineByLineTable();
        break;
      case 'SideBySide':
        this.populateSideBySideTable();
        break;
    }
  }

  private populateSideBySideTable() {
    const results: DiffTableSideBySide = this.diff.getSideBySide(this.tableRows, this.hideMatchingLines);
    this._leftContent.next(results.left);
    this._rightContent.next(results.right);
  }

  private populateLineByLineTable() {
    const results: DiffTableLineByLine = this.diff.getLineByLine(this.tableRows, this.hideMatchingLines);
    this._lineByLine.next(results.rows);
  }

  trackTableRows(index, row: DiffTableRowResult) {
    return row && row.leftContent ? row.leftContent.lineContent : row && row.rightContent ? row.rightContent.lineContent : undefined;
  }

  trackDiffs(index, diff: DiffPart) {
    return diff && diff.content ? diff.content : undefined;
  }

  private initScrollListener() {
    this.subscriptions.push(
      this.scrollService.scrolled().subscribe((scrollableEv: CdkScrollable) => {
        if (scrollableEv && this.synchronizeScrolling) {
          const scrollableId = scrollableEv.getElementRef().nativeElement.id;
          const nonScrolledContainer: ContainerDirective = this.containers.find(container => container.id !== scrollableId);
          if (nonScrolledContainer) {
            nonScrolledContainer.element.scrollTo({
              top: scrollableEv.measureScrollOffset('top'),
              left: scrollableEv.measureScrollOffset('left'),
            });
          }
        }
      })
    );
  }
}
