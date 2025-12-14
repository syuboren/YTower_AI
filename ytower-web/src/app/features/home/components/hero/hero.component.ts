import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  DestroyRef,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Card {
  title: string;
  desc: string;
  img: string;
  tag: string;
  color: 'orange' | 'blue' | 'green' | 'pink' | 'purple';
}

interface Theme {
  name: string;
  slug: string;
  img: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  // Signals
  readonly activeIndex = signal(0);
  readonly isHovered = signal(false);
  readonly titleLine1 = signal('');
  readonly titleLine2 = signal('');

  // Constants
  private readonly targetLine1 = '料理，是生活';
  private readonly targetLine2 = '最真實的語言。';

  // Timer references
  private autoCycleInterval: ReturnType<typeof setInterval> | null = null;
  private typeInterval: ReturnType<typeof setInterval> | null = null;
  private loopTimeout: ReturnType<typeof setTimeout> | null = null;

  // Data
  readonly themes: Theme[] = [
    {
      name: '快速料理',
      slug: 'quick',
      img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: '健康料理',
      slug: 'healthy',
      img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: '節慶主題',
      slug: 'festival',
      img: 'https://images.unsplash.com/photo-1576402187878-974f70c890a5?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: '親子學習',
      slug: 'family',
      img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80'
    }
  ];

  readonly cards: Card[] = [
    {
      title: '日式 · 和風便當',
      desc: '針對上班族市場，強調快速製作與精緻擺盤。',
      img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80',
      tag: '午餐熱銷',
      color: 'orange'
    },
    {
      title: '美式 · 經典漢堡',
      desc: '高熱量滿足感，適合週末聚會與深夜外送。',
      img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80',
      tag: '週末派對',
      color: 'blue'
    },
    {
      title: '健康 · 藜麥沙拉',
      desc: '低GI飲食趨勢，鎖定健身與減重族群。',
      img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80',
      tag: '低卡輕食',
      color: 'green'
    },
    {
      title: '甜點 · 法式草莓塔',
      desc: '高利潤附加商品，提升客單價的最佳選擇。',
      img: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=600&q=80',
      tag: '下午茶',
      color: 'pink'
    },
    {
      title: '泰式 · 綠咖哩雞',
      desc: '異國風味，適合喜歡重口味與香料的客群。',
      img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80',
      tag: '異國料理',
      color: 'purple'
    }
  ];

  ngOnInit(): void {
    this.startTypingCycle();
    this.startAutoCycle();

    this.destroyRef.onDestroy(() => {
      this.clearAllTimers();
    });
  }

  // Auto Cycle Logic
  private startAutoCycle(): void {
    if (this.autoCycleInterval) {
      clearInterval(this.autoCycleInterval);
    }

    this.autoCycleInterval = setInterval(() => {
      if (!this.isHovered()) {
        this.activeIndex.update(index => (index + 1) % this.cards.length);
      }
    }, 2500);
  }

  // Typewriter Logic
  private startTypingCycle(): void {
    this.titleLine1.set('');
    this.titleLine2.set('');
    let charIndex1 = 0;
    let charIndex2 = 0;

    this.typeInterval = setInterval(() => {
      if (charIndex1 < this.targetLine1.length) {
        charIndex1++;
        this.titleLine1.set(this.targetLine1.slice(0, charIndex1));
      } else if (charIndex2 < this.targetLine2.length) {
        charIndex2++;
        this.titleLine2.set(this.targetLine2.slice(0, charIndex2));
      } else {
        if (this.typeInterval) {
          clearInterval(this.typeInterval);
        }
        this.loopTimeout = setTimeout(() => {
          this.startTypingCycle();
        }, 5000);
      }
    }, 100);
  }

  private clearAllTimers(): void {
    if (this.autoCycleInterval) clearInterval(this.autoCycleInterval);
    if (this.typeInterval) clearInterval(this.typeInterval);
    if (this.loopTimeout) clearTimeout(this.loopTimeout);
  }

  // Interaction Handlers
  onMouseEnter(): void {
    this.isHovered.set(true);
  }

  onMouseLeave(): void {
    this.isHovered.set(false);
  }

  onCardClick(index: number): void {
    const relativeIndex = (index - this.activeIndex() + this.cards.length) % this.cards.length;
    if (this.isHovered() && relativeIndex === 0) {
      // TODO: Navigate to recipe detail
      console.log(`已選擇食譜：${this.cards[index].title}`);
    }
  }

  isCardActive(index: number): boolean {
    const relativeIndex = (index - this.activeIndex() + this.cards.length) % this.cards.length;
    return relativeIndex === 0;
  }

  // Style Calculators
  getBadgeColorClass(color: string): string {
    const colors: Record<string, string> = {
      orange: 'text-orange-600 bg-orange-100 border-orange-200',
      blue: 'text-blue-600 bg-blue-100 border-blue-200',
      green: 'text-green-600 bg-green-100 border-green-200',
      purple: 'text-purple-600 bg-purple-100 border-purple-200',
      pink: 'text-pink-600 bg-pink-100 border-pink-200'
    };
    return colors[color] || colors['orange'];
  }

  getCardStyle(index: number): Record<string, string | number> {
    const relativeIndex = (index - this.activeIndex() + this.cards.length) % this.cards.length;
    const totalCards = this.cards.length;

    if (this.isHovered()) {
      // Stack State
      return {
        zIndex: totalCards - relativeIndex,
        transform: `translateY(${relativeIndex * 15}px) scale(${1 - relativeIndex * 0.05})`,
        opacity: relativeIndex > 3 ? 0 : 1 - relativeIndex * 0.2,
        filter: relativeIndex === 0 ? 'none' : 'blur(1px)',
        cursor: relativeIndex === 0 ? 'pointer' : 'default'
      };
    } else {
      // Fan State
      let fanIndex = relativeIndex;
      if (relativeIndex > totalCards / 2) {
        fanIndex = relativeIndex - totalCards;
      }

      const fanRotation = fanIndex * 12;
      const fanX = fanIndex * 90;
      const fanY = Math.abs(fanIndex) * 20;

      return {
        zIndex: totalCards - Math.abs(fanIndex),
        transform: `translateX(${fanX}px) translateY(${fanY}px) rotate(${fanRotation}deg) scale(0.95)`,
        opacity: 1,
        filter: 'none',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        cursor: 'default'
      };
    }
  }
}

