import { Component, ChangeDetectionStrategy, inject, signal, computed, AfterViewInit, ElementRef, PLATFORM_ID, HostListener, ChangeDetectorRef, OnInit, DestroyRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BreadcrumbComponent, RecipeCardComponent, CategoryCardComponent, SidebarComponent, CtaSectionComponent } from '../../../../shared/components';
import { MockDataService } from '../../../../core/services/mock-data.service';

type ViewMode = 'bento' | 'list';

@Component({
  standalone: true,
  selector: 'app-recipe-list-page',
  templateUrl: './recipe-list-page.component.html',
  styleUrl: './recipe-list-page.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    BreadcrumbComponent,
    RecipeCardComponent,
    CategoryCardComponent,
    SidebarComponent,
    CtaSectionComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeListPageComponent implements AfterViewInit, OnInit {
  private mockDataService = inject(MockDataService);
  private elementRef = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private observer: IntersectionObserver | null = null;

  // 當前搜尋的主題名稱（來自 URL 查詢參數）
  currentThemeName = signal<string>('');

  breadcrumbItems = computed(() => {
    const themeName = this.currentThemeName();
    if (themeName) {
      return [
        { label: '食譜專區', path: '/recipes' },
        { label: themeName }
      ];
    }
    return [{ label: '食譜專區' }];
  });

  // 搜尋相關
  searchQuery = signal('');
  isSearching = signal(false);
  hasSearched = signal(false);

  // 檢視模式
  viewMode = signal<ViewMode>('bento');

  // 篩選條件
  selectedCategory = signal<string>('');
  selectedTime = signal<string>('');
  selectedStyle = signal<string>('');

  // 無限滾動相關（搜尋結果）
  pageSize = 6;
  currentPage = signal(1);
  isLoading = signal(false);

  // 預設列表分頁（未搜尋時）
  defaultPageSize = 20;
  defaultCurrentPage = signal(1);
  isLoadingDefault = signal(false);

  // 所有食譜資料
  allRecipes = computed(() => this.mockDataService.getRecipes());
  
  // 搜尋結果（篩選後）
  searchResults = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const time = this.selectedTime();
    const style = this.selectedStyle();
    
    let results = this.allRecipes();

    // 關鍵字搜尋（包含主題標籤）
    if (query) {
      results = results.filter(recipe => 
        recipe.title.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(query)) ||
        recipe.ingredients.some(ing => ing.name.toLowerCase().includes(query)) ||
        recipe.cookingStyles?.some(s => s.toLowerCase().includes(query)) ||
        recipe.themes?.some(t => t.toLowerCase().includes(query))
      );
    }

    // 時間篩選
    if (time) {
      const maxTime = parseInt(time, 10);
      results = results.filter(recipe => recipe.cookingTime <= maxTime);
    }

    // 風格篩選
    if (style) {
      const styleMap: Record<string, string> = {
        chinese: '中式',
        western: '西式',
        japanese: '日式',
        korean: '韓式'
      };
      const styleName = styleMap[style];
      if (styleName) {
        results = results.filter(recipe => 
          recipe.cookingStyles?.includes(styleName)
        );
      }
    }

    return results;
  });

  // 顯示的食譜（分頁載入）
  displayedRecipes = computed(() => {
    const results = this.searchResults();
    const count = this.currentPage() * this.pageSize;
    return results.slice(0, count);
  });

  // 是否還有更多
  hasMore = computed(() => {
    return this.displayedRecipes().length < this.searchResults().length;
  });

  // 搜尋結果數量
  totalResults = computed(() => this.searchResults().length);

  topRecipes = computed(() => this.mockDataService.getTopRecipes(10));
  featuredCategories = computed(() => this.mockDataService.getCategories().slice(0, 3));

  // 預設顯示的食譜（分頁載入）
  displayedDefaultRecipes = computed(() => {
    const all = this.allRecipes();
    const count = this.defaultCurrentPage() * this.defaultPageSize;
    return all.slice(0, count);
  });

  // 預設列表是否還有更多
  hasMoreDefault = computed(() => {
    return this.displayedDefaultRecipes().length < this.allRecipes().length;
  });

  // 預設列表總數
  totalDefaultRecipes = computed(() => this.allRecipes().length);

  sidebarRecipes = computed(() => {
    return this.topRecipes().map(r => ({
      id: r.id,
      title: r.title,
      imageUrl: r.imageUrl,
      rating: r.rating
    }));
  });

  // 熱門搜尋關鍵字
  popularKeywords = ['麻婆豆腐', '番茄炒蛋', '沙拉', '快速', '健康', '雞蛋', '豆腐'];

  timeOptions = [
    { value: '', label: '全部時間' },
    { value: '15', label: '15 分鐘內' },
    { value: '30', label: '30 分鐘內' },
    { value: '60', label: '1 小時內' }
  ];

  styleOptions = [
    { value: '', label: '全部烹調方式' },
    { value: 'chinese', label: '中式' },
    { value: 'western', label: '西式' },
    { value: 'japanese', label: '日式' },
    { value: 'korean', label: '韓式' }
  ];

  // Bento 卡片大小計算（動態調整避免空白）
  getBentoSize(index: number): string {
    const total = this.displayedRecipes().length;
    
    // 基本 pattern：large(2x2), normal, normal, wide(2x1), normal, tall(1x2), normal, normal
    const patterns = ['large', 'normal', 'normal', 'wide', 'normal', 'tall', 'normal', 'normal'];
    const patternIndex = index % patterns.length;
    const baseSize = patterns[patternIndex];
    
    // 計算剩餘卡片數（包含當前卡片）
    const remaining = total - index;
    
    // 只在最後 2 張卡片時調整，避免空白
    // 如果是最後 1-2 張，且原本要用 wide 或 large，改用 normal
    if (remaining <= 2) {
      if (baseSize === 'large' || baseSize === 'wide') {
        return 'normal';
      }
    }
    
    // 如果是最後 1 張且要用 tall，改用 normal
    if (remaining === 1 && baseSize === 'tall') {
      return 'normal';
    }
    
    return baseSize;
  }

  ngOnInit(): void {
    // 監聽 URL 查詢參數變化
    this.route.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        const query = params['q'];
        if (query) {
          // 有查詢參數時，設置搜尋關鍵字並進入搜尋模式
          this.searchQuery.set(query);
          this.currentThemeName.set(query);
          this.hasSearched.set(true);
          this.currentPage.set(1);
          this.cdr.detectChanges();
          setTimeout(() => this.initScrollAnimations(), 50);
        } else {
          // 沒有查詢參數時重置
          this.currentThemeName.set('');
        }
      });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollAnimations();
    }
  }

  private initScrollAnimations(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    // 創建新的 observer
    if (!this.observer) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            this.observer?.unobserve(entry.target);
          }
        });
      }, observerOptions);
    }

    // 觀察還沒有動畫的元素
    const animatedElements = this.elementRef.nativeElement.querySelectorAll('.scroll-animate:not(.animate-in)');
    animatedElements.forEach((el: Element) => {
      this.observer?.observe(el);
    });
  }

  // 執行搜尋
  onSearch(): void {
    // 清除從 URL 帶來的主題名稱，使用新輸入的搜尋關鍵字
    this.currentThemeName.set('');
    this.hasSearched.set(true);
    this.currentPage.set(1);
    this.isSearching.set(true);

    // 模擬搜尋延遲
    setTimeout(() => {
      this.isSearching.set(false);
      this.cdr.detectChanges();
      // 重新初始化滾動動畫
      setTimeout(() => this.initScrollAnimations(), 50);
    }, 300);
  }

  // 點擊熱門關鍵字
  searchKeyword(keyword: string): void {
    this.searchQuery.set(keyword);
    this.onSearch();
  }

  // 清除搜尋
  clearSearch(): void {
    this.searchQuery.set('');
    this.hasSearched.set(false);
    this.currentPage.set(1);
  }

  // 切換檢視模式
  setViewMode(mode: ViewMode): void {
    this.viewMode.set(mode);
    this.cdr.detectChanges();
    // 重新初始化滾動動畫
    setTimeout(() => this.initScrollAnimations(), 50);
  }

  // 篩選變更時重置分頁
  onFilterChange(): void {
    this.currentPage.set(1);
    if (this.searchQuery() || this.selectedTime() || this.selectedStyle()) {
      this.hasSearched.set(true);
    }
    this.cdr.detectChanges();
    // 重新初始化滾動動畫
    setTimeout(() => this.initScrollAnimations(), 50);
  }

  // 載入更多（搜尋結果）
  loadMore(): void {
    if (this.isLoading() || !this.hasMore()) return;
    
    this.isLoading.set(true);
    
    // 模擬載入延遲
    setTimeout(() => {
      this.currentPage.update(p => p + 1);
      this.isLoading.set(false);
      this.cdr.detectChanges();
      // 重新初始化滾動動畫
      setTimeout(() => this.initScrollAnimations(), 50);
    }, 500);
  }

  // 載入更多（預設列表）
  loadMoreDefault(): void {
    if (this.isLoadingDefault() || !this.hasMoreDefault()) return;
    
    this.isLoadingDefault.set(true);
    
    // 模擬載入延遲
    setTimeout(() => {
      this.defaultCurrentPage.update(p => p + 1);
      this.isLoadingDefault.set(false);
      this.cdr.detectChanges();
    }, 500);
  }

  // 滾動監聽（無限滾動）
  @HostListener('window:scroll')
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!this.hasSearched() || this.isLoading() || !this.hasMore()) return;

    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.documentElement.scrollHeight - 300;

    if (scrollPosition >= threshold) {
      this.loadMore();
    }
  }
}
