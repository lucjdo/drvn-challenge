import {
  Component,
  Input,
  ViewChild,
  OnInit,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import {
  MatPaginatorModule,
  MatPaginator,
  PageEvent,
} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { DisplayedProduct } from '@models/product-model';
import { StockColorDirective } from '@directives/stock-color.directive';
import { CurrencyService } from '@services/currency.service';
import { RemoveHyphenPipe } from '@pipes/remove-hyphen.pipe';

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
    MatProgressSpinnerModule,
    RemoveHyphenPipe,
  ],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent implements OnInit, OnChanges {
  @Input() products: DisplayedProduct[] = [];
  @Input() category: string = '';
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<PageEvent>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<DisplayedProduct>;
  filterValue: string = '';
  pageSizeOptions: number[] = [10, 25, 50, 100];

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
  ];

  ngOnInit(): void {
    this.initializeDataSource();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] && !changes['products'].firstChange) {
      if (!this.dataSource) {
        this.initializeDataSource();
      } else {
        this.dataSource.data = this.products;
        if (this.filterValue) {
          this.dataSource.filter = this.filterValue.trim().toLowerCase();
        }
      }
    }
  }

  private initializeDataSource(): void {
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.paginator = this.paginator;

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

  onPageChange(event: PageEvent): void {
    this.pageChange.emit(event);
  }
}
