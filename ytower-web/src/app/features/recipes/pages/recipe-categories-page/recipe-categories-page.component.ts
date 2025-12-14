import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent, CtaSectionComponent } from '../../../../shared/components';
import { MockDataService } from '../../../../core/services/mock-data.service';

@Component({
  standalone: true,
  selector: 'app-recipe-categories-page',
  templateUrl: './recipe-categories-page.component.html',
  styleUrl: './recipe-categories-page.component.scss',
  imports: [CommonModule, RouterLink, BreadcrumbComponent, CtaSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeCategoriesPageComponent {
  private mockDataService = inject(MockDataService);

  breadcrumbItems = [
    { label: '食譜專區', path: '/recipes' },
    { label: '主題總分類' }
  ];

  categories = computed(() => this.mockDataService.getCategories());
}

