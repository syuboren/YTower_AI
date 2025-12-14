import { Component, ChangeDetectionStrategy, inject, input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent, RecipeCardComponent, CtaSectionComponent } from '../../../../shared/components';
import { MockDataService } from '../../../../core/services/mock-data.service';

@Component({
  standalone: true,
  selector: 'app-recipe-detail-page',
  templateUrl: './recipe-detail-page.component.html',
  styleUrl: './recipe-detail-page.component.scss',
  imports: [CommonModule, RouterLink, BreadcrumbComponent, RecipeCardComponent, CtaSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailPageComponent {
  private mockDataService = inject(MockDataService);
  
  id = input.required<string>();

  recipe = computed(() => {
    const recipeId = this.id();
    return this.mockDataService.getRecipeById(recipeId);
  });

  breadcrumbItems = computed(() => {
    const recipe = this.recipe();
    return [
      { label: '食譜專區', path: '/recipes' },
      { label: recipe?.title || '食譜詳情' }
    ];
  });

  relatedRecipes = computed(() => {
    return this.mockDataService.getRecipes().slice(0, 4);
  });

  servings = signal(2);
  completedSteps = signal<number[]>([]);
  userRating = signal(0);

  decreaseServings(): void {
    const current = this.servings();
    if (current > 1) {
      this.servings.set(current - 1);
    }
  }

  increaseServings(): void {
    const current = this.servings();
    if (current < 10) {
      this.servings.set(current + 1);
    }
  }

  toggleStep(stepNumber: number): void {
    const current = this.completedSteps();
    if (current.includes(stepNumber)) {
      this.completedSteps.set(current.filter(s => s !== stepNumber));
    } else {
      this.completedSteps.set([...current, stepNumber]);
    }
  }

  isStepCompleted(stepNumber: number): boolean {
    return this.completedSteps().includes(stepNumber);
  }

  setRating(rating: number): void {
    this.userRating.set(rating);
  }

  shareToFacebook(): void {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  }

  shareToLine(): void {
    window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}`, '_blank');
  }

  copyLink(): void {
    navigator.clipboard.writeText(window.location.href);
  }

  printRecipe(): void {
    window.print();
  }
}

