import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineNumberPipe } from './line-number.pipe';
import { LineContentPipe } from './line-content.pipe';
import { LinePrefixPipe } from './line-prefix.pipe';

@NgModule({
  declarations: [LineNumberPipe, LineContentPipe, LinePrefixPipe],
  imports: [CommonModule],
  exports: [LineNumberPipe, LineContentPipe, LinePrefixPipe],
})
export class PipesModule {}
