import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { ButtonComponent } from '../shared/components/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../shared/components/input/input.component';
import { ProductsService } from '../shared/services/products.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeroComponent,
    ButtonComponent,
    InputComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  private readonly router = inject(Router);
  private readonly productsService = inject(ProductsService);

  categorys: any[] = [];

  activeCat: any;

  onCategorySelect(category: any) {
    this.router.navigate(['/product-list'], {
      queryParams: { category: category.title },
    });
  }

  ngOnInit() {
    this.categorys = this.productsService.getCategorys();
  }
}
