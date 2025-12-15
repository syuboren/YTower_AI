import { Component, ChangeDetectionStrategy, inject, signal, computed, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { BreadcrumbComponent, RecipeCardComponent, CategoryCardComponent, CtaSectionComponent } from '../../../../shared/components';
import { MockDataService } from '../../../../core/services/mock-data.service';

// 五芒星頂點座標介面
interface PentagramPoint {
  x: number;
  y: number;
  angle: number;
}

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
    stars: 5,
    atk: 2800,
    def: 2200,
    desc: '濃郁的咖哩醬汁包裹著軟嫩的肉塊與蔬菜，是療癒人心的經典家常料理。',
    img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80',
    tags: ['日式', '家常'],
    element: '炎',
    gradient: 'from-yellow-500 to-amber-700',
    cookingTime: 45,
    steps: ['將牛肉切塊，洋蔥切丁', '熱鍋下油煎牛肉', '加入咖哩塊燉煮', '盛上白飯即完成'],
    missingIngredients: [{ name: '紅蘿蔔', purchaseUrl: 'https://shop.ytower.com.tw' }, { name: '馬鈴薯', purchaseUrl: 'https://shop.ytower.com.tw' }]
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
    steps: ['番茄切塊，雞蛋打散', '熱鍋炒蛋至八分熟', '加入番茄翻炒', '調味後起鍋'],
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
    steps: ['豆腐切丁', '爆香蒜薑', '加入豆瓣醬炒香', '加豆腐燉煮勾芡'],
    missingIngredients: [{ name: '豆瓣醬', purchaseUrl: 'https://shop.ytower.com.tw' }, { name: '花椒粉', purchaseUrl: 'https://shop.ytower.com.tw' }]
  },
  {
    id: 'R4',
    name: '蔥爆牛肉',
    stars: 4,
    atk: 2500,
    def: 1900,
    desc: '大火快炒的蔥爆牛肉，蔥香與肉香完美結合，下飯神器。',
    img: 'https://images.unsplash.com/photo-1551028150-64b9f398f678?auto=format&fit=crop&q=80',
    tags: ['中式', '快炒'],
    element: '炎',
    gradient: 'from-amber-500 to-red-600',
    cookingTime: 15,
    steps: ['牛肉切片醃製', '蔥切段備用', '大火快炒牛肉', '加入蔥段翻炒'],
    missingIngredients: []
  },
  {
    id: 'R5',
    name: '蒜香義大利麵',
    stars: 3,
    atk: 2100,
    def: 1700,
    desc: '橄欖油爆香蒜片，搭配彈牙的義大利麵，簡單卻美味的經典料理。',
    img: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&q=80',
    tags: ['義式', '快速'],
    element: '風',
    gradient: 'from-amber-300 to-yellow-600',
    cookingTime: 20,
    steps: ['煮義大利麵', '橄欖油爆香蒜片', '拌入煮好的麵', '調味即完成'],
    missingIngredients: [{ name: '橄欖油', purchaseUrl: 'https://shop.ytower.com.tw' }]
  },
  {
    id: 'R6',
    name: '韓式拌飯',
    stars: 4,
    atk: 2400,
    def: 2000,
    desc: '色彩繽紛的韓式拌飯，各種蔬菜與辣醬拌在一起，營養均衡又美味。',
    img: 'https://images.unsplash.com/photo-1553163147-622ab57be1c7?auto=format&fit=crop&q=80',
    tags: ['韓式', '健康'],
    element: '地',
    gradient: 'from-orange-400 to-red-500',
    cookingTime: 30,
    steps: ['準備各式蔬菜', '分別炒熟調味', '白飯鋪上蔬菜', '加蛋與辣醬拌勻'],
    missingIngredients: [{ name: '韓式辣醬', purchaseUrl: 'https://shop.ytower.com.tw' }]
  },
  {
    id: 'R7',
    name: '三杯雞',
    stars: 5,
    atk: 2700,
    def: 2100,
    desc: '台式經典三杯雞，麻油香氣撲鼻，九層塔提味，白飯殺手！',
    img: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&q=80',
    tags: ['台式', '經典'],
    element: '炎',
    gradient: 'from-amber-600 to-brown-700',
    cookingTime: 35,
    steps: ['雞腿切塊', '麻油爆香薑蒜', '加入雞肉煎香', '加醬油米酒燒煮'],
    missingIngredients: [{ name: '九層塔', purchaseUrl: 'https://shop.ytower.com.tw' }]
  },
  {
    id: 'R8',
    name: '蛋花湯',
    stars: 1,
    atk: 1200,
    def: 1400,
    desc: '清淡爽口的蛋花湯，簡單易做，是家常餐桌上的常客。',
    img: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80',
    tags: ['湯品', '清淡'],
    element: '水',
    gradient: 'from-yellow-200 to-amber-400',
    cookingTime: 8,
    steps: ['水煮滾加鹽', '蛋打散', '慢慢倒入蛋液', '撒上蔥花'],
    missingIngredients: []
  },
  {
    id: 'R9',
    name: '宮保雞丁',
    stars: 4,
    atk: 2600,
    def: 1850,
    desc: '香辣過癮的宮保雞丁，花生酥脆雞肉嫩滑，經典川菜必學。',
    img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80',
    tags: ['川菜', '辣'],
    element: '炎',
    gradient: 'from-red-500 to-orange-600',
    cookingTime: 25,
    steps: ['雞胸切丁醃製', '炒香辣椒花椒', '加入雞丁快炒', '加花生翻炒'],
    missingIngredients: [{ name: '花生', purchaseUrl: 'https://shop.ytower.com.tw' }]
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
    // 卡片進入卡槽動畫
    trigger('slotFillIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.3) rotate(-180deg)' }),
        animate('0.5s cubic-bezier(0.34, 1.56, 0.64, 1)', style({ opacity: 1, transform: 'scale(1) rotate(0)' }))
      ])
    ]),
    // 融合吸入動畫
    trigger('convergeAnimation', [
      state('idle', style({ opacity: 1, transform: 'translate(0, 0) scale(1) rotate(0)' })),
      state('converging', style({ opacity: 0, transform: 'translate(var(--tx), var(--ty)) scale(0) rotate(720deg)' })),
      transition('idle => converging', [
        animate('1.2s cubic-bezier(0.55, 0.055, 0.675, 0.19)')
      ])
    ])
  ]
})
export class AiAssistantPageComponent implements OnInit {
  private router = inject(Router);
  private mockDataService = inject(MockDataService);
  private cdr = inject(ChangeDetectorRef);

