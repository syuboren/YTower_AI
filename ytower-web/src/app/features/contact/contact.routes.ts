import { Routes } from '@angular/router';

export const contactRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/contact-page/contact-page.component').then(m => m.ContactPageComponent),
    title: '聯絡我們 | 楊桃美食網'
  }
];

