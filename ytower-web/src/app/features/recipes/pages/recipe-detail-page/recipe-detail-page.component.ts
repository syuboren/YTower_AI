import { Component, ChangeDetectionStrategy, inject, input, computed, signal, AfterViewInit, ElementRef, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent, RecipeCardComponent, CtaSectionComponent } from '../../../../shared/components';
import { MockDataService } from '../../../../core/services/mock-data.service';

interface NutritionInfo {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
  sodium: number;
}

@Component({
  standalone: true,
  selector: 'app-recipe-detail-page',
  templateUrl: './recipe-detail-page.component.html',
  styleUrl: './recipe-detail-page.component.scss',
  imports: [CommonModule, RouterLink, BreadcrumbComponent, RecipeCardComponent, CtaSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailPageComponent implements AfterViewInit {
  private mockDataService = inject(MockDataService);
  private elementRef = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  
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

  // 推薦廚具（使用產品資料）
  recommendedProducts = computed(() => {
    return this.mockDataService.getProducts().slice(0, 4);
  });

  // 推薦食譜主題
  featuredThemes = computed(() => {
    return this.mockDataService.featuredThemes;
  });

  // 營養資訊（模擬資料）
  nutritionInfo = computed<NutritionInfo>(() => {
    return {
      calories: 285,
      protein: 18,
      fat: 15,
      carbs: 22,
      fiber: 3,
      sodium: 680
    };
  });

  servings = signal(2);
  completedSteps = signal<number[]>([]);
  userRating = signal(0);

  // 難易度映射
  difficultyMap: Record<string, string> = {
    easy: '作法簡單',
    medium: '一般',
    hard: '較難'
  };

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollAnimations();
    }
  }

  private initScrollAnimations(): void {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = this.elementRef.nativeElement.querySelectorAll('.scroll-animate');
    animatedElements.forEach((el: Element) => {
      observer.observe(el);
    });
  }

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

  getDifficultyLabel(difficulty: string | undefined): string {
    if (!difficulty) return '作法簡單';
    return this.difficultyMap[difficulty] || '作法簡單';
  }
}
