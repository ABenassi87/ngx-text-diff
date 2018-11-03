# ngx-text-diff
- A simple text diff `component` to be used with Angular and based on `google diff match patch` library.

## Dependencies
 - diff-match-patch : ^1.0.4
 - angular-core >= 6.0.0

## Demo
[Ngx Text Diff Demo](https://ngx-text-diff.herokuapp.com/home)

## Installation
`npm i ngx-text-diff`

## API
`module: NgxTextDiffModule`<br>
`component: NgxTextDiffComponent`<br>
`selector: td-ngx-text-diff`

### Inputs
| Input          | Type              | Required                        | Description                                                                                     |
| -------------- | ----------------- | ------------------------------- | ----------------------------------------------------------------------------------------------- |
| left           | string            | Yes                             | First text to be compared                                                                       |
| right          | string            | Yes                             | Second text to be compared                                                                      |
| diffContent    | Observable        | Optional                        | `DiffContent` observable                                                                   |
| format         | `DiffTableFormat` | Optional, default: `SideBySide` | Possible values:<br> -`SideBySide`<br> -`LineByLine`                                            |
| loading        | boolean           | Optional, default: `false`      | Possible values:<br> -`true`: shows an loading spinner.<br>- `false`: hides the loading spinner |
| showBtnToolbar | boolean           | Optional, default: `true`       | Possible values:<br> -`true`: shows the format toolbar.<br>- `false`: hides the format toolbar  |

### Custom Objects
``` typescript
export interface DiffContent {
  leftContent: string;
  rightContent: string;
}

export type DiffTableFormat = 'SideBySide' | 'LineByLine';
```

## Usage
1. Register the `NgxTextDiffModule` in a module, for example app module.
``` typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxTextDiffModule } from 'ngx-text-diff';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxTextDiffModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```


## Build the NgxTextDiff module

Run `ng build ngx-text-diff` to build the library. The build artifacts will be stored in the `dist/ngx-text-diff` directory.

## Credits

This project is based on [google diff match patch](https://github.com/google/diff-match-patch).
