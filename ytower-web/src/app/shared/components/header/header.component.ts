import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  readonly isMenuOpen = signal(false);

  readonly navItems = [
    { label: '關於我們', path: '/about' },
    { label: 'AI 食譜', path: '/ai-assistant' },
    { label: '食譜專區', path: '/recipes' },
    { label: '最新消息', path: '/news' },
    { label: '聯絡我們', path: '/contact' }
  ];

  toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}

