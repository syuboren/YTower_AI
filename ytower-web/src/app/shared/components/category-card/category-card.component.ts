import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryCardComponent {
  id = input.required<string>();
  title = input.required<string>();
  description = input<string>('');
  imageUrl = input.required<string>();
  recipeCount = input<number>(0);
  showDescription = input<boolean>(true);
}

