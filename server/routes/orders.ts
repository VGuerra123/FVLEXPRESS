import { Router } from 'express';
import { db, Order } from '../data.js';

const router = Router();

router.post('/', (req, res) => {
  const { items } = req.body as { items: { productId: string; quantity: number }[] };
  if (!items?.length) return res.status(400).json({ error: 'no_items' });

  const orderItems = items.map(({ productId, quantity }) => {
    const prod = db.products.find(p => p.id === productId);
    if (!prod) throw new Error('not_found');
    return {
      productId,
      name: prod.name,
      quantity,
      unitPrice: prod.price,
      vendorId: prod.vendorId
    };
  });

  const total = orderItems.reduce((s,i)=> s + i.unitPrice*i.quantity, 0);
  const order: Order = {
    id: 'o' + (db.orders.length + 1),
    items: orderItems,
    total,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  db.orders.push(order);
  res.json(order);
});

export default router;