  breadcrumbItems = [
    { label: 'AI 食譜', path: '/ai-assistant' },
    { label: 'AI 食譜生成助手' }
  ];

  // 五芒星相關常數（使用百分比座標）
  readonly PENTAGRAM_SIZE = 100; // 百分比基準
  readonly PENTAGRAM_RADIUS = 40; // 半徑（百分比）
  readonly PENTAGRAM_CENTER = { x: 50, y: 50 }; // 中心點（百分比）
  readonly MAX_CARDS = 5; // 最大卡片數量

  // 五芒星頂點座標（預計算）
  pentagramPoints: PentagramPoint[] = [];

  // 五芒星動畫狀態
  pentagramDrawn = signal(false);

  // 遊戲狀態
  gameState = signal<GameState>('INPUT');

  // 輸入相關
  inputValue = signal('');
  isProcessing = signal(false);

  // 卡牌相關
  hand = signal<IngredientCard[]>([]);
  selectedCards = signal<IngredientCard[]>([]);
  imageErrors = signal<Set<number>>(new Set());

  // 結果相關
  allRecipeResults = signal<RecipeCard[]>([]); // 所有匹配的食譜
  recipeResults = signal<RecipeCard[]>([]); // 當前顯示的食譜（一批3張）
  selectedRecipe = signal<RecipeCard | null>(null);
  currentBatch = signal(0); // 當前批次
  recipesPerBatch = 3; // 每批顯示數量
  isChangingBatch = signal(false); // 換批次動畫狀態

