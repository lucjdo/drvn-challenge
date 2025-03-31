import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/product-model';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CurrencySelectorComponent } from '../currency-selector/currency-selector.component';
import { CategoryLabelPipe } from '../../pipes/category-label.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    CurrencySelectorComponent,
    CategoryLabelPipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  categories = Object.values(Category);

  getCategoryIcon(category: Category): string {
    switch (category) {
      case Category.Beauty:
        return 'face';
      case Category.Fragrances:
        return 'spa';
      case Category.Furniture:
        return 'chair';
      case Category.Groceries:
        return 'shopping_basket';
      case Category.HomeDecoration:
        return 'home';
      case Category.KitchenAccessories:
        return 'kitchen';
      case Category.Laptops:
        return 'laptop';
      case Category.MensWatches:
        return 'watch';
      case Category.MobileAccessories:
        return 'phone';
      case Category.Motorcycle:
        return 'motorcycle';
      case Category.SkinCare:
        return 'face';
      case Category.Smartphones:
        return 'phone';
      case Category.SportsAccessories:
        return 'sports';
      case Category.Tablets:
        return 'tablet';
      case Category.WomensWatches:
        return 'watch';
      case Category.All:
        return 'category';

      default:
        return 'category';
    }
  }
}
