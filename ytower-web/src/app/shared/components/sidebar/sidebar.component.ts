import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface SidebarRecipe {
  id: string;
  title: string;
  imageUrl: string;
  rating?: number;
}

@Component({
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  title = input<string>('人氣食譜排行榜');
  recipes = input<SidebarRecipe[]>([]);
  showSocialLinks = input<boolean>(true);
}

