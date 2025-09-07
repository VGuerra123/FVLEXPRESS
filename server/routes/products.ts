import { Router } from 'express';
import { db, Product } from '../data.js';

const router = Router();

// GET /products?category=&sortBy=&page=&perPage=
router.get('/', (req, res) => {
  const q = req.query as Record<string, string>;
  const { category, sortBy = 'featured', page = '1', perPage = '12' } = q;

  let items = [...db.products];
  if (category && ['electronics','fashion','home','toys'].includes(category)) {
    items = items.filter(p => p.category === category);
  }

  switch (sortBy) {
    case 'price-asc': items.sort((a,b)=>a.price-b.price); break;
    case 'price-desc': items.sort((a,b)=>b.price-a.price); break;
    case 'rating': items.sort((a,b)=>b.rating-a.rating); break;
    case 'newest': items.sort((a,b)=> (a.id < b.id ? 1 : -1)); break;
    default: items.sort((a,b)=> (Number(!!b.isFeatured) - Number(!!a.isFeatured)));
  }

  const p = Math.max(1, parseInt(page));
  const pp = Math.max(1, parseInt(perPage));
  const total = items.length;
  const slice = items.slice((p-1)*pp, p*pp);

  res.json({ items: slice, total });
});

// GET /products/:id
router.get('/:id', (req, res) => {
  const item = db.products.find(p => p.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'not_found' });
  res.json(item);
});

// POST /products/vendor  (crear manualmente)
router.post('/vendor', (req, res) => {
  const body = req.body as Partial<Product>;
  if (!body.name || !body.price || !body.category) {
    return res.status(400).json({ error: 'bad_request' });
  }
  const id = Math.random().toString(36).slice(2,8);
  const prod: Product = {
    id,
    name: body.name!,
    price: body.price!,
    category: body.category as any,
    image: body.image || 'https://picsum.photos/seed/manual/600/400',
    rating: body.rating ?? 4.5,
    stock: body.stock ?? 10,
    vendorId: body.vendorId || 'v-fvl',
    description: body.description || '',
    discount: body.discount ?? 0,
    isFeatured: !!body.isFeatured
  };
  db.products.push(prod);
  res.json(prod);
});

export default router;
