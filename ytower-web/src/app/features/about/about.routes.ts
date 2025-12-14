import { Routes } from '@angular/router';

export const aboutRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/about-page/about-page.component').then(m => m.AboutPageComponent),
    title: '關於我們 | 楊桃美食網'
  }
];

