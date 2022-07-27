import { NgModule } from '@angular/core';
import { NgxTextDiffComponent } from './ngx-text-diff.component';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import { FormatLinePipe } from './format-line.pipe';
import { NgxTextDiffContainerDirective } from './ngx-text-diff-container.directive';
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    NgxTextDiffComponent,
    LoaderSpinnerComponent,
    FormatLinePipe,
    NgxTextDiffContainerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgxTextDiffComponent
  ]
})
export class NgxTextDiffModule { }