  // 其他頁面資料
  recipes = computed(() => this.mockDataService.getRecipes().slice(0, 6));
  categories = computed(() => this.mockDataService.getCategories().slice(0, 6));

  ngOnInit(): void {
    // 計算五芒星頂點座標
    this.calculatePentagramPoints();

    // 延遲觸發五芒星繪製動畫
    setTimeout(() => {
      this.pentagramDrawn.set(true);
      this.cdr.markForCheck();
    }, 100);
  }

  // 計算五芒星5個頂點的座標
  private calculatePentagramPoints(): void {
    const points: PentagramPoint[] = [];
    const startAngle = -90; // 從頂部開始（-90度）

    for (let i = 0; i < 5; i++) {
      const angle = startAngle + (i * 72); // 每個頂點相隔72度
      const radian = (angle * Math.PI) / 180;
      points.push({
        x: this.PENTAGRAM_CENTER.x + this.PENTAGRAM_RADIUS * Math.cos(radian),
        y: this.PENTAGRAM_CENTER.y + this.PENTAGRAM_RADIUS * Math.sin(radian),
        angle: angle
      });
    }

    this.pentagramPoints = points;
  }

  // 獲取五芒星 SVG 路徑（用於繪製星形線條）
  // SVG viewBox 是 300x300，需要將百分比轉換為 SVG 座標
  getPentagramPath(): string {
    if (this.pentagramPoints.length !== 5) return '';

    // 五芒星的連接順序：0->2->4->1->3->0（明確回到起點）
    const order = [0, 2, 4, 1, 3];
    const pathParts = order.map((idx, i) => {
      const point = this.pentagramPoints[idx];
      // 將百分比轉換為 SVG 座標（viewBox 300x300）
      const svgX = (point.x / 100) * 300;
      const svgY = (point.y / 100) * 300;
      return i === 0 ? `M ${svgX} ${svgY}` : `L ${svgX} ${svgY}`;
    });

    // 使用 Z 指令明確閉合路徑，確保最後一段線條連回起點
    return pathParts.join(' ') + ' Z';
  }

  // 獲取卡槽在特定位置的樣式
  getSlotStyle(index: number): { left: string; top: string } {
    if (index >= this.pentagramPoints.length) {
      return { left: '50%', top: '50%' };
    }

    const point = this.pentagramPoints[index];
    return {
      left: `${point.x}px`,
      top: `${point.y}px`
    };
  }

  // 獲取卡片到中心的位移量（用於融合動畫）
  getConvergeTransform(index: number): { tx: string; ty: string } {
    if (index >= this.pentagramPoints.length) {
      return { tx: '0px', ty: '0px' };
    }

    const point = this.pentagramPoints[index];
    return {
      tx: `${this.PENTAGRAM_CENTER.x - point.x}px`,
      ty: `${this.PENTAGRAM_CENTER.y - point.y}px`
    };
  }

  // 分析進度相關
  analyzingText = signal('');
  analyzedCount = signal(0);
  totalToAnalyze = signal(0);

