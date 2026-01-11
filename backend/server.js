const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para parsear JSON y habilitar CORS
app.use(express.json());
app.use(require('cors')());

// Ruta para probar
app.get('/', (req, res) => res.send('Backend de Ópticas Lumina funcionando!'));

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));