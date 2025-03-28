import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DisplayedProduct } from '../../models/product-model';
import { StockColorDirective } from '../../directives/stock-color.directive';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';

type Currency = 'USD' | 'EUR';

@Component({
  selector: 'app-product-table',
  imports: [MatTableModule, StockColorDirective, DecimalPipe],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent {
  @Input() products: DisplayedProduct[] = [];

  private currentCurrency: Currency = 'USD';
  private readonly EUR_RATE = 1.08;

  constructor(private router: Router) {}

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

  getCurrencySymbol(): string {
    return this.currentCurrency === 'USD' ? '$' : '€';
  }

  toggleCurrency(): void {
    console.log('toggleCurrency');
    this.currentCurrency = this.currentCurrency === 'USD' ? 'EUR' : 'USD';
  }

  getDisplayPrice(price: number): number {
    return this.currentCurrency === 'USD' ? price : price * this.EUR_RATE;
  }

  navigateToDetails(id: number): void {
    console.log('navigateToDetails', id);
    this.router.navigate([`/products/${id}`]);
  }
}
