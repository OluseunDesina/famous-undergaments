import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TabsComponent } from '../../shared/components/tabs/tabs.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { InputComponent } from '../../shared/components/input/input.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    // ButtonComponent,
    ProductCardComponent,
    TabsComponent,
    InputComponent

  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  productActive = false;
  categories: any[] = [
    {
      name: 'All',
    },
    {
      name: 'Boxer',
    },
    {
      name: 'Brief',
    },
    {
      name: 'Boxer Brief',
    },
  ];

}
