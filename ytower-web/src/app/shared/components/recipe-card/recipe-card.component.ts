import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeCardComponent {
  id = input.required<string>();
  title = input.required<string>();
  imageUrl = input.required<string>();
  cookingTime = input<number>(30);
  rating = input<number>(4.5);
  difficulty = input<string>('中等');
  showRating = input<boolean>(true);
  
  get filledStars(): number[] {
    const rating = this.rating();
    return Array(Math.floor(rating)).fill(0);
  }
  
  get hasHalfStar(): boolean {
    const rating = this.rating();
    return rating % 1 >= 0.5;
  }
  
  get emptyStars(): number[] {
    const rating = this.rating();
    const filled = Math.floor(rating);
    const half = this.hasHalfStar ? 1 : 0;
    return Array(5 - filled - half).fill(0);
  }
}

