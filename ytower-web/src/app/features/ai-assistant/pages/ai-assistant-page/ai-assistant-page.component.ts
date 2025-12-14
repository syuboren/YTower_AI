import { Component, ChangeDetectionStrategy, inject, signal, computed, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { BreadcrumbComponent, RecipeCardComponent, CategoryCardComponent, CtaSectionComponent } from '../../../../shared/components';
import { MockDataService } from '../../../../core/services/mock-data.service';

// 食材卡牌介面
interface IngredientCard {
  id: number;
  name: string;
  img: string;
  type: string;
  element: '炎' | '水' | '地' | '風' | '光';
  atk: number;
  def: number;
  gradient: string;
}

// 食譜卡牌介面
interface RecipeCard {
  id: string;
  name: string;
  stars: number;
  atk: number;
  def: number;
  desc: string;
  img: string;
  tags: string[];
  element: string;
  gradient: string;
  cookingTime: number;
  steps: string[];
  missingIngredients: MissingIngredient[];
}

// 缺少的食材
interface MissingIngredient {
  name: string;
  purchaseUrl?: string;
}

// 遊戲狀態
type GameState = 'INPUT' | 'FUSING' | 'RESULT';

// 食材資料庫（原始版本）
const INGREDIENT_DB: Record<string, Partial<IngredientCard>> = {
  '雞蛋': { img: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=400&q=80', type: '蛋白', element: '光', atk: 500, def: 500, gradient: 'from-yellow-400 to-yellow-600' },
  '蛋': { img: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=400&q=80', type: '蛋白', element: '光', atk: 500, def: 500, gradient: 'from-yellow-400 to-yellow-600' },
  '牛肉': { img: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&w=400&q=80', type: '肉類', element: '炎', atk: 1800, def: 1200, gradient: 'from-red-500 to-red-800' },
  '豬肉': { img: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?auto=format&fit=crop&w=400&q=80', type: '肉類', element: '炎', atk: 1500, def: 1000, gradient: 'from-rose-400 to-rose-700' },
  '雞肉': { img: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=400&q=80', type: '肉類', element: '風', atk: 1400, def: 900, gradient: 'from-amber-300 to-amber-600' },
  '番茄': { img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80', type: '蔬菜', element: '水', atk: 800, def: 1000, gradient: 'from-red-400 to-orange-500' },
  '洋蔥': { img: 'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?auto=format&fit=crop&w=400&q=80', type: '蔬菜', element: '地', atk: 600, def: 900, gradient: 'from-amber-200 to-amber-500' },
  '馬鈴薯': { img: 'https://images.unsplash.com/photo-1508313880080-c4bef0730395?auto=format&fit=crop&w=400&q=80', type: '蔬菜', element: '地', atk: 700, def: 1100, gradient: 'from-yellow-600 to-amber-800' },
  '紅蘿蔔': { img: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=80', type: '蔬菜', element: '地', atk: 600, def: 1000, gradient: 'from-orange-400 to-orange-700' },
  '咖哩塊': { img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80', type: '調味', element: '炎', atk: 1200, def: 800, gradient: 'from-yellow-500 to-amber-700' },
  '咖哩': { img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80', type: '調味', element: '炎', atk: 1200, def: 800, gradient: 'from-yellow-500 to-amber-700' },
  '義大利麵': { img: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?auto=format&fit=crop&w=400&q=80', type: '主食', element: '風', atk: 1100, def: 800, gradient: 'from-amber-200 to-amber-500' },
  '白飯': { img: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=400&q=80', type: '主食', element: '光', atk: 900, def: 900, gradient: 'from-gray-100 to-gray-300' },
  '飯': { img: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=400&q=80', type: '主食', element: '光', atk: 900, def: 900, gradient: 'from-gray-100 to-gray-300' },
  '豆腐': { img: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?auto=format&fit=crop&w=400&q=80', type: '蛋白', element: '水', atk: 600, def: 800, gradient: 'from-gray-50 to-gray-200' },
  '青菜': { img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80', type: '蔬菜', element: '風', atk: 400, def: 600, gradient: 'from-green-400 to-green-600' },
  '蔥': { img: 'https://images.unsplash.com/photo-1508747703725-719f0c4d0742?auto=format&fit=crop&w=400&q=80', type: '蔬菜', element: '風', atk: 300, def: 400, gradient: 'from-green-300 to-green-500' },
  '蒜': { img: 'https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?auto=format&fit=crop&w=400&q=80', type: '調味', element: '地', atk: 400, def: 500, gradient: 'from-gray-200 to-gray-400' },
  '薑': { img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80', type: '調味', element: '炎', atk: 350, def: 450, gradient: 'from-yellow-500 to-amber-600' },
};

// 食譜結果資料庫
const RECIPE_RESULTS: RecipeCard[] = [
  {
    id: 'R1',
    name: '日式咖哩飯',
    stars: 4,
    atk: 2800,
    def: 2200,
    desc: '濃郁的咖哩醬汁包裹著軟嫩的肉塊與蔬菜，是療癒人心的經典家常料理。',
    img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80',
    tags: ['日式', '家常'],
    element: '炎',
    gradient: 'from-yellow-500 to-amber-700',
    cookingTime: 45,
    steps: [
      '將牛肉切塊，洋蔥切丁，紅蘿蔔與馬鈴薯切滾刀塊',
      '熱鍋下油，將牛肉煎至表面金黃後取出備用',
      '原鍋炒香洋蔥至透明，加入紅蘿蔔與馬鈴薯翻炒',
      '加入足量清水，放回牛肉，大火煮滾後轉小火燉煮 30 分鐘',
      '加入咖哩塊攪拌至完全融化，繼續燉煮 10 分鐘至濃稠',
      '盛上白飯，淋上咖哩即完成'
    ],
    missingIngredients: [
      { name: '紅蘿蔔', purchaseUrl: 'https://shop.ytower.com.tw' },
      { name: '馬鈴薯', purchaseUrl: 'https://shop.ytower.com.tw' }
    ]
  },
  {
    id: 'R2',
    name: '番茄炒蛋',
    stars: 2,
    atk: 1800,
    def: 1500,
    desc: '酸甜的番茄與滑嫩的雞蛋交織，10 分鐘快速上桌的國民料理。',
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80',
    tags: ['快速', '下飯'],
    element: '水',
    gradient: 'from-red-400 to-orange-500',
    cookingTime: 10,
    steps: [
      '番茄切塊，雞蛋打散加少許鹽調味',
      '熱鍋下油，倒入蛋液快速翻炒至八分熟後取出',
      '原鍋再加少許油，放入番茄翻炒出汁',
      '加入糖、鹽調味，倒回炒蛋拌勻',
      '起鍋前撒上蔥花即完成'
    ],
    missingIngredients: []
  },
  {
    id: 'R3',
    name: '麻婆豆腐',
    stars: 3,
    atk: 2200,
    def: 1800,
    desc: '香辣濃郁、麻而不嗆，滑嫩豆腐吸附肉末與豆瓣醬的香氣，讓人一口接一口。',
    img: 'https://images.unsplash.com/photo-1582576163090-09d3b6f8a969?auto=format&fit=crop&q=80',
    tags: ['川菜', '下飯'],
    element: '炎',
    gradient: 'from-red-600 to-red-900',
    cookingTime: 20,
    steps: [
      '豆腐切丁，蔥切花，蒜與薑切末',
      '熱鍋下油，小火爆香蒜末、薑末',
      '加入豬絞肉炒至變色',
      '加入豆瓣醬炒出紅油',
      '加入高湯與豆腐，煮滾後轉小火燉煮 5 分鐘',
      '勾芡後撒上蔥花與花椒粉即完成'
    ],
    missingIngredients: [
      { name: '豆瓣醬', purchaseUrl: 'https://shop.ytower.com.tw' },
      { name: '花椒粉', purchaseUrl: 'https://shop.ytower.com.tw' }
    ]
  }
];

@Component({
  standalone: true,
  selector: 'app-ai-assistant-page',
  templateUrl: './ai-assistant-page.component.html',
  styleUrl: './ai-assistant-page.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    BreadcrumbComponent,
    RecipeCardComponent,
    CategoryCardComponent,
    CtaSectionComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    // 食材跳入鍋子動畫
    trigger('ingredientJump', [
      state('waiting', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      state('jumping', style({ opacity: 0, transform: 'translateY(100px) scale(0.5)' })),
      transition('waiting => jumping', [
        animate('0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)', keyframes([
          style({ transform: 'translateY(0) scale(1)', offset: 0 }),
          style({ transform: 'translateY(-30px) scale(1.1)', offset: 0.3 }),
          style({ transform: 'translateY(100px) scale(0.3)', opacity: 0, offset: 1 })
        ]))
      ])
    ]),
    // 鍋蓋動畫
    trigger('lidAnimation', [
      state('open', style({ transform: 'translateY(-20px) rotate(-15deg)' })),
      state('closed', style({ transform: 'translateY(0) rotate(0)' })),
      transition('open => closed', animate('0.4s ease-out')),
      transition('closed => open', animate('0.3s ease-in'))
    ]),
    // 蒸氣動畫
    trigger('steamAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(0) scale(0.5)' }),
        animate('1s ease-out', style({ opacity: 1, transform: 'translateY(-30px) scale(1)' }))
      ])
    ]),
    // 卡片淡入動畫
    trigger('cardFadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    // 結果區塊淡入動畫
    trigger('resultFadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    // 結果卡片動畫
    trigger('recipeCardAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px) scale(0.95)' }),
        animate('0.4s ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ])
    ])
  ]
})
export class AiAssistantPageComponent {
  private router = inject(Router);
  private mockDataService = inject(MockDataService);
  private cdr = inject(ChangeDetectorRef);

  breadcrumbItems = [
    { label: 'AI 食譜', path: '/ai-assistant' },
    { label: 'AI 食譜生成助手' }
  ];

  // 遊戲狀態
  gameState = signal<GameState>('INPUT');

  // 輸入相關
  inputValue = signal('');
  isProcessing = signal(false);

  // 卡牌相關
  hand = signal<IngredientCard[]>([]);
  selectedCards = signal<IngredientCard[]>([]);
  imageErrors = signal<Set<number>>(new Set());

  // 融合動畫狀態
  cookingPhase = signal<'idle' | 'jumping' | 'cooking' | 'done'>('idle');
  lidState = signal<'open' | 'closed'>('open');
  showSteam = signal(false);
  jumpingIngredientIndex = signal(0);

  // 結果相關
  recipeResults = signal<RecipeCard[]>([]);
  selectedRecipe = signal<RecipeCard | null>(null);

  // 其他頁面資料
  recipes = computed(() => this.mockDataService.getRecipes().slice(0, 6));
  categories = computed(() => this.mockDataService.getCategories().slice(0, 6));

  // 新增食材到手牌
  handleAddIngredient(event?: Event): void {
    event?.preventDefault();
    const value = this.inputValue().trim();
    if (!value) return;

    this.isProcessing.set(true);
    this.inputValue.set('');

    setTimeout(() => {
      const dbKey = Object.keys(INGREDIENT_DB).find(k => value.includes(k));
      const dbEntry = dbKey ? INGREDIENT_DB[dbKey] : this.getRandomIngredient(value);

      const newCard: IngredientCard = {
        id: Date.now(),
        name: value,
        img: dbEntry.img || '',
        type: dbEntry.type || '未知',
        element: dbEntry.element || '光',
        atk: dbEntry.atk || 500,
        def: dbEntry.def || 500,
        gradient: dbEntry.gradient || 'from-gray-400 to-gray-600'
      };

      this.hand.update(cards => [...cards, newCard]);
      this.isProcessing.set(false);
      this.cdr.markForCheck();
    }, 300);
  }

  private getRandomIngredient(name: string): Partial<IngredientCard> {
    const elements: Array<'炎' | '水' | '地' | '風' | '光'> = ['炎', '水', '地', '風', '光'];
    const gradients = [
      'from-red-400 to-red-600',
      'from-blue-400 to-blue-600',
      'from-amber-400 to-amber-600',
      'from-green-400 to-green-600',
      'from-yellow-400 to-yellow-600'
    ];
    const idx = Math.floor(Math.random() * elements.length);

    return {
      type: '食材',
      element: elements[idx],
      atk: 400 + Math.floor(Math.random() * 800),
      def: 400 + Math.floor(Math.random() * 800),
      gradient: gradients[idx]
    };
  }

  // 選擇/取消選擇卡牌
  toggleSelectCard(card: IngredientCard): void {
    if (this.gameState() !== 'INPUT') return;

    const selected = this.selectedCards();
    const isSelected = selected.some(c => c.id === card.id);

    if (isSelected) {
      this.selectedCards.update(cards => cards.filter(c => c.id !== card.id));
    } else if (selected.length < 3) {
      this.selectedCards.update(cards => [...cards, card]);
    }
  }

  isSelected(card: IngredientCard): boolean {
    return this.selectedCards().some(c => c.id === card.id);
  }

  // 計算卡牌在容器中的位置
  getCardPosition(index: number, total: number): { left: string; top: string } {
    const positions = [
      { left: '10%', top: '20%' },
      { left: '60%', top: '10%' },
      { left: '35%', top: '60%' }
    ];
    return positions[index] || positions[0];
  }

  // 開始融合（鍋子動畫）
  startFusion(): void {
    if (this.selectedCards().length < 2) return;

    this.gameState.set('FUSING');
    this.cookingPhase.set('jumping');
    this.jumpingIngredientIndex.set(0);
    this.cdr.markForCheck();

    // 依序跳入食材
    const jumpNextIngredient = (index: number) => {
      if (index < this.selectedCards().length) {
        this.jumpingIngredientIndex.set(index);
        this.cdr.markForCheck();
        setTimeout(() => jumpNextIngredient(index + 1), 600);
      } else {
        // 所有食材跳入後，蓋鍋蓋
        setTimeout(() => {
          this.lidState.set('closed');
          this.cookingPhase.set('cooking');
          this.showSteam.set(true);
          this.cdr.markForCheck();

          // 烹飪完成
          setTimeout(() => {
            this.cookingPhase.set('done');
            const results = this.matchRecipes();
            this.recipeResults.set(results);
            this.gameState.set('RESULT');
            this.cdr.markForCheck();
          }, 2000);
        }, 500);
      }
    };

    setTimeout(() => jumpNextIngredient(0), 300);
  }

  private matchRecipes(): RecipeCard[] {
    const selectedNames = this.selectedCards().map(c => c.name);

    return RECIPE_RESULTS.map(recipe => {
      const missingIngredients = recipe.missingIngredients.filter(
        mi => !selectedNames.some(name => name.includes(mi.name))
      );
      return { ...recipe, missingIngredients };
    }).slice(0, 3);
  }

  // 選擇食譜查看詳情
  selectRecipe(recipe: RecipeCard): void {
    this.selectedRecipe.set(recipe);
  }

  closeRecipeDetail(): void {
    this.selectedRecipe.set(null);
  }

  // 重置遊戲
  resetGame(): void {
    this.gameState.set('INPUT');
    this.selectedCards.set([]);
    this.recipeResults.set([]);
    this.selectedRecipe.set(null);
    this.cookingPhase.set('idle');
    this.lidState.set('open');
    this.showSteam.set(false);
  }

  // 取得元素圖示顏色
  getElementColor(element: string): string {
    const colors: Record<string, string> = {
      '炎': '#ef4444',
      '水': '#3b82f6',
      '地': '#d97706',
      '風': '#22c55e',
      '光': '#eab308',
      '神': '#a855f7'
    };
    return colors[element] || '#6b7280';
  }

  // 處理圖片載入錯誤
  handleImageError(cardId: number): void {
    this.imageErrors.update(errors => {
      const newErrors = new Set(errors);
      newErrors.add(cardId);
      return newErrors;
    });
  }

  // 檢查圖片是否有錯誤
  hasImageError(cardId: number): boolean {
    return this.imageErrors().has(cardId);
  }
}
