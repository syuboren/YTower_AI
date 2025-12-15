# 🍳 楊桃美食網 AI 智慧食譜平台

<div align="center">
  <img src="logo.png" alt="楊桃美食網" width="120">
  
  **結合 AI 技術的現代化食譜推薦平台**
  
  [![Angular](https://img.shields.io/badge/Angular-18.2-dd0031?logo=angular)](https://angular.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178c6?logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
  
  ### 🌐 [線上預覽 Demo](https://syuboren.github.io/YTower_AI/)
</div>

---

## 📋 專案概述

楊桃美食網 AI 智慧食譜平台是一個現代化的食譜推薦網站，結合遊戲化元素與 AI 技術，讓使用者透過「食之召喚」系統，輸入手邊食材即可獲得客製化食譜推薦。

### 核心特色

- 🎮 **遊戲化體驗**：將食材轉化為收藏卡牌，透過五芒星魔法陣進行融合
- 🤖 **AI 食譜推薦**：根據使用者輸入的食材智慧推薦適合的料理
- 🎴 **收藏卡設計**：高質感的食材卡與食譜卡，具有稀有度等級系統
- ✨ **精緻動畫**：流暢的過場動畫與視覺特效

---

## 🚀 開發進度

### ✅ 已完成功能

#### 首頁 (Home Page)
- [x] Hero Section - 打字機效果 + 卡片堆疊動畫
- [x] 推薦食譜主題區塊
- [x] 熱門食譜展示
- [x] 最新消息專區（分類篩選）
- [x] 品牌故事專區（Facebook 嵌入）
- [x] 產品推薦區塊（連結至楊桃購物網）
- [x] CTA 行動呼籲區塊

#### AI 食譜助手 (AI Assistant) - 「食之召喚」系統
- [x] 食材輸入介面
  - 手動輸入食材名稱
  - 🎲 隨機食材按鈕（一鍵新增不重複食材）
- [x] 食材卡牌生成（收藏卡風格）
  - 真實食材照片
  - 元素屬性系統（炎、水、地、風、光）
  - 光澤邊框效果
  - 選中/刪除功能
- [x] 五芒星魔法陣
  - SVG 繪製動畫（初始描繪）
  - ✨ 白色光點持續循環流動效果
  - 5 個卡槽設計
  - 最多選擇 5 種食材
- [x] 融合動畫流程（5 階段）
  1. 準備階段：五芒星閃爍 + 空白卡槽
  2. 召喚階段：食材卡片順時鐘逐一出現
  3. 描繪階段：光線沿五芒星描繪（微粒效果）
  4. 融合階段：卡牌分解成粒子匯聚中心
  5. 爆發過渡：Logo 旋轉進場 + 光環擴散
- [x] 食譜結果頁面
  - 收藏卡風格設計
  - 稀有度等級（銀/金/紫 金屬光澤邊框）
  - 進場動畫（翻牌效果）
  - 缺少食材提示
- [x] 食譜詳情彈窗
  - 完整烹調步驟
  - 缺少食材購買連結

#### 共用元件
- [x] Header（響應式導航）
- [x] Footer
- [x] Breadcrumb 麵包屑
- [x] Recipe Card 食譜卡片
- [x] Category Card 分類卡片
- [x] CTA Section

#### 其他頁面（基礎架構）
- [x] 關於我們
- [x] 食譜列表
- [x] 食譜分類
- [x] 食譜詳情
- [x] 最新消息列表
- [x] 最新消息詳情
- [x] 聯絡我們

### 🔄 進行中

- [ ] API 整合（目前使用 Mock Data）
- [ ] 真正的 AI 推薦引擎

### 📋 待開發

- [ ] 使用者登入/註冊
- [ ] 收藏食譜功能
- [ ] 搜尋功能強化
- [ ] 多語系支援

---

## 🛠️ 技術架構

### 前端框架
```
Angular 18.2 (Standalone Components)
├── TypeScript 5.4
├── RxJS 7.8
├── Tailwind CSS 3.4
└── SCSS (BEM 命名規範)
```

### 專案結構
```
ytower-web/src/app/
├── core/                    # 核心服務
│   ├── guards/             # 路由守衛
│   ├── interceptors/       # HTTP 攔截器
│   ├── models/             # 資料模型
│   └── services/           # 服務層
├── features/               # 功能模組
│   ├── home/              # 首頁
│   ├── ai-assistant/      # AI 食譜助手
│   ├── recipes/           # 食譜相關
│   ├── news/              # 最新消息
│   ├── about/             # 關於我們
│   └── contact/           # 聯絡我們
├── layouts/               # 佈局元件
└── shared/                # 共用元件
    ├── components/        # UI 元件
    ├── directives/        # 指令
    └── pipes/             # 管道
```

### 編碼規範

- **元件**：Standalone Components + OnPush 策略
- **狀態管理**：Signals（Angular 17+）
- **依賴注入**：`inject()` 函數
- **控制流**：`@if`、`@for`、`@switch`（非 NgIf/NgFor）
- **樣式**：SCSS + BEM 命名 + Tailwind CSS

---

## 🎨 設計系統

### 品牌色彩
| 名稱 | 色碼 | 用途 |
|------|------|------|
| Primary | `#F58220` | 主要按鈕、強調 |
| Secondary | `#C45D4A` | 輔助色、漸層 |
| Success | `#22c55e` | 成功狀態 |
| Warning | `#fbbf24` | 警告、星級 |

### 稀有度等級
| 等級 | 星數 | 邊框顏色 | 特效 |
|------|------|----------|------|
| 普通 | 1-2 ★ | 銀色 | 基礎光澤 |
| 稀有 | 3-4 ★ | 金色 | 金色光暈 |
| 傳說 | 5 ★ | 紫色 | 流動光澤 + 星星閃爍 |

### 元素系統
| 元素 | 顏色 | 代表食材類型 |
|------|------|-------------|
| 炎 🔥 | `#ef4444` | 肉類、辛香料 |
| 水 💧 | `#3b82f6` | 海鮮、湯品 |
| 地 🌍 | `#d97706` | 根莖類蔬菜 |
| 風 🌪️ | `#22c55e` | 葉菜類 |
| 光 ✨ | `#eab308` | 蛋類、主食 |

---

## 📦 安裝與執行

### 環境需求
- Node.js 18+
- npm 9+

### 安裝步驟

```bash
# 1. 進入專案目錄
cd ytower-web

# 2. 安裝依賴
npm install

# 3. 啟動開發伺服器
ng serve --port 4202

# 4. 開啟瀏覽器
# http://localhost:4202
```

### 建置

```bash
# 開發建置
ng build

# 生產建置
ng build --configuration production
```

### 🚀 部署到 GitHub Pages

```bash
# 1. 建置生產版本（設定正確的 base-href）
ng build --configuration production --base-href /YTower_AI/

# 2. 部署到 gh-pages 分支
npx angular-cli-ghpages --dir=dist/ytower-web/browser
```

**線上版本**：https://syuboren.github.io/YTower_AI/

---

## 📁 相關文件

| 文件 | 說明 |
|------|------|
| `規劃文件/介面規劃/` | UI 設計規格（PDF） |
| `規劃文件/介面設計圖/` | 設計稿（PNG） |
| `產品企劃案：食之召喚.md` | 遊戲化功能企劃 |
| `AGENTS.md` | AI 開發助手規範 |

---

## 👥 開發團隊

- **專案擁有者**：楊桃美食網
- **技術開發**：AI 輔助開發

---

## 📄 授權

本專案為楊桃美食網所有，未經授權禁止商業使用。

---

<div align="center">
  <sub>Built with ❤️ for food lovers</sub>
</div>

