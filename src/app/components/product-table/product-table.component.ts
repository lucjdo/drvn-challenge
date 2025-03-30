import {
  Component,
  Input,
  ViewChild,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {
  MatPaginatorModule,
  MatPaginator,
  PageEvent,
} from '@angular/material/paginator';
import { DisplayedProduct } from '../../models/product-model';
import { StockColorDirective } from '../../directives/stock-color.directive';
import { DecimalPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CurrencyService } from '../../services/currency.service';
import { CurrencySelectorComponent } from '../currency-selector/currency-selector.component';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    StockColorDirective,
    DecimalPipe,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CurrencySelectorComponent,
  ],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit, OnChanges {
  @Input() products: DisplayedProduct[] = [];
  @Input() category: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  dataSource!: MatTableDataSource<DisplayedProduct>;
  filterValue: string = '';

  constructor(
    private router: Router,
    public currencyService: CurrencyService
  ) {}

  displayedColumns: string[] = [
    'thumbnail',
    'title',
    'brand',
    'price',
    'stock',
    'rating',
    'actions',
  ];

  ngOnInit(): void {
    this.initializeDataSource();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] && !changes['products'].firstChange) {
      this.initializeDataSource();
    }
  }

  private initializeDataSource(): void {
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.paginator = this.paginator;

    // Apply existing filter if any
    if (this.filterValue) {
      this.dataSource.filter = this.filterValue.trim().toLowerCase();
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDisplayPrice(price: number): number {
    return this.currencyService.convertPrice(price);
  }

  getCurrencySymbol(): string {
    return this.currencyService.getCurrencySymbol();
  }

  navigateToDetails(id: number): void {
    this.router.navigate(['/products', id]);
  }
}
