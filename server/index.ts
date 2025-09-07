import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import products from './routes/products.js';
import orders from './routes/orders.js';
import payments from './routes/payments.js';

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use('/products', products);
app.use('/orders', orders);
app.use('/payments', payments);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('API running at http://localhost:'+port));
