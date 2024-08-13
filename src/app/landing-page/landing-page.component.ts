import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { ButtonComponent } from '../shared/components/button/button.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeroComponent,
    ButtonComponent
],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  private readonly router = inject(Router)

  categorys: any[] = [
    {
      id: 1,
      imageUrl: 'https://via.placeholder.com/600x800',
      title: 'Boxers',
      description: 'Comfortable and loose-fitting, perfect for everyday wear.',
    },
    {
      id: 2,
      imageUrl: 'https://via.placeholder.com/600x800',
      title: 'Briefs',
      description: 'Classic, snug fit for support and comfort.',
    },
    {
      id: 3,
      imageUrl: 'https://via.placeholder.com/600x800',
      title: 'Boxer Briefs',
      description: 'Combining the fit of briefs with the length of boxers.',
    },
  ];

  activeCat: any;

  onCategorySelect(category: any) {
    this.router.navigate(["/product-list"], {
      queryParams: {category: category.title}
    })
  }

}
