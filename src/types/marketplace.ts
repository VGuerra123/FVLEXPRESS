export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  inStock: boolean;
  discount?: number;
  isPopular?: boolean;
  isFeatured?: boolean;
  brand?: string;
  seller: Seller;
  shipping: ShippingInfo;
  variants?: ProductVariant[];
  specifications?: { [key: string]: string };
  tags?: string[];
  flashSale?: FlashSale;
  bundleDeals?: BundleProduct[];
  relatedProducts?: number[];
  videoUrl?: string;
  warranty?: string;
  returnPolicy?: string;
  minOrderQuantity?: number;
  maxOrderQuantity?: number;
  bulkPricing?: BulkPrice[];
  countryOfOrigin?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
}

export interface Seller {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  responseTime: string;
  joinDate: string;
  location: string;
  logo?: string;
  badges: string[];
}

export interface ShippingInfo {
  free: boolean;
  cost: number;
  estimatedDays: number;
  methods: string[];
  from: string;
  express?: {
    available: boolean;
    cost: number;
    days: number;
  };
}

export interface ProductVariant {
  id: string;
  name: string;
  type: 'color' | 'size' | 'style';
  value: string;
  price?: number;
  image?: string;
  inStock: boolean;
}

export interface FlashSale {
  endTime: Date;
  originalPrice: number;
  salePrice: number;
  soldCount: number;
  totalStock: number;
}

export interface BundleProduct {
  products: number[];
  bundlePrice: number;
  savings: number;
  name: string;
}

export interface BulkPrice {
  minQuantity: number;
  price: number;
  discount: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariants?: { [key: string]: string };
}

export interface Review {
  id: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
  images?: string[];
  variant?: string;
}

export interface WishlistItem {
  id: number;
  productId: number;
  dateAdded: string;
  priceAlert?: number;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'shipping';
  value: number;
  minOrder: number;
  maxDiscount?: number;
  expiryDate: Date;
  description: string;
  usageLimit?: number;
  usedCount: number;
}

export interface RecentlyViewed {
  productId: number;
  viewedAt: Date;
}

export interface SearchSuggestion {
  query: string;
  type: 'product' | 'category' | 'brand';
  count: number;
}

export interface PriceHistory {
  date: string;
  price: number;
}

export interface ComparisonProduct {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  features: string[];
}