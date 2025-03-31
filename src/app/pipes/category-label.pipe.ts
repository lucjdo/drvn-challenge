import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../models/product-model';

@Pipe({
  name: 'categoryLabel',
  standalone: true,
})
export class CategoryLabelPipe implements PipeTransform {
  transform(category: Category): string {
    const capitalized = category.charAt(0).toUpperCase() + category.slice(1);
    return capitalized.replace(/-/g, ' ');
  }
}
