import { NgModule } from '@angular/core';
import { NgxTextDiffComponent } from './ngx-text-diff.component';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import { FormatLinePipe } from './format-line.pipe';
import {ContainerDirective} from './ngx-text-diff-container.directive';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    NgxTextDiffComponent,
    LoaderSpinnerComponent,
    FormatLinePipe,
    ContainerDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    NgxTextDiffComponent
  ]
})
export class NgxTextDiffModule { }
