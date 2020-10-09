import { NgModule } from '@angular/core';
import { NgxTextDiffComponent } from './ngx-text-diff.component';
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';

@NgModule({
  declarations: [NgxTextDiffComponent],
  imports: [ComponentsModule, DirectivesModule, PipesModule],
  exports: [NgxTextDiffComponent],
})
export class NgxTextDiffModule {}
