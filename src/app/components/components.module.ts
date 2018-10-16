import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeEditorComponent } from './code-editor/code-editor.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CodeEditorComponent],
  exports: [CodeEditorComponent],
})
export class ComponentsModule { }
