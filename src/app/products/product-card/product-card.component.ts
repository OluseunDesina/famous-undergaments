import { Component, inject, Input } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product, ProductsService, CartItem } from '../../shared/services/products.service';

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
  @Input({required: true}) product!: Partial<Product>;
  private productService = inject(ProductsService);

  productActive = false;

  onAddtocart() {
    const product: any = {
      ...this.product,
      quantity: 1
    }
    this.productService.addToCart(product)
  }


}
