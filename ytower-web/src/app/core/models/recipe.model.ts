export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  cookingTime: number;
  prepTime?: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  rating: number;
  ratingCount: number;
  author: string;
  uploadDate: string;
  ingredients: Ingredient[];
  seasonings: Seasoning[];
  steps: CookingStep[];
  kitchenware: Kitchenware[];
  tags: string[];
  categories: string[];
  mealTypes: string[];
  cookingStyles: string[];
}

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface Seasoning {
  group: string;
  items: SeasoningItem[];
}

export interface SeasoningItem {
  name: string;
  amount: string;
}

export interface CookingStep {
  stepNumber: number;
  description: string;
}

export interface Kitchenware {
  id: string;
  name: string;
  imageUrl: string;
  price?: number;
  purchaseUrl?: string;
}

export interface RecipeCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
}

