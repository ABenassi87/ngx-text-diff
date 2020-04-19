import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import { SideBySideTableComponent } from './side-by-side-table/side-by-side-table.component';
import { LineByLineTableComponent } from './line-by-line-table/line-by-line-table.component';
import { DirectivesModule } from '../directives/directives.module';
import { PipesModule } from '../pipes/pipes.module';
import { CdkTableModule } from '@angular/cdk/table';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [LoaderSpinnerComponent, SideBySideTableComponent, LineByLineTableComponent],
  imports: [CommonModule, CdkTableModule, ScrollingModule, DirectivesModule, PipesModule],
  exports: [LoaderSpinnerComponent, SideBySideTableComponent, LineByLineTableComponent],
})
export class ComponentsModule {}
