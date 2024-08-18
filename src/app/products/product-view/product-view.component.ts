import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { TabsComponent } from '../../shared/components/tabs/tabs.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Product, ProductsService } from '../../shared/services/products.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [ CurrencyPipe, ProductCardComponent, TabsComponent, ButtonComponent],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss',
})
export class ProductViewComponent {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductsService);
  product!: Partial<Product>

  similarProducts: Partial<Product>[] = [];

  sizesTab: any[] = [
    {
      name: 'XXL',
    },
    {
      name: 'XL',
    },
    {
      name: 'L',
    },
    {
      name: 'MD',
    },
    {
      name: 'S',
    },
    {
      name: 'XS',
    },
  ];

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (params.has('id')) {
        const id = params.get('id');
        this.product = this.productService.getProduct(id)
        this.similarProducts = this.productService.getSimilarProducts(this.product)
      }
    });
  }

  onAddtocart(product: any) {
    this.productService.addToCart(product)
  }
}
