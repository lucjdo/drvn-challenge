import { Routes } from '@angular/router';
import { ProductListingComponent } from './components/product-listing/product-listing.component';

export const routes: Routes = [
  {
    path: 'products',
    component: ProductListingComponent,
  },
];
