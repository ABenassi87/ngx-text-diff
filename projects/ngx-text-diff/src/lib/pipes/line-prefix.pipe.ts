import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linePrefix'
})
export class LinePrefixPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value ?? ' ';
  }

}
