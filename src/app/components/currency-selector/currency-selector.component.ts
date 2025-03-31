import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyService, Currency } from '@services/currency.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-currency-selector',
  imports: [CommonModule, MatButtonModule, MatButtonToggleModule],
  templateUrl: './currency-selector.component.html',
})
export class CurrencySelectorComponent {
  constructor(public currencyService: CurrencyService) {}

  setCurrency(currency: Currency): void {
    this.currencyService.setCurrency(currency);
  }

  getCurrentCurrency(): Currency {
    return this.currencyService.getCurrentCurrency();
  }
}
