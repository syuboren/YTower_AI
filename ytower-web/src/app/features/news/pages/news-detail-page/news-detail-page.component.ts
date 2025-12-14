import { Component, ChangeDetectionStrategy, inject, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent, SidebarComponent, CtaSectionComponent } from '../../../../shared/components';
import { MockDataService } from '../../../../core/services/mock-data.service';

@Component({
  standalone: true,
  selector: 'app-news-detail-page',
  templateUrl: './news-detail-page.component.html',
  styleUrl: './news-detail-page.component.scss',
  imports: [CommonModule, RouterLink, BreadcrumbComponent, SidebarComponent, CtaSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsDetailPageComponent {
  private mockDataService = inject(MockDataService);

  id = input.required<string>();

  article = computed(() => {
    const articles = this.mockDataService.getNewsArticles();
    return articles.find(a => a.id === this.id());
  });

  breadcrumbItems = computed(() => {
    const article = this.article();
    return [
      { label: '最新消息', path: '/news' },
      { label: article?.title || '文章詳情' }
    ];
  });

  topRecipes = computed(() => {
    return this.mockDataService.getTopRecipes(5).map(r => ({
      id: r.id,
      title: r.title,
      imageUrl: r.imageUrl,
      rating: r.rating
    }));
  });

  otherNews = computed(() => {
    return this.mockDataService.getNewsArticles().filter(a => a.id !== this.id());
  });

  shareToFacebook(): void {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  }

  shareToLine(): void {
    window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}`, '_blank');
  }
}

