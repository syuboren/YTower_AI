import { Injectable } from '@angular/core';
import { Recipe, RecipeCategory, NewsArticle, Product } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  readonly categories: RecipeCategory[] = [
    { id: '1', name: '健康飲食', slug: 'healthy', description: '營養均衡的健康料理' },
    { id: '2', name: '快速料理', slug: 'quick', description: '15分鐘快速上桌' },
    { id: '3', name: '節慶主題', slug: 'festive', description: '節慶必備料理' },
    { id: '4', name: '餐別與時段', slug: 'mealtime', description: '早午晚餐、下午茶' },
    { id: '5', name: '預算與成本', slug: 'budget', description: '省錢又美味' },
    { id: '6', name: '器具與空間', slug: 'equipment', description: '依器具分類' },
    { id: '7', name: '親子學習', slug: 'family', description: '親子共廚樂趣' },
    { id: '8', name: '便當、外帶', slug: 'bento', description: '便當與外帶料理' },
    { id: '9', name: '時令與永續', slug: 'seasonal', description: '當季食材料理' },
    { id: '10', name: '特殊需求', slug: 'special', description: '素食、低醣、無麩質' },
  ];

  readonly popularRecipes: Recipe[] = [
    {
      id: '1',
      title: '麻婆豆腐',
      description: '香辣濃郁、麻而不嗆，是最經典的川味家常菜之一，滑嫩的豆腐吸附著肉末與豆瓣醬的香氣，一口下去鹹香帶勁、辣中帶麻，讓人忍不住一口白飯接一口。',
      imageUrl: 'https://images.unsplash.com/photo-1582576163090-09d3b6f8a969?w=800',
      cookingTime: 30,
      prepTime: 10,
      servings: 3,
      difficulty: 'easy',
      rating: 4.2,
      ratingCount: 888,
      author: '楊桃美食網美食團隊',
      uploadDate: '2025-12-31',
      ingredients: [
        { name: '盒裝豆腐', amount: '1', unit: '盒' },
        { name: '豬絞肉', amount: '60', unit: '公克' },
        { name: '蔥', amount: '2', unit: '根' },
        { name: '蒜末', amount: '15', unit: '公克' },
        { name: '薑末', amount: '10', unit: '公克' },
      ],
      seasonings: [
        { group: 'A', items: [{ name: '紅辣椒醬', amount: '2 大匙' }] },
        { group: 'B', items: [{ name: '水', amount: '100 c.c.' }, { name: '醬油', amount: '1 茶匙' }] },
      ],
      steps: [
        { stepNumber: 1, description: '豆腐切丁；蔥切花，備用。' },
        { stepNumber: 2, description: '熱鍋，倒入少許油，先以小火爆香蒜末、薑末，再放入豬絞肉炒熟。' },
        { stepNumber: 3, description: '續加紅辣椒醬炒香後加入所有調味料B，待燒開後放入豆腐丁略煮滾。' },
      ],
      kitchenware: [{ id: 'k1', name: 'Woody 木質調磨石陶瓷瓶底深鍋 26cm', imageUrl: '', price: 1800, purchaseUrl: '#' }],
      tags: ['中式經典', '快速料理', '豆腐'],
      categories: ['快速料理'],
      mealTypes: ['午餐', '晚餐'],
      cookingStyles: ['川菜']
    },
    {
      id: '2',
      title: '蔬菜拼盤',
      description: '清爽健康的蔬菜拼盤，富含多種維生素與膳食纖維，是減重與養生的最佳選擇。',
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
      cookingTime: 20,
      prepTime: 15,
      servings: 2,
      difficulty: 'easy',
      rating: 4.5,
      ratingCount: 650,
      author: '楊桃美食網美食團隊',
      uploadDate: '2025-12-30',
      ingredients: [{ name: '綠花椰菜', amount: '100', unit: '公克' }],
      seasonings: [{ group: 'A', items: [{ name: '橄欖油', amount: '2 大匙' }] }],
      steps: [{ stepNumber: 1, description: '將所有蔬菜洗淨，切成適當大小。' }],
      kitchenware: [],
      tags: ['健康', '素食'],
      categories: ['健康飲食'],
      mealTypes: ['午餐'],
      cookingStyles: ['西式']
    },
    {
      id: '3',
      title: '橄欖輕食沙拉',
      description: '地中海風味的清爽沙拉，搭配新鮮橄欖與特製油醋醬，營養滿分。',
      imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800',
      cookingTime: 15,
      servings: 2,
      difficulty: 'easy',
      rating: 4.3,
      ratingCount: 420,
      author: '楊桃美食網美食團隊',
      uploadDate: '2025-12-29',
      ingredients: [{ name: '生菜', amount: '200', unit: '公克' }],
      seasonings: [{ group: 'A', items: [{ name: '橄欖油', amount: '3 大匙' }] }],
      steps: [{ stepNumber: 1, description: '生菜洗淨瀝乾，撕成適口大小。' }],
      kitchenware: [],
      tags: ['健康', '輕食'],
      categories: ['健康飲食'],
      mealTypes: ['午餐'],
      cookingStyles: ['地中海料理']
    },
    {
      id: '4',
      title: '炙燒冬菇',
      description: '鮮嫩多汁的炙燒冬菇，簡單調味卻能帶出菇類的原始鮮味。',
      imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
      cookingTime: 25,
      servings: 4,
      difficulty: 'medium',
      rating: 4.6,
      ratingCount: 320,
      author: '楊桃美食網美食團隊',
      uploadDate: '2025-12-28',
      ingredients: [{ name: '鮮香菇', amount: '300', unit: '公克' }],
      seasonings: [{ group: 'A', items: [{ name: '醬油', amount: '1 大匙' }] }],
      steps: [{ stepNumber: 1, description: '香菇洗淨去蒂。' }],
      kitchenware: [],
      tags: ['素食', '簡單'],
      categories: ['快速料理'],
      mealTypes: ['配菜'],
      cookingStyles: ['日式']
    },
    {
      id: '5',
      title: '凱薩沙拉',
      description: '經典凱薩沙拉，搭配酥脆麵包丁與帕瑪森起司，濃郁美味。',
      imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800',
      cookingTime: 20,
      servings: 2,
      difficulty: 'easy',
      rating: 4.4,
      ratingCount: 580,
      author: '楊桃美食網美食團隊',
      uploadDate: '2025-12-27',
      ingredients: [{ name: '蘿蔓生菜', amount: '1', unit: '顆' }],
      seasonings: [{ group: 'A', items: [{ name: '凱薩醬', amount: '4 大匙' }] }],
      steps: [{ stepNumber: 1, description: '蘿蔓生菜洗淨切段。' }],
      kitchenware: [],
      tags: ['沙拉', '經典'],
      categories: ['健康飲食'],
      mealTypes: ['午餐'],
      cookingStyles: ['美式']
    },
    {
      id: '6',
      title: '番茄炒蛋',
      description: '家常經典番茄炒蛋，酸甜滑嫩，簡單又下飯。',
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
      cookingTime: 15,
      servings: 2,
      difficulty: 'easy',
      rating: 4.7,
      ratingCount: 1200,
      author: '楊桃美食網美食團隊',
      uploadDate: '2025-12-26',
      ingredients: [{ name: '雞蛋', amount: '3', unit: '顆' }],
      seasonings: [{ group: 'A', items: [{ name: '鹽', amount: '適量' }] }],
      steps: [{ stepNumber: 1, description: '番茄切塊，雞蛋打散備用。' }],
      kitchenware: [],
      tags: ['家常', '下飯'],
      categories: ['快速料理'],
      mealTypes: ['午餐', '晚餐'],
      cookingStyles: ['中式']
    }
  ];

  readonly newsArticles: NewsArticle[] = [
    {
      id: '1',
      title: 'AI 食譜體驗正式上線！輸入冰箱食材，三秒就能生成專屬料理建議，今晚吃什麼不再是難題',
      excerpt: 'AI 食譜體驗正式上線！輸入冰箱食材，三秒就能生成專屬料理建議...',
      content: '',
      imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
      category: '服務更新',
      publishDate: '2025-12-31'
    },
    {
      id: '2',
      title: '參加楊桃線上一週快煮挑戰，輕鬆完成 7 道快速料理！',
      excerpt: '參加楊桃線上一週快煮挑戰，輕鬆完成 7 道快速料理...',
      content: '',
      imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
      category: '活動企劃',
      publishDate: '2025-12-31'
    },
    {
      id: '3',
      title: '入秋該吃什麼？秋季餐桌新寵！南瓜料理熱潮席捲全網！',
      excerpt: '入秋該吃什麼？秋季餐桌新寵！南瓜料理熱潮席捲全網...',
      content: '',
      imageUrl: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800',
      category: '美食趨勢',
      publishDate: '2025-12-31'
    },
    {
      id: '4',
      title: '2025 年度最受歡迎食譜 TOP 10 揭曉！',
      excerpt: '2025 年度最受歡迎食譜 TOP 10 揭曉...',
      content: '',
      imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800',
      category: '美食趨勢',
      publishDate: '2025-12-30'
    },
    {
      id: '5',
      title: '春節年菜預購開跑！楊桃嚴選團圓好滋味',
      excerpt: '春節年菜預購開跑！楊桃嚴選團圓好滋味...',
      content: '',
      imageUrl: 'https://images.unsplash.com/photo-1547573854-74d2a71d0826?w=800',
      category: '活動企劃',
      publishDate: '2025-12-28'
    }
  ];

  readonly products: Product[] = [
    {
      id: 'p1',
      name: '【PERFECT理想】日式黑金鋼鐵板燒鍋36cm 附蓋(電磁爐可用)',
      brand: 'PERFECT理想',
      imageUrl: 'https://shoplineimg.com/6200f43d76759e003faa9414/65d325a3f574ae00178ca98c/800x.webp?source_format=jpg',
      price: 1280,
      originalPrice: 2880,
      purchaseUrl: 'https://shop.ytower.com.tw/products/ikh-35030',
      isHot: true
    },
    {
      id: 'p2',
      name: '【MEYER美亞】Circulon Total圓滿導磁不沾炒鍋26cm',
      brand: 'MEYER美亞',
      imageUrl: 'https://shoplineimg.com/6200f43d76759e003faa9414/6567243a061a0400146b03fc/800x.webp?source_format=jpg',
      price: 1480,
      originalPrice: 4200,
      purchaseUrl: 'https://shop.ytower.com.tw/products/83923-t',
      isHot: true
    },
    {
      id: 'p3',
      name: '【IKIIKI伊崎】美派烘炸鍋4.0L 玻璃氣炸鍋',
      brand: 'IKIIKI伊崎',
      imageUrl: 'https://shoplineimg.com/6200f43d76759e003faa9414/64787a2b102baa0020f1faf5/800x.webp?source_format=jpg',
      price: 3680,
      originalPrice: 5980,
      purchaseUrl: 'https://shop.ytower.com.tw/products/ik-ot3102',
      isHot: true
    },
    {
      id: 'p4',
      name: '韓國Kassel 晶潤珍珠陶瓷不沾寬底深炒鍋-28cm',
      brand: 'Kassel',
      imageUrl: 'https://shoplineimg.com/6200f43d76759e003faa9414/68afbd3e651700001871b8e9/800x.webp?source_format=jpg',
      price: 1280,
      originalPrice: 3680,
      purchaseUrl: 'https://shop.ytower.com.tw/products/kassel-wokw28'
    }
  ];

  readonly featuredThemes = [
    { title: '健康飲食', description: '健康新選擇，營養均衡的美味料理', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800', slug: 'healthy' },
    { title: '快速料理', description: '忙碌生活中的15分鐘快速上桌料理', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800', slug: 'quick' },
    { title: '節慶主題', description: '聖誕、新年、中秋等節慶必備料理', imageUrl: 'https://images.unsplash.com/photo-1576402187878-974f70c890a5?w=800', slug: 'festive' },
  ];

  getRecipeById(id: string): Recipe | undefined {
    return this.popularRecipes.find(r => r.id === id);
  }

  getRecipes(): Recipe[] {
    return this.popularRecipes;
  }

  getCategories(): { id: string; title: string; description: string; imageUrl: string }[] {
    return this.categories.map(cat => ({
      id: cat.id,
      title: cat.name,
      description: cat.description || '',
      imageUrl: this.getCategoryImage(cat.slug)
    }));
  }

  private getCategoryImage(slug: string): string {
    const images: Record<string, string> = {
      healthy: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600',
      quick: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
      festive: 'https://images.unsplash.com/photo-1576402187878-974f70c890a5?w=600',
      mealtime: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
      budget: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600',
      equipment: 'https://images.unsplash.com/photo-1556909172-bd5315ff6e75?w=600',
      family: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=600',
      bento: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600',
      seasonal: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600',
      special: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600'
    };
    return images[slug] || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600';
  }

  getNewsArticles() {
    return this.newsArticles;
  }

  getProducts() {
    return this.products;
  }

  getTopRecipes(count: number = 10) {
    return this.popularRecipes
      .sort((a, b) => b.rating - a.rating)
      .slice(0, count);
  }
}

