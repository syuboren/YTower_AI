import { Routes } from '@angular/router';

export const newsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/news-list-page/news-list-page.component').then(m => m.NewsListPageComponent),
    title: '最新消息 | 楊桃美食網'
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/news-detail-page/news-detail-page.component').then(m => m.NewsDetailPageComponent),
    title: '最新消息 | 楊桃美食網'
  }
];

