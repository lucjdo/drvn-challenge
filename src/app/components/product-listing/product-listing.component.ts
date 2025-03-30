import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTableComponent } from '../product-table/product-table.component';
import { ProductService } from '../../services/product.service';
import { DisplayedProduct } from '../../models/product-model';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../models/product-model';

@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [CommonModule, ProductTableComponent],
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit {
  products: DisplayedProduct[] = [];
  currentCategory: Category = Category.All;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subscribe to route query params
    this.route.queryParams.subscribe((params) => {
      const category = (params['category'] as Category) || Category.All;
      this.currentCategory = category;
      this.loadProducts(category);
    });
  }

  private loadProducts(category: Category): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        let filteredProducts = response.products;

        // Filter products by category if not 'all'
        if (category !== Category.All) {
          filteredProducts = response.products.filter(
            (product) => product.category === category
          );
        }

        const displayedProducts = filteredProducts.map(
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
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }
}
