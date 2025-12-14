import { Component, inject, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MockDataService } from '../../../../core/services/mock-data.service';
import { HeroComponent } from '../../components/hero/hero.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  private readonly mockData = inject(MockDataService);

  readonly popularRecipes = this.mockData.popularRecipes.slice(0, 6);
  readonly featuredThemes = this.mockData.featuredThemes;
  readonly products = this.mockData.products.slice(0, 4);
  readonly allNewsArticles = this.mockData.newsArticles;

  // News 分類篩選
  readonly newsCategories = ['全部消息', '服務更新', '活動企劃', '美食趨勢'];
  readonly selectedNewsCategory = signal('全部消息');

  readonly filteredNews = computed(() => {
    const category = this.selectedNewsCategory();
    if (category === '全部消息') {
      return this.allNewsArticles.slice(0, 5);
    }
    return this.allNewsArticles.filter(news => news.category === category).slice(0, 5);
  });

  selectNewsCategory(category: string): void {
    this.selectedNewsCategory.set(category);
  }

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < Math.round(rating) ? 1 : 0);
  }
}

