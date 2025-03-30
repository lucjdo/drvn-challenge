import { Routes } from '@angular/router';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

export const routes: Routes = [
  {
    path: 'products',
    component: ProductListingComponent,
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
  },
];
