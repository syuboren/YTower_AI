import { Routes } from '@angular/router';

export const recipesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/recipe-list-page/recipe-list-page.component').then(m => m.RecipeListPageComponent),
    title: '食譜專區 | 楊桃美食網'
  },
  {
    path: 'categories',
    loadComponent: () => import('./pages/recipe-categories-page/recipe-categories-page.component').then(m => m.RecipeCategoriesPageComponent),
    title: '主題分類 | 楊桃美食網'
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/recipe-detail-page/recipe-detail-page.component').then(m => m.RecipeDetailPageComponent),
    title: '食譜詳情 | 楊桃美食網'
  }
];

