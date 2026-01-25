const express = require('express');
const cors = require('cors');
const authMiddleware = require('./src/middlewares/auth.middleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares básicos del servidor
app.use(express.json());
app.use(cors());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Backend de Ópticas Lumina funcionando!');
});

// Ruta de ejemplo protegida con middleware
// Aquí se valida que la petición tenga un header de autorización
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Acceso permitido con header de autorización' });
});

// Levanta el servidor 
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

module.exports = app;
