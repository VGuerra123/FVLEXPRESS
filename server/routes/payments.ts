import { Router } from 'express';
import Stripe from 'stripe';
import { db } from '../data.js';

const router = Router();

router.post('/stripe/checkout', async (req, res) => {
  const { orderId, successUrl, cancelUrl } = req.body as { orderId: string; successUrl: string; cancelUrl: string; };
  const order = db.orders.find(o => o.id === orderId);
  if (!order) return res.status(404).json({ error: 'order_not_found' });

  if (!process.env.STRIPE_SECRET) {
    order.status = 'paid';
    order.paymentRef = 'SIMULATED-' + Date.now();
    return res.json({ url: successUrl });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET, { apiVersion: '2024-06-20' });
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: order.items.map(i => ({
        price_data: {
          currency: 'clp',
          product_data: { name: i.name },
          unit_amount: Math.round(i.unitPrice * 100),
        },
        quantity: i.quantity
      })),
      success_url: successUrl,
      cancel_url: cancelUrl
    });
    res.json({ url: session.url });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'stripe_error' });
  }
});

export default router;
