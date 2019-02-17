import { NgModule } from '@angular/core';
import { NgxTextDiffComponent } from './ngx-text-diff.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import { FormatLinePipe } from './format-line.pipe';
import { ContainerDirective } from './ngx-text-diff-container.directive';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [CommonModule, FormsModule, ScrollDispatchModule],
  declarations: [NgxTextDiffComponent, LoaderSpinnerComponent, FormatLinePipe, ContainerDirective],
  exports: [NgxTextDiffComponent]
})
export class NgxTextDiffModule {}
