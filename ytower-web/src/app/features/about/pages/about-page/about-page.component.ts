import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent, CtaSectionComponent } from '../../../../shared/components';

@Component({
  standalone: true,
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
  imports: [CommonModule, BreadcrumbComponent, CtaSectionComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutPageComponent {
  breadcrumbItems = [
    { label: '關於我們' }
  ];

  coreValues = [
    {
      icon: 'chef',
      title: '深厚專業',
      description: '二十多年台灣飲食文化領域深耕，累積豐富料理知識與實戰經驗。每一道食譜都經嚴格測試，提供完整步驟與專業細節，幫助大家輕鬆享受烹飪樂趣。'
    },
    {
      icon: 'tech',
      title: '科技應用',
      description: '結合 AI 智慧推薦系統，為您打造個人化的料理體驗。無論是食材搭配建議、營養分析，還是進階烹飪技巧，科技讓美食更貼近日常生活。'
    },
    {
      icon: 'heart',
      title: '情感連結',
      description: '分享的餐桌，不只是味蕾的滿足，更是心與心的交流。我們致力打造一個溫暖的料理社群，讓美食成為人們日常生活中不可或缺的美好連結。'
    }
  ];

  services = [
    {
      icon: 'recipe',
      title: '食譜與影音',
      description: '精心策劃各類料理食譜，從家常菜到經典菜餚，搭配清晰影音教學，讓您輕鬆掌握每一道美味！'
    },
    {
      icon: 'ai',
      title: 'AI 食譜推薦',
      description: 'AI 立即推薦！只要輸入 AI 生成器中，就能獲得專屬食譜推薦，輕鬆解決今天要吃什麼的煩惱！'
    },
    {
      icon: 'shop',
      title: '購物網連結',
      description: '精選優質廚房用品，從電器到調味料，優質品牌食材器具，點擊即可購買！讓您的廚房設備齊全。'
    },
    {
      icon: 'community',
      title: '社群連結交流',
      description: '社群連結分享生活點滴及烹飪成果交流，讓您能和同好分享美食心得，學習更多烹飪技巧與創意菜單。'
    }
  ];
}

