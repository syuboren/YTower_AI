export interface Product {
  id: string;
  name: string;
  brand?: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  purchaseUrl: string;
  isHot?: boolean;
}

