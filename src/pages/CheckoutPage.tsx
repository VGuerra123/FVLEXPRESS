import React from 'react';
import { useCartStore } from '../store/cartStore';
import { createOrder } from '../api/orders';
import { startStripeCheckout } from '../api/checkout';

const CheckoutPage: React.FC = () => {
  const items = useCartStore(s => s.items);
  const clear = useCartStore(s => s.clear);
  const total = items.reduce((s,i)=> s + i.price*i.quantity, 0);

  const orderAndPay = async (mode: 'stripe' | 'demo') => {
    const order = await createOrder(items.map(i => ({ productId: i.id, quantity: i.quantity })));
    const successUrl = `${window.location.origin}/checkout/success`;
    const cancelUrl = `${window.location.origin}/checkout/cancel`;

    if (mode === 'stripe') {
      const { url } = await startStripeCheckout(order.id, successUrl, cancelUrl);
      window.location.href = url; // si no hay STRIPE_SECRET, el server devuelve successUrl (simulado)
    } else {
      window.location.href = successUrl;
    }
    clear();
  };

  return (
    <section className="max-w-3xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Checkout</h1>
      <div className="space-y-4">
        {items.map(i=>(
          <div key={i.id} className="p-4 bg-white rounded-xl shadow flex justify-between">
            <span>{i.name} × {i.quantity}</span>
            <span>${(i.price*i.quantity).toLocaleString()} CLP</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-6 font-bold text-blue-900">
        <span>Total</span>
        <span>${total.toLocaleString()} CLP</span>
      </div>
      <div className="mt-8 flex gap-4">
        <button onClick={()=>orderAndPay('stripe')} className="px-6 py-3 bg-fvl-blue text-white rounded-lg font-bold">Pagar (Stripe)</button>
        <button onClick={()=>orderAndPay('demo')} className="px-6 py-3 bg-slate-200 text-slate-800 rounded-lg font-bold">Pagar en Demo</button>
      </div>
    </section>
  );
};
export default CheckoutPage;
