import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ProductListingComponent,
    HttpClientModule,
    SidebarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'drvn-challenge';
}
