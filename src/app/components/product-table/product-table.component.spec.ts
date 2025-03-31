import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ProductTableComponent } from './product-table.component';
import { Router } from '@angular/router';
import { CurrencyService } from '../../services/currency.service';
import { DisplayedProduct } from '../../models/product-model';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DecimalPipe } from '@angular/common';

describe('ProductTableComponent', () => {
  let component: ProductTableComponent;
  let fixture: ComponentFixture<ProductTableComponent>;
  let router: Router;
  let currencyService: CurrencyService;

  const mockProducts: DisplayedProduct[] = [
    {
      id: 1,
      title: 'Test Product 1',
      brand: 'Test Brand',
      price: 100,
      stock: 10,
      rating: 4.5,
      thumbnail: 'test1.jpg',
    },
    {
      id: 2,
      title: 'Test Product 2',
      brand: 'Test Brand',
      price: 200,
      stock: 20,
      rating: 4.0,
      thumbnail: 'test2.jpg',
    },
  ];

  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductTableComponent,
        MatTableModule,
        MatPaginatorModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        {
          provide: CurrencyService,
          useValue: {
            convertPrice: (price: number) => price,
            getCurrencySymbol: () => '$',
          },
        },
        DecimalPipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTableComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    currencyService = TestBed.inject(CurrencyService);
    component.products = mockProducts;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct data', () => {
    expect(component.dataSource.data).toEqual(mockProducts);
    expect(component.displayedColumns).toEqual([
      'thumbnail',
      'title',
      'brand',
      'price',
      'stock',
      'rating',
    ]);
  });

  it('should filter products correctly', fakeAsync(() => {
    const filterValue = 'Test Product 1';
    const event = { target: { value: filterValue } } as unknown as Event;

    component.applyFilter(event);
    tick();

    expect(component.dataSource.filteredData.length).toBe(1);
    expect(component.dataSource.filteredData[0].title).toBe('Test Product 1');
  }));

  it('should handle empty filter', fakeAsync(() => {
    const event = { target: { value: '' } } as unknown as Event;

    component.applyFilter(event);
    tick();

    expect(component.dataSource.filteredData).toEqual(mockProducts);
  }));

  it('should navigate to product details when row is clicked', () => {
    const productId = 1;
    component.navigateToDetails(productId);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products', productId]);
  });

  it('should update data source when products input changes', () => {
    const newProducts: DisplayedProduct[] = [
      {
        id: 3,
        title: 'New Product',
        brand: 'New Brand',
        price: 300,
        stock: 30,
        rating: 4.8,
        thumbnail: 'test3.jpg',
      },
    ];

    component.products = newProducts;
    component.ngOnChanges({
      products: {
        currentValue: newProducts,
        previousValue: mockProducts,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(component.dataSource.data).toEqual(newProducts);
  });

  it('should display correct category title', () => {
    component.category = 'electronics';
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector(
      '.table-controls__title'
    );
    expect(titleElement.textContent.trim()).toBe('Electronics Products');
  });

  it('should display "All products" when category is "all"', () => {
    component.category = 'all';
    fixture.detectChanges();

    const titleElement = fixture.nativeElement.querySelector(
      '.table-controls__title'
    );
    expect(titleElement.textContent.trim()).toBe('All products');
  });

  it('should format price correctly using currency service', () => {
    const price = 100;
    expect(component.getDisplayPrice(price)).toBe(price);
    expect(component.getCurrencySymbol()).toBe('$');
  });
});
