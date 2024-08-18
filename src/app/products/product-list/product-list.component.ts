import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TabsComponent } from '../../shared/components/tabs/tabs.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { ProductsService } from '../../shared/services/products.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    // ButtonComponent,
    ProductCardComponent,
    TabsComponent,
    InputComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  private productService = inject(ProductsService);
  productActive = false;
  categorys: any[] = [];

  productList: any[] = [];

  ngOnInit() {
    this.productList = this.productService.getProducts();
    this.categorys = [{ name: 'All' }, ...this.productService.getCategorys()];
  }

  onFilter(filter: any) {
    this.productList = this.productService.getProducts({filter: filter.name})
  }
}
