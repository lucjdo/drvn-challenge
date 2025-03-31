import { TestBed } from '@angular/core/testing';
import { CurrencyService, Currency } from './currency.service';
import { PLATFORM_ID } from '@angular/core';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let mockPlatformId: Object;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();

    // Mock platform ID for browser environment
    mockPlatformId = 'browser';

    TestBed.configureTestingModule({
      providers: [
        CurrencyService,
        { provide: PLATFORM_ID, useValue: mockPlatformId },
      ],
    });

    service = TestBed.inject(CurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initialization', () => {
    it('should initialize with USD when no currency is stored', () => {
      expect(service.getCurrentCurrency()).toBe('USD');
    });

    it('should initialize with stored currency from localStorage', () => {
      // Create initial service instance
      const initialService = TestBed.inject(CurrencyService);

      // Set up localStorage with EUR
      initialService.setCurrency('EUR');

      // Create a new service instance with the same TestBed configuration
      const newService = TestBed.inject(CurrencyService);
      expect(newService.getCurrentCurrency()).toBe('EUR');
    });
  });

  describe('currency conversion', () => {
    it('should return same price for USD', () => {
      const price = 100;
      expect(service.convertPrice(price)).toBe(price);
    });

    it('should convert price to EUR using EUR_RATE', () => {
      service.setCurrency('EUR');
      const price = 100;
      expect(service.convertPrice(price)).toBe(108); // 100 * 1.08
    });
  });

  describe('currency symbol', () => {
    it('should return $ for USD', () => {
      expect(service.getCurrencySymbol()).toBe('$');
    });

    it('should return € for EUR', () => {
      service.setCurrency('EUR');
      expect(service.getCurrencySymbol()).toBe('€');
    });
  });

  describe('currency setting', () => {
    it('should update current currency and store in localStorage', () => {
      service.setCurrency('EUR');
      expect(service.getCurrentCurrency()).toBe('EUR');
      expect(localStorage.getItem('selectedCurrency')).toBe('EUR');
    });

    it('should emit new currency value through currentCurrency$ observable', (done) => {
      const expectedCurrencies: Currency[] = ['USD', 'EUR'];
      let index = 0;

      service.currentCurrency$.subscribe((currency: Currency) => {
        expect(currency).toBe(expectedCurrencies[index]);
        index++;
        if (index === expectedCurrencies.length) {
          done();
        }
      });

      service.setCurrency('EUR');
    });
  });

  describe('platform-specific behavior', () => {
    it('should handle non-browser environment gracefully', () => {
      // Reconfigure TestBed with non-browser platform
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          CurrencyService,
          { provide: PLATFORM_ID, useValue: 'server' },
        ],
      });

      const serverService = TestBed.inject(CurrencyService);
      serverService.setCurrency('EUR');
      expect(serverService.getCurrentCurrency()).toBe('EUR');
      // localStorage should not be affected in non-browser environment
      expect(localStorage.getItem('selectedCurrency')).toBeNull();
    });
  });
});
