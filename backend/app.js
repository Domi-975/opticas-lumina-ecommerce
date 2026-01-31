import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import authRouter from './routes/auth.js'
import productsRouter from './routes/products.js'
import productDetailRouter from './routes/productDetail.js'
import cartRouter from './routes/cart.js'
import usersRouter from './routes/users.js'

const app = express()

/**
 * Middlewares base
 */
app.use(express.json())


/**
 * CORS (listo para producción)
 * - En producción: define CORS_ORIGIN con el/los dominios del frontend
 *   Ej: CORS_ORIGIN=https://tu-frontend.vercel.app
 *   o varios: CORS_ORIGIN=https://a.com,https://b.com
 * - En desarrollo: permite localhost:5173 por defecto
 */
const defaultDevOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173']

const envOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean)

const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? envOrigins
    : [...new Set([...defaultDevOrigins, ...envOrigins])]

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite requests sin origin (Postman, curl, server-to-server)
      if (!origin) return callback(null, true)

      // Si no configuraste CORS_ORIGIN en prod, igual permitimos para no bloquearte,
      // pero te recomiendo configurarlo en la plataforma de deploy.
      if (process.env.NODE_ENV === 'production' && allowedOrigins.length === 0) {
        return callback(null, true)
      }

      if (allowedOrigins.includes(origin)) return callback(null, true)
      return callback(new Error(`CORS bloqueado para el origin: ${origin}`))
    },
    credentials: true
  })
)

/**
 * Healthcheck (para probar el deploy)
 */
app.get('/health', (req, res) => {
  res.json({ ok: true })
})

/**
 * Raíz informativa
 */
app.get('/', (req, res) => {
  res.send('Backend de Ópticas Lumina funcionando!')
})

/**
 * Debug simple
 */
app.get('/__debug', (req, res) => {
  res.json({
    ok: true,
    time: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  })
})

/**
 * Rutas
 */
app.use(authRouter)
app.use(productsRouter)
app.use(productDetailRouter)
app.use(cartRouter)
app.use(usersRouter)

/**
 * 404 JSON (NO usar app.all('*') por el error del path-to-regexp)
 */
app.use((req, res) => {
  res.status(404).json({
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
  })
})

// Rutas
app.use(authRouter);
app.use(productsRouter);
app.use(productDetailRouter);
app.use(cartRouter);
app.use(usersRouter);

// 404
app.use((req, res) => {
  res.status(404).json({
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
  });
});


export default app
