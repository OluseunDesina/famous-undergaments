import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Product, ProductsService } from '../../shared/services/products.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

  private productService = inject(ProductsService);
  product!: Partial<Product>

  ngOnInit() {
    this.product = this.productService.getProduct(1)
  }

}
