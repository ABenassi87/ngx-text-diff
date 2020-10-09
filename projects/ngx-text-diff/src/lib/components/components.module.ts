import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineByLineContainerComponent } from './line-by-line-container/line-by-line-container.component';
import { SideBySideContainerComponent } from './side-by-side-container/side-by-side-container.component';
import { LoaderSpinnerComponent } from './loader-spinner/loader-spinner.component';
import {PipesModule} from '../pipes/pipes.module';

@NgModule({
  declarations: [LineByLineContainerComponent, SideBySideContainerComponent, LoaderSpinnerComponent],
  imports: [CommonModule, PipesModule],
  exports: [LineByLineContainerComponent, SideBySideContainerComponent, LoaderSpinnerComponent],
})
export class ComponentsModule {}
