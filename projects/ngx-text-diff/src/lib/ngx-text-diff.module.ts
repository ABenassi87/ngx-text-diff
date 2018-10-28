import { NgModule } from '@angular/core';
import { NgxTextDiffComponent } from './ngx-text-diff.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderSppinerComponent } from './loader-sppiner/loader-sppiner.component';
import { FormatLinePipe } from './format-line.pipe';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NgxTextDiffComponent, LoaderSppinerComponent, FormatLinePipe],
  exports: [NgxTextDiffComponent]
})
export class NgxTextDiffModule {}
