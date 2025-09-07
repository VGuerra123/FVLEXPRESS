import { create } from 'zustand';
import type { ProductFilters } from '../types';

export const useFiltersStore = create<ProductFilters>(() => ({
  category: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  rating: undefined,
  freeShipping: false,
  delivery24h: false,
  sortBy: 'featured'
}));
