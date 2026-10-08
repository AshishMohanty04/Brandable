export type ProductCategory = 
  | 'ALL'
  | 'ALMONDS'
  | 'CASHEWS'
  | 'PISTACHIOS'
  | 'WALNUTS'
  | 'RAISINS'
  | 'DATES'
  | 'DRIED_FRUITS'
  | 'SEEDS'
  | 'EXOTIC_NUTS'
  | 'MAKHANA'
  | 'MIXED_DRY_FRUITS'
  | 'ROASTED_FLAVOURED'
  | 'TRAIL_MIX'
  | 'GIFT_HAMPERS'
  | 'COMBOS_OFFERS'
  | 'DRY_FRUITS'
  | 'SEEDS_BERRIES'
  | 'COMBOS';

export interface ProductWeightOption {
  weight: string;
  price: number;
  originalPrice: number;
}

export interface NutritionInfo {
  servingSize: string;
  calories: number;
  protein: string;
  dietaryFiber: string;
  healthyFats: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  categoryLabel: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  weightOptions: ProductWeightOption[];
  description: string;
  ingredients: string;
  benefits: string[];
  nutrition: NutritionInfo;
}

export interface CartItem {
  product: Product;
  selectedWeight: string;
  price: number;
  originalPrice: number;
  quantity: number;
}

export interface CategoryInfo {
  num: number;
  id: ProductCategory;
  name: string;
  examples: string;
  icon: string;
  productCount?: number;
}

export interface OrderItemDTO {
  productId: string;
  productName: string;
  weight: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
}

export interface OrderDTO {
  orderId: string;
  items: OrderItemDTO[];
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  grandTotal: number;
  couponCode?: string;
  estimatedDeliveryMinutes: number;
  createdAt: string;
  trackingMessage: string;
}

export interface CouponResult {
  valid: boolean;
  code: string;
  discountAmount: number;
  discountPercentage: number;
  message: string;
}
