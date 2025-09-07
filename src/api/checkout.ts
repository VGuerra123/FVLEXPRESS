import { http } from './http';
export const startStripeCheckout = (orderId: string, successUrl: string, cancelUrl: string) =>
  http.post<{ url: string }>('/payments/stripe/checkout', { orderId, successUrl, cancelUrl }).then(r => r.data);
