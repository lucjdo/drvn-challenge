import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTableComponent } from '../product-table/product-table.component';
import { ProductService } from '../../services/product.service';
import { DisplayedProduct } from '../../models/product-model';

@Component({
  selector: 'app-product-listing',
  imports: [CommonModule, ProductTableComponent],
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit {
  products: DisplayedProduct[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
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
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }
}
