import { NgModule } from '@angular/core';
import { NgxTextDiffComponent } from './ngx-text-diff.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  imports: [CommonModule, FormsModule, ScrollingModule, CdkTableModule, DirectivesModule, PipesModule, ComponentsModule],
  declarations: [NgxTextDiffComponent],
  exports: [NgxTextDiffComponent],
})
export class NgxTextDiffModule {}
