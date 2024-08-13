import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { LayoutComponent } from './core/layout/layout.component';
import { ProductViewComponent } from './product-view/product-view.component';

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
      }
    ]
  },

];
