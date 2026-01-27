import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT,
  DATABASE_URL,
  NODE_ENV,
} = process.env;

const pool = DATABASE_URL
  ? new Pool({
      connectionString: DATABASE_URL,
      ssl: NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      allowExitOnIdle: true,
    })
  : new Pool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      port: DB_PORT,
      allowExitOnIdle: true,
    });

if (NODE_ENV !== 'test') {
  pool.query('SELECT NOW() AS now')
    .then((res) => console.log('Db-connected:', res.rows[0]))
    .catch((err) => console.log('[DB CONFIG] Error conectando a Postgres:', err.message));
}

export default pool;
