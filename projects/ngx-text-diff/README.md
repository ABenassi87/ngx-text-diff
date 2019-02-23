# ngx-text-diff
- A simple text diff `component` to be used with Angular and based on `google diff match patch` library.

## Dependencies
 - diff-match-patch : ^1.0.4

## Required Packages
These packages will not be auto-installed and must be installed in addition to this library.
 - @angular/common >= 6.0.0
 - @angular/core >= 6.0.0
 - @angular/forms >= 6.0.0
 - @angular/cdk >= 6.0.0 (used for scrolling synchronization)

## Demo
[Ngx Text Diff Demo](https://ngx-text-diff.herokuapp.com/home)

## Installation
`npm i ngx-text-diff`

## API
`module: NgxTextDiffModule`  
`component: NgxTextDiffComponent`  
`selector: td-ngx-text-diff`

### Inputs
| Input                | Type              | Required                        | Description                                                                                     |
| -------------------- | ----------------- | ------------------------------- | ----------------------------------------------------------------------------------------------- |
| left                 | string            | Yes                             | First text to be compared                                                                       |
| right                | string            | Yes                             | Second text to be compared                                                                      |
| diffContent          | Observable        | Optional                        | `DiffContent` observable                                                                        |
| format               | `DiffTableFormat` | Optional, default: `SideBySide` | Possible values:<br> -`SideBySide`<br> -`LineByLine`                                            |
| loading              | boolean           | Optional, default: `false`      | Possible values:<br> -`true`: shows an loading spinner.<br>- `false`: hides the loading spinner |
| hideMatchingLines    | boolean           | Optional, default: `false`      | Possible values:<br> -`true`: Only shows lines with differences.<br>- `false`: shows all lines  |
| showToolbar          | boolean           | Optional, default: `true`       | Possible values:<br> -`true`: shows the toolbar.<br>- `false`: hides the format toolbar         |
| showBtnToolbar       | boolean           | Optional, default: `true`       | Possible values:<br> -`true`: shows the format toolbar.<br>- `false`: hides the format toolbar  |
| outerContainerClass  | any               | Optional                        | `ngClass` object for the outer div                                                              |
| outerContainerStyle  | any               | Optional                        | `ngStyle` object for the outer style                                                            |
| toolbarClass         | any               | Optional                        | `ngClass` object for the toolbar div                                                            |
| toolbarStyle         | any               | Optional                        | `ngStyle` object for the toolbar style                                                          |
| compareRowsClass     | any               | Optional                        | `ngClass` object for the div surrounding the table rows                                         |
| compareRowsStyle     | any               | Optional                        | `ngStyle` object for the div surrounding the table rows                                         |
| synchronizeScrolling | boolean           | Optional, default: `true`       | Possible values:<br> -`true`: Scrolls both tables together.<br>- `false`: Scrolls individually  |

### Output
| Input          | Type        | Required | Description                             |
| -------------- | ----------- | -------- | --------------------------------------- |
| compareResults | DiffResults | Optional | Event fired when comparison is executed |

### Custom Objects
``` typescript
export interface DiffContent {
  leftContent: string;
  rightContent: string;
}

export type DiffTableFormat = 'SideBySide' | 'LineByLine';

export interface DiffResults {
  hasDiff: boolean;
  diffsCount: number;
  rowsWithDiff: {
    leftLineNumber?: number;
    rightLineNumber?: number;
    numDiffs: number;
  }[];
}
```

## Usage
1. Register the `NgxTextDiffModule` in a module, for example app module.
``` typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { NgxTextDiffModule } from 'ngx-text-diff';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ScrollDispatchModule, NgxTextDiffModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

``` typescript
import { Component, OnInit } from '@angular/core';
import { DiffContent, DiffResults } from 'ngx-text-diff/lib/ngx-text-diff.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent implements OnInit {
  left = `some text to\nbe compared!`
  right = `A changed\n version \n of the text to\nbe compared!`

  constructor() {}

  ngOnInit() {
  }

  onCompareResults(diffResults: DiffResults) {
    console.log('diffResults', diffResults);
  }
}

```

``` html
<td-ngx-text-diff
  [left]="left"
  [right]="right"
  (compareResults)="onCompareResults($event)"
>
```

## Build the NgxTextDiff module

Run `ng build ngx-text-diff` to build the library. The build artifacts will be stored in the `dist/ngx-text-diff` directory.

## Credits

This project is based on [google diff match patch](https://github.com/google/diff-match-patch).
