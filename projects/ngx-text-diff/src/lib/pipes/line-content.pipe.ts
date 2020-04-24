import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineContent',
})
export class LineContentPipe implements PipeTransform {
  transform(line: string, diffs?: string[]): string {
    if (!line) {
      return ' ';
    }

    return line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/ /g, '&nbsp;');
  }
}
