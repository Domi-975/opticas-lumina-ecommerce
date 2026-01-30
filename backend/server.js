import 'dotenv/config'
import app from './app.js'

const PORT = Number(process.env.PORT) || 5000

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT} (${process.env.NODE_ENV || 'development'})`)
  })
}

export default app
