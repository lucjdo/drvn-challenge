import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DisplayedProduct } from '../../models/product-model';

@Component({
  selector: 'app-product-table',
  imports: [MatTableModule],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent {
  @Input() products: DisplayedProduct[] = [];

  displayedColumns: string[] = [
    'thumbnail',
    'title',
    'brand',
    'price',
    'stock',
    'rating',
    'actions',
  ];

  get dataSource() {
    return this.products;
  }
}
