import { Routes } from '@angular/router';

export const aiAssistantRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/ai-assistant-page/ai-assistant-page.component').then(m => m.AiAssistantPageComponent),
    title: 'AI 食譜助手 | 楊桃美食網'
  }
];

