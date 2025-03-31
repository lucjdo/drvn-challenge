import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTableComponent } from '@components/product-table/product-table.component';
import { ProductService } from '@services/product.service';
import { DisplayedProduct } from '@models/product-model';
import { ActivatedRoute } from '@angular/router';
import { Category } from '@models/product-model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [CommonModule, ProductTableComponent, MatProgressSpinnerModule],
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  products: DisplayedProduct[] = [];
  currentCategory: Category = Category.All;
  totalItems: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  loading: boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subscribe to route query params
    this.route.queryParams.subscribe((params) => {
      const category = (params['category'] as Category) || Category.All;
      this.currentCategory = category;
      this.currentPage = 1; // Reset to first page when category changes
      this.loadProducts();
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }

  private loadProducts(): void {
    this.loading = true;
    this.productService
      .getProducts(this.currentPage, this.pageSize, this.currentCategory)
      .subscribe({
        next: (response) => {
          const displayedProducts = response.products.map(
            ({ id, title, brand, price, stock, rating, thumbnail }) => ({
              id,
              title,
              brand,
              price,
              stock,
              rating,
              thumbnail,
            })
          );

          this.products = displayedProducts;
          this.totalItems = response.total;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching products:', error);
          this.loading = false;
        },
      });
  }
}
