import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTableComponent } from '../product-table/product-table.component';

@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [CommonModule, ProductTableComponent],
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
