import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product-model';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ProductEditModalComponent } from '../product-edit-modal/product-edit-modal.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(productId)) {
      this.error = 'Invalid product ID';
      this.loading = false;
      return;
    }

    this.loadProduct(productId);
  }

  private loadProduct(productId: number): void {
    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load product details';
        this.loading = false;
      },
    });
  }

  openEditModal(): void {
    if (!this.product) return;

    const dialogRef = this.dialog.open(ProductEditModalComponent, {
      data: this.product,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.updateProduct(this.product!, result).subscribe({
          next: (updatedProduct) => {
            this.product = updatedProduct;
          },
          error: (error) => {
            this.error = 'Failed to update product';
          },
        });
      }
    });
  }
}
