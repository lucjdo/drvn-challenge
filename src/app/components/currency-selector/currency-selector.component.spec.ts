import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencySelectorComponent } from './currency-selector.component';
import { CurrencyService } from '@services/currency.service';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('CurrencySelectorComponent', () => {
  let component: CurrencySelectorComponent;
  let fixture: ComponentFixture<CurrencySelectorComponent>;
  let currencyService: jasmine.SpyObj<CurrencyService>;

  beforeEach(async () => {
    const currencyServiceSpy = jasmine.createSpyObj('CurrencyService', [
      'setCurrency',
      'getCurrentCurrency',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        CurrencySelectorComponent,
        MatButtonToggleModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: CurrencyService, useValue: currencyServiceSpy }],
    }).compileComponents();

    currencyService = TestBed.inject(
      CurrencyService
    ) as jasmine.SpyObj<CurrencyService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencySelectorComponent);
    component = fixture.componentInstance;
    currencyService.getCurrentCurrency.and.returnValue('USD');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with USD selected', () => {
    expect(currencyService.getCurrentCurrency).toHaveBeenCalled();
    expect(component.getCurrentCurrency()).toBe('USD');
  });

  it('should call setCurrency when USD button is clicked', () => {
    const usdButton = fixture.debugElement.query(
      By.css('mat-button-toggle[value="USD"]')
    );
    usdButton.triggerEventHandler('click', null);

    expect(currencyService.setCurrency).toHaveBeenCalledWith('USD');
  });

  it('should call setCurrency when EUR button is clicked', () => {
    const eurButton = fixture.debugElement.query(
      By.css('mat-button-toggle[value="EUR"]')
    );
    eurButton.triggerEventHandler('click', null);

    expect(currencyService.setCurrency).toHaveBeenCalledWith('EUR');
  });

  it('should update button checked state when currency changes', () => {
    // Initially USD should be checked
    let usdButton = fixture.debugElement.query(
      By.css('mat-button-toggle[value="USD"]')
    );
    expect(usdButton.attributes['ng-reflect-checked']).toBe('true');

    // Change currency to EUR
    currencyService.getCurrentCurrency.and.returnValue('EUR');
    fixture.detectChanges();

    // Now EUR should be checked
    const eurButton = fixture.debugElement.query(
      By.css('mat-button-toggle[value="EUR"]')
    );
    expect(eurButton.attributes['ng-reflect-checked']).toBe('true');
  });

  it('should display correct currency options', () => {
    const buttons = fixture.debugElement.queryAll(By.css('mat-button-toggle'));
    expect(buttons.length).toBe(2);

    const buttonTexts = buttons.map((button) =>
      button.nativeElement.textContent.trim()
    );
    expect(buttonTexts).toContain('USD');
    expect(buttonTexts).toContain('EUR');
  });
});
