import 'dotenv/config'
import app from './app.js'

const PORT = Number(process.env.PORT) || 5000

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT} (${process.env.NODE_ENV || 'development'})`)
  })

  server.on('error', (err) => {
    console.error('Server error:', err);
  });

  server.on('close', () => {
    console.log('Server closed');
  });
}

export default app
