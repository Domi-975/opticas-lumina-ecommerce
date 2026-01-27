import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import authRouter from './routes/auth.js';
import productsRouter from './routes/products.js';
import productDetailRouter from './routes/productDetail.js';
import cartRouter from './routes/cart.js';
import usersRouter from './routes/users.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Backend de Ópticas Lumina funcionando!');
});

app.get('/__debug', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Rutas
app.use(authRouter);
app.use(productsRouter);
app.use(productDetailRouter);
app.use(cartRouter);
app.use(usersRouter);

// 404 JSON (NO usar app.all('*') por el error del path-to-regexp)
app.use((req, res) => {
  res.status(404).json({ message: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
});

export default app;
