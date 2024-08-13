import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe,
    ButtonComponent,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input({required: true}) product!: Partial<{name: string, imageUrl: string, id: string, price: string}>;
  productActive = false;


}