  // 新增食材到手牌
  handleAddIngredient(event?: Event): void {
    event?.preventDefault();
    const value = this.inputValue().trim();
    if (!value) return;

    this.isProcessing.set(true);
    this.inputValue.set('');
    this.analyzingText.set('正在分析文字內容...');
    this.cdr.markForCheck();

    setTimeout(() => {
      // 智慧提取食材：支援文字描述或多食材輸入
      const extractedIngredients = this.extractIngredients(value);

      if (extractedIngredients.length > 0) {
        this.totalToAnalyze.set(extractedIngredients.length);
        this.analyzedCount.set(0);
        this.analyzingText.set(`發現 ${extractedIngredients.length} 項食材，開始識別...`);
        this.cdr.markForCheck();

        // 批量新增提取到的食材（較長間隔，有分析效果）
        const intervalTime = 800; // 每個食材間隔 800ms

        extractedIngredients.forEach((ingredient, index) => {
          setTimeout(() => {
            this.analyzingText.set(`識別中：${ingredient}...`);
            this.cdr.markForCheck();

            // 延遲一下再新增卡片，產生「分析後出現」的效果
            setTimeout(() => {
              this.addIngredientCard(ingredient);
              this.analyzedCount.set(index + 1);
              this.cdr.markForCheck();
            }, 400);
          }, index * intervalTime);
        });

        // 最後一個食材新增完成後，結束處理狀態
        setTimeout(() => {
          this.analyzingText.set('食材識別完成！');
          this.cdr.markForCheck();

          setTimeout(() => {
            this.isProcessing.set(false);
            this.analyzingText.set('');
            this.cdr.markForCheck();
          }, 600);
        }, extractedIngredients.length * intervalTime + 400);
      } else {
        // 沒有匹配到已知食材時，將整個輸入當作單一食材
        this.analyzingText.set(`識別中：${value}...`);
        this.cdr.markForCheck();

        setTimeout(() => {
          this.addIngredientCard(value);
          this.analyzingText.set('食材識別完成！');
          this.cdr.markForCheck();

          setTimeout(() => {
            this.isProcessing.set(false);
            this.analyzingText.set('');
            this.cdr.markForCheck();
          }, 600);
        }, 500);
      }
    }, 500);
  }

  // 智慧提取食材：從文字中識別食材名稱
  private extractIngredients(text: string): string[] {
    const ingredients: string[] = [];
    const existingNames = new Set(this.hand().map(card => card.name));

    // 取得所有已知食材關鍵字
    const knownIngredients = Object.keys(INGREDIENT_DB);

    // 從文字中匹配已知食材
    for (const ingredient of knownIngredients) {
      if (text.includes(ingredient) && !existingNames.has(ingredient)) {
        // 避免重複添加（例如「蛋」和「雞蛋」）
        const alreadyAdded = ingredients.some(added =>
          added.includes(ingredient) || ingredient.includes(added)
        );
        if (!alreadyAdded) {
          ingredients.push(ingredient);
          existingNames.add(ingredient);
        }
      }
    }

    // 如果沒有匹配到已知食材，嘗試用分隔符號拆分
    if (ingredients.length === 0) {
      const separators = /[,，、\s\n]+/;
      const parts = text.split(separators).map(p => p.trim()).filter(p => p.length > 0);

      for (const part of parts) {
        if (!existingNames.has(part)) {
          ingredients.push(part);
          existingNames.add(part);
        }
      }
    }

    return ingredients;
  }

