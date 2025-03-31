import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeHyphen',
  standalone: true,
})
export class RemoveHyphenPipe implements PipeTransform {
  transform(string: string): string {
    return string.replace(/-/g, ' ');
  }
}
