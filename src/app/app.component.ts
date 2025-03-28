import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListingComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'drvn-challenge';
}
