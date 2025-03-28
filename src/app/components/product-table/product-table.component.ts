import { Component, Input, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import {
  MatPaginatorModule,
  MatPaginator,
  PageEvent,
} from '@angular/material/paginator';
import { DisplayedProduct } from '../../models/product-model';
import { StockColorDirective } from '../../directives/stock-color.directive';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

type Currency = 'USD' | 'EUR';

@Component({
  selector: 'app-product-table',
  imports: [
    MatTableModule,
    StockColorDirective,
    DecimalPipe,
    MatPaginatorModule,
  ],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent {
  @Input() products: DisplayedProduct[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private currentCurrency: Currency = 'USD';
  private readonly EUR_RATE = 1.08;

  dataSource = new MatTableDataSource<DisplayedProduct>(this.products);
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges() {
    if (this.dataSource) {
      this.dataSource.data = this.products;
    }
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
    this.router.navigate([`/products/${id}`]);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
  }
}
