import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerDirective } from './ngx-text-diff-container.directive';

@NgModule({
  declarations: [ContainerDirective],
  imports: [CommonModule],
  exports: [ContainerDirective],
})
export class DirectivesModule {}
