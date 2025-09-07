import { http } from './http';
import type { Product } from '../types';

export const listProducts = (params?: Record<string, unknown>) =>
  http.get<{ items: Product[]; total: number }>('/products', { params }).then(r => r.data);

export const getProduct = (id: string) =>
  http.get<Product>(`/products/${id}`).then(r => r.data);
