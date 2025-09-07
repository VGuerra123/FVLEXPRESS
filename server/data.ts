export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  rating: number;
  category: 'electronics' | 'fashion' | 'home' | 'toys';
  stock: number;
  vendorId: string;
  discount?: number;
  isFeatured?: boolean;
};

export type OrderItem = {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  vendorId: string;
};
export type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  paymentRef?: string;
  createdAt: string;
};

const img = (w=600,h=400)=>`https://picsum.photos/seed/${Math.random().toString(36).slice(2,8)}/${w}/${h}`;

const electronics: Product[] = Array.from({length:10}).map((_,i)=>({
  id: `e${i+1}`, name: `Gadget ${i+1}`, price: 39990 + i*5000, image: img(),
  rating: 4 + ((i%5)/10), category:'electronics', stock: 10+i, vendorId: 'v-tech', discount: i%2===0?10:0, isFeatured: i<3
}));
const fashion: Product[] = Array.from({length:10}).map((_,i)=>({
  id: `f${i+1}`, name: `Prenda ${i+1}`, price: 19990 + i*3000, image: img(),
  rating: 4.2 + ((i%5)/10), category:'fashion', stock: 20+i, vendorId: 'v-fvl', discount: i%3===0?15:0, isFeatured: i<2
}));
const home: Product[] = Array.from({length:10}).map((_,i)=>({
  id: `h${i+1}`, name: `Hogar ${i+1}`, price: 14990 + i*2500, image: img(),
  rating: 4.1 + ((i%5)/10), category:'home', stock: 15+i, vendorId: 'v-fvl', discount: i%4===0?12:0, isFeatured: i<2
}));
const toys: Product[] = Array.from({length:10}).map((_,i)=>({
  id: `t${i+1}`, name: `Juguete ${i+1}`, price: 9990 + i*2000, image: img(),
  rating: 4.3 + ((i%5)/10), category:'toys', stock: 25+i, vendorId: 'v-toys', discount: i%2===1?8:0, isFeatured: i<3
}));

export const db = {
  products: <Product[]>[...electronics, ...fashion, ...home, ...toys],
  orders: <Order[]>[]
};
