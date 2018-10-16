import { NgModule } from '@angular/core';
import { NgxTextDiffComponent } from './ngx-text-diff.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [NgxTextDiffComponent],
  exports: [NgxTextDiffComponent]
})
export class NgxTextDiffModule {}
