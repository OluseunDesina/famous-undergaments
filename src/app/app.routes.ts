import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { LayoutComponent } from './core/layout/layout.component';
import { ProductViewComponent } from './products/product-view/product-view.component';
import { CartComponent } from './products/cart/cart.component';
import { OrderSummaryComponent } from './products/order-summary/order-summary.component';
import { CheckoutComponent } from './products/checkout/checkout.component';

export const routes: Routes = [
  {
    path: "",
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path:'home',
        component: LandingPageComponent
      },
      {
        path:'product-list',
        component: ProductListComponent
      },
      {
        path:'product-view/:id',
        component: ProductViewComponent
      },
      {
        path:'cart',
        component: CartComponent
      },
      {
        path:'order-summary',
        component: OrderSummaryComponent
      },
      {
        path:'checkout',
        component: CheckoutComponent
      },
    ]
  },

];
