// ========================
// Paquetes de logística
// ========================
export interface Package {
  id: string;
  size: 'S' | 'M' | 'L';
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  price: number;
  destination: string;
  sender: string;
  recipient: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'cancelled';
  trackingNumber: string;
  estimatedDelivery: string;
}

// ========================
// Productos del Marketplace
// ========================
export interface ProductVariant {
  id: string;
  name: string;     // p.ej. "Rojo / 42"
  sku?: string;
  stock: number;
  price: number;
}

export interface Product {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  image: string;
  rating: number; // 0..5
  category: 'electronics' | 'fashion' | 'home' | 'toys' | string; // soporta categorías fijas y dinámicas
  stock?: number;
  discount?: number; // en porcentaje, ej: 20 => 20% off
  isFeatured?: boolean; // aparece en destacados
  vendorId?: string;    // vinculado al vendedor
  variants?: ProductVariant[];
}

// ========================
// Ítems del Carrito
// ========================
export interface CartItem {
  id: string;
  type: 'product' | 'package' | 'subscription';
  name: string;
  price: number;
  quantity: number;

  // Opcionales según tipo
  packageSize?: 'S' | 'M' | 'L';
  subscription?: {
    duration: number;
    billing: 'monthly' | 'yearly';
  };
  productData?: Product;
}

// ========================
// Usuario
// ========================
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  companyName?: string;
}

// ========================
// Idiomas
// ========================
export type Language = 'es' | 'en' | 'zh';

export interface Translations {
  [key: string]: {
    es: string;
    en: string;
    zh: string;
  };
}

// ========================
// Filtros para Marketplace
// ========================
export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  freeShipping?: boolean;
  delivery24h?: boolean;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'featured';
}

// ========================
// Vendedores
// ========================
export interface Vendor {
  id: string;
  displayName: string;
  email: string;
  phone?: string;
  rating?: number;
  logoUrl?: string;
  isApproved: boolean;
}

// ========================
// Pedidos
// ========================
export interface OrderItem {
  productId: string | number;
  name: string;
  quantity: number;
  unitPrice: number;
  vendorId?: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  buyerId?: string;
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  paymentRef?: string;
  createdAt: string;
}
