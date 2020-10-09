import {Component, Input, OnInit} from '@angular/core';
import {BaseContainerComponent} from '../base-container.component';

@Component({
  selector: 'lib-side-by-side-container',
  templateUrl: './side-by-side-container.component.html',
  styleUrls: ['./side-by-side-container.component.css'],
})
export class SideBySideContainerComponent extends BaseContainerComponent implements OnInit {
  @Input() prefix = '';

  constructor() {
    super();
  }
}
