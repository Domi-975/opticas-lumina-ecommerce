import pg from 'pg'
import 'dotenv/config'

const { Pool } = pg

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT,
  DATABASE_URL,
  NODE_ENV
} = process.env

const isProd = NODE_ENV === 'production'
const isTest = NODE_ENV === 'test'

const pool = DATABASE_URL
  ? new Pool({
      connectionString: DATABASE_URL,
      // La mayoría de proveedores cloud requieren SSL; esto evita errores por certificados.
      ssl: isProd ? { rejectUnauthorized: false } : false,
      allowExitOnIdle: true
    })
  : new Pool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      port: DB_PORT ? Number(DB_PORT) : 5432,
      allowExitOnIdle: true
    })

// Ping de conexión (útil para ver en logs del deploy si conectó)
if (!isTest) {
  pool
    .query('SELECT NOW() AS now')
    .then((res) => console.log('Db-connected:', res.rows?.[0]?.now || res.rows?.[0]))
    .catch((err) => console.log('[DB CONFIG] Error conectando a Postgres:', err.message))
}

export default pool
