import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'td-loader-sppiner',
  templateUrl: './loader-sppiner.component.html',
  styleUrls: ['./loader-sppiner.component.css']
})
export class LoaderSppinerComponent implements OnInit {
  @Input() active = false;

  constructor() {}

  ngOnInit() {}
}
