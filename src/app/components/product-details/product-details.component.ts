import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Product } from '@models/product-model';
import { ProductEditModalComponent } from '@components/product-edit-modal/product-edit-modal.component';
import { FloorPipe } from '@pipes/floor.pipe';
import { StockColorDirective } from '@directives/stock-color.directive';
import { ProductService } from '@services/product.service';
import { CurrencyService } from '@services/currency.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FloorPipe,
    StockColorDirective,
  ],
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
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    public currencyService: CurrencyService
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

  private updateProduct(updatedProduct: Product): void {
    if (!this.product) return;

    this.productService.updateProduct(this.product, updatedProduct).subscribe({
      next: (updatedProduct) => {
        this.product = updatedProduct;
        this.snackBar.open('Product updated successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar'],
        });
      },
      error: () => {
        this.error = 'Failed to update product';
        this.snackBar.open('Failed to update product', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
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
        this.updateProduct(result);
      }
    });
  }

  getDisplayPrice(price: number): number {
    return this.currencyService.convertPrice(price);
  }

  getCurrencySymbol(): string {
    return this.currencyService.getCurrencySymbol();
  }
}
