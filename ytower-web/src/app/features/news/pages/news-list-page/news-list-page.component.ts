import { Component, ChangeDetectionStrategy, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent, SidebarComponent, CtaSectionComponent } from '../../../../shared/components';
import { MockDataService } from '../../../../core/services/mock-data.service';

@Component({
  standalone: true,
  selector: 'app-news-list-page',
  templateUrl: './news-list-page.component.html',
  styleUrl: './news-list-page.component.scss',
  imports: [CommonModule, RouterLink, BreadcrumbComponent, SidebarComponent, CtaSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListPageComponent {
  private mockDataService = inject(MockDataService);

  breadcrumbItems = [
    { label: '最新消息' }
  ];

  newsArticles = computed(() => this.mockDataService.getNewsArticles());
  
  topRecipes = computed(() => {
    return this.mockDataService.getTopRecipes(5).map(r => ({
      id: r.id,
      title: r.title,
      imageUrl: r.imageUrl,
      rating: r.rating
    }));
  });

  currentPage = signal(1);
  totalPages = 3;

  categories = [
    { id: 'all', name: '全部' },
    { id: 'update', name: '服務更新' },
    { id: 'event', name: '活動企劃' },
    { id: 'trend', name: '美食趨勢' }
  ];

  selectedCategory = signal('all');

  selectCategory(id: string): void {
    this.selectedCategory.set(id);
  }
}

