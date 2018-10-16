import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface DiffContent {
  leftContent: string;
  rightContent: string;
}

@Component({
  selector: 'tda-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  submitted = false;
  content: DiffContent = {
    leftContent: '',
    rightContent: ''
  };

  options: any = {
    lineNumbers: true,
    mode: 'xml'
  };

  contentObservable: Subject<DiffContent> = new Subject<DiffContent>();
  contentObservable$: Observable<DiffContent> = this.contentObservable.asObservable();

  constructor() {}

  ngOnInit() {
    this.submitted = false;
    this.content.leftContent =
      '<card xmlns="http://businesscard.org">\n' +
      '   <name>John Doe</name>\n' +
      '   <title>CEO, Widget Inc.</title>\n' +
      '   <email>john.Moe@widget.com</email>\n' +
      '   <cellphone>(202) 456-1414</cellphone>\n' +
      '   <phone>(202) 456-1414</phone>\n' +
      '   <logo url="widget.gif"/>\n' +
      ' </card>';
    this.content.rightContent =
      '<card xmlns="http://businesscard.org">\n' +
      '   <name>John Moe</name>\n' +
      '   <title>CEO, Widget Inc.</title>\n' +
      '   <email>john.Moe@widget.com</email>\n' +
      '   <phone>(202) 456-1414</phone>\n' +
      '   <address>Test</address>\n' +
      '   <logo url="widget.gif"/>\n' +
      ' </card>';
  }

  submitComparison() {
    this.submitted = false;
    this.contentObservable.next(this.content);
    this.submitted = true;
  }

  handleChange(side: 'left' | 'right', value: string) {
    switch (side) {
      case 'left':
        this.content.leftContent = value;
        break;
      case 'right':
        this.content.rightContent = value;
        break;
      default:
        break;
    }
  }
}
