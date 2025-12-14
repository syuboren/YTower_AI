import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent, AiInputBoxComponent, RecipeCardComponent, CategoryCardComponent, SidebarComponent, CtaSectionComponent } from '../../../../shared/components';
import { MockDataService } from '../../../../core/services/mock-data.service';

@Component({
  standalone: true,
  selector: 'app-recipe-list-page',
  templateUrl: './recipe-list-page.component.html',
  styleUrl: './recipe-list-page.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    BreadcrumbComponent,
    AiInputBoxComponent,
    RecipeCardComponent,
    CategoryCardComponent,
    SidebarComponent,
    CtaSectionComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeListPageComponent {
  private mockDataService = inject(MockDataService);

  breadcrumbItems = [
    { label: '食譜專區' }
  ];

  // Filters
  selectedCategory = signal<string>('');
  selectedTime = signal<string>('');
  selectedStyle = signal<string>('');

  // Data
  recipes = computed(() => this.mockDataService.getRecipes());
  topRecipes = computed(() => this.mockDataService.getTopRecipes(10));
  featuredCategories = computed(() => this.mockDataService.getCategories().slice(0, 3));

  sidebarRecipes = computed(() => {
    return this.topRecipes().map(r => ({
      id: r.id,
      title: r.title,
      imageUrl: r.imageUrl,
      rating: r.rating
    }));
  });

  timeOptions = [
    { value: '', label: '全部時間' },
    { value: '15', label: '15 分鐘內' },
    { value: '30', label: '30 分鐘內' },
    { value: '60', label: '1 小時內' }
  ];

  styleOptions = [
    { value: '', label: '全部烹調方式' },
    { value: 'chinese', label: '中式' },
    { value: 'western', label: '西式' },
    { value: 'japanese', label: '日式' },
    { value: 'korean', label: '韓式' }
  ];

  onAiGenerate(query: string): void {
    console.log('AI Generate:', query);
  }
}

