import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItem, ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private productService = inject(ProductsService)
  showMenu = false;
  cartLength = 0

  ngOnInit() {
    this.productService.getCartItems().subscribe((cart: CartItem[]) => {
      this.cartLength = cart.length
    })
  // this.cartLength = this.productService.getTotalQuantity
  }



}
