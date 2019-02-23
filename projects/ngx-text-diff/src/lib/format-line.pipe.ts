import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatLine'
})
export class FormatLinePipe implements PipeTransform {
  transform(line: string, diffs?: string[]): string {
    if (!line) {
      return ' ';
    }
    if (!!diffs && diffs.length > 0) {
      /*diffs.forEach(diff => {
        line = line.replace(diff, `<span class="highli">${diff}</span>`);
      });*/
    }
    return line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/ /g, '&nbsp;');
  }
}
