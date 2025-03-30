import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/product-model';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterModule],
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
      default:
        return 'category';
    }
  }

  getCategoryLabel(category: Category): string {
    return category.charAt(0).toUpperCase() + category.slice(1);
  }
}
