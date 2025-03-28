import { Component, Input, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {
  MatPaginatorModule,
  MatPaginator,
  PageEvent,
} from '@angular/material/paginator';
import { DisplayedProduct } from '../../models/product-model';
import { StockColorDirective } from '../../directives/stock-color.directive';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

type Currency = 'USD' | 'EUR';

@Component({
  selector: 'app-product-table',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    StockColorDirective,
    DecimalPipe,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent {
  @Input() products: DisplayedProduct[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private currentCurrency: Currency = 'USD';
  private readonly EUR_RATE = 1.08;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  dataSource!: MatTableDataSource<DisplayedProduct>;
  filterValue: string = '';

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

  ngOnInit() {
    this.dataSource = new MatTableDataSource<DisplayedProduct>(this.products);
    this.dataSource.filterPredicate = (
      data: DisplayedProduct,
      filter: string
    ) => {
      return data.title.toLowerCase().includes(filter.toLowerCase());
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges() {
    if (this.dataSource) {
      this.dataSource.data = this.products;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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
    console.log('navigateToDetails', id);
    this.router.navigate([`/products/${id}`]);
  }
}
