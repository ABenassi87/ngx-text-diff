import { NgModule } from '@angular/core';
import { NgxTextDiffComponent } from './ngx-text-diff.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import { FormatLinePipe } from './format-line.pipe';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NgxTextDiffComponent, LoaderSpinnerComponent, FormatLinePipe],
  exports: [NgxTextDiffComponent]
})
export class NgxTextDiffModule {}
