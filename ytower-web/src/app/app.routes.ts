import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home.routes').then(m => m.homeRoutes)
      },
      {
        path: 'about',
        loadChildren: () => import('./features/about/about.routes').then(m => m.aboutRoutes)
      },
      {
        path: 'ai-assistant',
        loadChildren: () => import('./features/ai-assistant/ai-assistant.routes').then(m => m.aiAssistantRoutes)
      },
      {
        path: 'recipes',
        loadChildren: () => import('./features/recipes/recipes.routes').then(m => m.recipesRoutes)
      },
      {
        path: 'news',
        loadChildren: () => import('./features/news/news.routes').then(m => m.newsRoutes)
      },
      {
        path: 'contact',
        loadChildren: () => import('./features/contact/contact.routes').then(m => m.contactRoutes)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
