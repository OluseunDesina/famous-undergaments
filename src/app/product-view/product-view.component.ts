import { Component } from '@angular/core';
import { ProductCardComponent } from '../products/product-card/product-card.component';
import { TabsComponent } from '../shared/components/tabs/tabs.component';
import { ButtonComponent } from '../shared/components/button/button.component';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [
    ProductCardComponent, TabsComponent, ButtonComponent
  ],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss'
})
export class ProductViewComponent {

  similarProducts: any[] = [
    {
      name: 'similar product 1',
      price: '25'
    },
    {
      name: 'similar product 2',
      price: '25'
    },
    {
      name: 'similar product 3',
      price: '25'
    },
  ]

  sizesTab: any[] = [
    {
      name: 'XXL'
    },
    {
      name: 'XL'
    },
    {
      name: 'L'
    },
    {
      name: 'MD'
    },
    {
      name: 'S'
    },
    {
      name: 'XS'
    },
  ]

}
