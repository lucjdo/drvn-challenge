import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'floor',
  standalone: true,
})
export class FloorPipe implements PipeTransform {
  transform(value: number | string | null): number {
    if (value === null) return 0;
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(numValue) ? 0 : Math.floor(numValue);
  }
}
