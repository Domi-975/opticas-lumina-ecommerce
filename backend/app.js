import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import authRouter from './routes/auth.js';
import cartRouter from './routes/cart.js';
import productDetailRouter from './routes/productDetail.js';
import productsRouter from './routes/products.js';
import usersRouter from './routes/users.js';

const app = express();

app.use(express.json());
app.use(cors());

// raíz
app.get('/', (req, res) => {
  res.send('Backend de Ópticas Lumina funcionando!');
});

// debug
app.get('/__debug', (req, res) => {
  res.json({ ok: true, from: 'app.js', time: new Date().toISOString() });
});

// Montaje de rutas
app.use(authRouter);
app.use(cartRouter);
app.use(productDetailRouter);
app.use(productsRouter);
app.use(usersRouter);

// ✅ 404 JSON (sin usar '*' para evitar PathError)
app.use((req, res) => {
  return res.status(404).json({
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
});

export default app;
