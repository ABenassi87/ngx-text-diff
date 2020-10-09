import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DiffLineByLineResult, DiffPart } from '../../model';
import { BaseContainerComponent } from '../base-container.component';

@Component({
  selector: 'lib-line-by-line-container',
  templateUrl: './line-by-line-container.component.html',
  styleUrls: ['./line-by-line-container.component.css'],
})
export class LineByLineContainerComponent extends BaseContainerComponent implements OnInit {
  constructor() {
    super();
  }
}
