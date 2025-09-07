import { http } from './http';
import type { Order } from '../types';

export const createOrder = (items: { productId: string; quantity: number }[]) =>
  http.post<Order>('/orders', { items }).then(r=>r.data);