  // 新增單一食材卡片到手牌
  private addIngredientCard(ingredientName: string): void {
    const existingNames = new Set(this.hand().map(card => card.name));
    if (existingNames.has(ingredientName)) return; // 避免重複

    const dbKey = Object.keys(INGREDIENT_DB).find(k => ingredientName.includes(k) || k.includes(ingredientName));
    const dbEntry = dbKey ? INGREDIENT_DB[dbKey] : this.getRandomIngredient(ingredientName);

    const newCard: IngredientCard = {
      id: Date.now() + Math.random(), // 確保唯一 ID
      name: ingredientName,
      img: dbEntry.img || '',
      type: dbEntry.type || '未知',
      element: dbEntry.element || '光',
      atk: dbEntry.atk || 500,
      def: dbEntry.def || 500,
      gradient: dbEntry.gradient || 'from-gray-400 to-gray-600'
    };

    this.hand.update(cards => [...cards, newCard]);
    this.cdr.markForCheck();
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

  // 選擇/取消選擇卡牌（最多5張）
  toggleSelectCard(card: IngredientCard): void {
    if (this.gameState() !== 'INPUT') return;

    const selected = this.selectedCards();
    const isSelected = selected.some(c => c.id === card.id);

    if (isSelected) {
      this.selectedCards.update(cards => cards.filter(c => c.id !== card.id));
    } else if (selected.length < this.MAX_CARDS) {
      this.selectedCards.update(cards => [...cards, card]);
    }
    // 強制立即更新視圖
    this.cdr.detectChanges();
  }

  // 從手牌中移除食材
  removeCard(card: IngredientCard, event: Event): void {
    event.stopPropagation(); // 防止觸發選擇事件

    // 同時從手牌和已選擇中移除
    this.hand.update(cards => cards.filter(c => c.id !== card.id));
    this.selectedCards.update(cards => cards.filter(c => c.id !== card.id));

    this.cdr.detectChanges();
  }

  isSelected(card: IngredientCard): boolean {
    return this.selectedCards().some(c => c.id === card.id);
  }

  // 獲取卡片在卡槽中的索引
  getSlotIndex(card: IngredientCard): number {
    return this.selectedCards().findIndex(c => c.id === card.id);
  }

  // 融合動畫階段
  // ready: 五芒星閃爍 + 空白卡槽
  // summoning: 順時鐘逐一出現食材卡片
  // tracing: 光線沿五芒星描繪（帶微粒效果）
  // dissolving: 卡牌分解成粒子匯聚中心
  // revealing: 食譜卡牌一張一張翻轉出現
  fusionPhase = signal<'idle' | 'ready' | 'summoning' | 'tracing' | 'dissolving' | 'revealing'>('idle');

  // 當前顯示的食材卡片數量（用於順時鐘逐一顯示）
  visibleCardCount = signal(0);

  // 當前顯示的食譜卡片數量（用於逐一翻轉顯示）
  visibleRecipeCount = signal(0);

  // 開始融合動畫
  startFusion(): void {
    if (this.selectedCards().length < 2) return;

    this.gameState.set('FUSING');
    this.visibleCardCount.set(0);
    this.visibleRecipeCount.set(0);

    // 階段一：準備（0.5s）- 五芒星閃爍 + 空白卡槽
    this.fusionPhase.set('ready');
    this.cdr.detectChanges();

    setTimeout(() => {
      // 階段二：召喚（2s）- 順時鐘逐一出現食材卡片
      this.fusionPhase.set('summoning');
      this.cdr.detectChanges();

      // 每隔一定時間顯示一張卡片
      const cardCount = this.selectedCards().length;
      const interval = 2000 / cardCount;

      for (let i = 1; i <= cardCount; i++) {
        setTimeout(() => {
          this.visibleCardCount.set(i);
          this.cdr.detectChanges();
        }, interval * i);
      }

      setTimeout(() => {
        // 階段三：描繪（2s）- 光線沿五芒星描繪
        this.fusionPhase.set('tracing');
        this.cdr.detectChanges();

        setTimeout(() => {
          // 階段四：融合（2.5s）- 卡牌分解成粒子匯聚（延長時間）
          this.fusionPhase.set('dissolving');
          this.cdr.detectChanges();

          setTimeout(() => {
            // 階段五：爆發過渡 - 閃光效果後進入結果頁面
            this.fusionPhase.set('revealing');
            const results = this.matchRecipes();
            this.allRecipeResults.set(results);
            this.currentBatch.set(0);
            // 顯示第一批食譜
            this.recipeResults.set(results.slice(0, this.recipesPerBatch));
            this.cdr.detectChanges();

            // 爆發閃光過渡（1秒），然後進入結果頁面
            setTimeout(() => {
              this.gameState.set('RESULT');
              this.fusionPhase.set('idle');
              this.cdr.detectChanges();

              // 在結果頁面逐一翻轉顯示食譜卡片
              const recipeCount = results.length;
              for (let i = 1; i <= recipeCount; i++) {
                setTimeout(() => {
                  this.visibleRecipeCount.set(i);
                  this.cdr.detectChanges();
                }, i * 800); // 每張間隔 0.8 秒
              }
            }, 1000); // 爆發過渡時間
          }, 2500); // dissolving 階段
        }, 2000);
    }, 2000);
    }, 500);
  }

  private matchRecipes(): RecipeCard[] {
    const selectedNames = this.selectedCards().map(c => c.name);

    // 返回所有食譜（9張），不再限制為 3 張
    return RECIPE_RESULTS.map(recipe => {
      const missingIngredients = recipe.missingIngredients.filter(
        mi => !selectedNames.some(name => name.includes(mi.name))
      );
      return { ...recipe, missingIngredients };
    });
  }

  // 選擇食譜查看詳情
  selectRecipe(recipe: RecipeCard): void {
    this.selectedRecipe.set(recipe);
  }

  closeRecipeDetail(): void {
    this.selectedRecipe.set(null);
  }

  // 重置遊戲
  // 換下一批食譜
  nextBatch(): void {
    const all = this.allRecipeResults();
    const totalBatches = Math.ceil(all.length / this.recipesPerBatch);
    const nextBatchIndex = (this.currentBatch() + 1) % totalBatches;

    // 開始換批次動畫
    this.isChangingBatch.set(true);
    this.visibleRecipeCount.set(0);
    this.cdr.detectChanges();

    // 換批次動畫延遲
    setTimeout(() => {
      this.currentBatch.set(nextBatchIndex);
      const start = nextBatchIndex * this.recipesPerBatch;
      const end = start + this.recipesPerBatch;
      this.recipeResults.set(all.slice(start, end));
      this.isChangingBatch.set(false);
      this.cdr.detectChanges();

      // 逐一顯示新批次的卡片
      const recipeCount = this.recipeResults().length;
      for (let i = 1; i <= recipeCount; i++) {
        setTimeout(() => {
          this.visibleRecipeCount.set(i);
          this.cdr.detectChanges();
        }, i * 400);
      }
    }, 400);
  }

  // 計算總批次數
  get totalBatches(): number {
    return Math.ceil(this.allRecipeResults().length / this.recipesPerBatch);
  }

  resetGame(): void {
    this.gameState.set('INPUT');
    this.selectedCards.set([]);
    this.allRecipeResults.set([]);
    this.recipeResults.set([]);
    this.selectedRecipe.set(null);
    this.visibleCardCount.set(0);
    this.visibleRecipeCount.set(0);
    this.currentBatch.set(0);
    this.isChangingBatch.set(false);
    this.cdr.markForCheck();
  }

  // 隨機新增一種食材（不重複）
  addRandomIngredient(): void {
    // 取得目前手牌中已有的食材名稱
    const existingNames = new Set(this.hand().map(card => card.name));

    // 過濾掉已存在的食材
    const availableIngredients = Object.keys(INGREDIENT_DB).filter(
      name => !existingNames.has(name)
    );

    // 沒有可用的食材了
    if (availableIngredients.length === 0) {
      return;
    }

    // 隨機選擇一種食材
    const randomIndex = Math.floor(Math.random() * availableIngredients.length);
    const ingredientName = availableIngredients[randomIndex];
    const dbEntry = INGREDIENT_DB[ingredientName];

    const newCard: IngredientCard = {
      id: Date.now(),
      name: ingredientName,
      img: dbEntry.img || '',
      type: dbEntry.type || '食材',
      element: dbEntry.element || '光',
      atk: dbEntry.atk || 500,
      def: dbEntry.def || 500,
      gradient: dbEntry.gradient || 'from-gray-400 to-gray-600'
    };

    this.hand.update(cards => [...cards, newCard]);
    this.cdr.detectChanges();
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
