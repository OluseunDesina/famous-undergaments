import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CartItem, ProductsService } from '../../shared/services/products.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, CurrencyPipe, ButtonComponent, InputComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  public productService = inject(ProductsService);
  private sub = new Subscription();
  private totalSub = new Subscription();
  cartItems!: CartItem[];
  subTotal = 0;

  ngOnInit() {
    this.sub = this.productService
    .getCartItems().subscribe((cart) => {
      this.cartItems = cart
    });

    this.totalSub = this.productService
    .getTotalCost().subscribe((cost) => {
      this.subTotal = cost
    });

    // this.productService.getTotalCost()
  }

  ngOnDestroy() {
    this.sub.unsubscribe;
    this.totalSub.unsubscribe;
  }

  removeItem(id: any) {
    this.productService.removeFromCart(id)
  }

  updateItem(productId: any, quantity: any) {
    if (quantity > 0) {
      this.productService.editCart(productId, quantity)
    }
  }
}
