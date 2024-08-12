import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'famous-undergarments';
  showMenu = false;
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
}
