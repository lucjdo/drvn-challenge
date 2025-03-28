import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListingComponent } from './components/product-listing/product-listing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductListingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'drvn-challenge';
}
