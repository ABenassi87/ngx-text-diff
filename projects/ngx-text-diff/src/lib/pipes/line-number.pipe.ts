import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lineNumber',
})
export class LineNumberPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): number | string {
    return value !== -1 ? value : ' ';
  }
}
