import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductResponse } from '../models/product-model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.apiUrl);
  }
}
