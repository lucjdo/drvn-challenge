import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProductResponse, Product } from '../models/product-model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  /**
   * Get paginated products from the server
   * @param page The current page number (1-based)
   * @param pageSize Number of items per page
   * @param category Optional category filter
   * @returns Observable of ProductResponse containing paginated products
   */
  getProducts(
    page: number = 1,
    pageSize: number = 10,
    category?: string
  ): Observable<ProductResponse> {
    const skip = (page - 1) * pageSize;
    let url = `${this.apiUrl}?skip=${skip}&limit=${pageSize}`;

    if (category && category !== 'all') {
      url = `${this.apiUrl}/category/${category}?skip=${skip}&limit=${pageSize}`;
    }

    return this.http.get<ProductResponse>(url);
  }

  /**
   * Get a single product by ID
   * @param id The product ID
   * @returns Observable of Product
   */
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  /**
   * Update a product
   * @param product The original product
   * @param updates The updates to apply
   * @returns Observable of the updated Product
   */
  updateProduct(
    product: Product,
    updates: Partial<Product>
  ): Observable<Product> {
    // TODO: Implement the actual update request
    const updatedProduct = { ...product, ...updates };
    return of(updatedProduct);
  }
}
