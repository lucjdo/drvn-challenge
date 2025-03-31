import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appStockColor]',
  standalone: true,
})
export class StockColorDirective implements OnInit {
  @Input() appStockColor: number = 0;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.updateColor();
  }

  private updateColor(): void {
    if (this.appStockColor === 0) {
      this.el.nativeElement.style.color = '#ff6b6b';
    } else if (this.appStockColor < 50) {
      this.el.nativeElement.style.color = '#ffd700';
    } else {
      this.el.nativeElement.style.color = '#4dabf7';
    }
  }
}
