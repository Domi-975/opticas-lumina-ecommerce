import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import productDetailRouter from './routes/productDetail.js';
import authMiddleware from "./src/middlewares/auth.middleware.js";

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(cors())

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend de Ópticas Lumina funcionando!')
})

// Rutas principales
app.use(authRouter)
app.use(productDetailRouter)

// Ruta de ejemplo protegida con middleware
// Aquí se valida que la petición tenga un header de autorización
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Acceso permitido con header de autorización' });
});

// Levanta el servidor 
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

export default app;

