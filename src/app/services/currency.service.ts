import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { BehaviorSubject } from 'rxjs';

export type Currency = 'USD' | 'EUR';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private readonly STORAGE_KEY = 'selectedCurrency';
  private readonly EUR_RATE = 1.08;
  private readonly isBrowser: boolean;
  private currentCurrencySubject: BehaviorSubject<Currency>;
  currentCurrency$: any;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.currentCurrencySubject = new BehaviorSubject<Currency>(
      this.getStoredCurrency()
    );
    this.currentCurrency$ = this.currentCurrencySubject.asObservable();
  }

  private isLocalStorageAvailable(): boolean {
    return this.isBrowser && typeof localStorage !== 'undefined';
  }

  private getStoredCurrency(): Currency {
    if (!this.isLocalStorageAvailable()) {
      return 'USD';
    }
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored === 'EUR' || stored === 'USD' ? (stored as Currency) : 'USD';
  }

  setCurrency(currency: Currency): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.STORAGE_KEY, currency);
    }
    this.currentCurrencySubject.next(currency);
  }

  getCurrentCurrency(): Currency {
    return this.currentCurrencySubject.value;
  }

  convertPrice(price: number): number {
    const currency = this.getCurrentCurrency();
    return currency === 'EUR' ? price * this.EUR_RATE : price;
  }

  getCurrencySymbol(): string {
    return this.getCurrentCurrency() === 'USD' ? '$' : '€';
  }
}
