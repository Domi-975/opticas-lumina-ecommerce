import 'dotenv/config';
import pg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  allowExitOnIdle: true
});

const seedAdmin = async () => {
  try {
    const email = 'admin@lumina.com';
    const password = 'lumina';
    const hashedPassword = bcrypt.hashSync(password, 10);
    const nombre = 'Admin User';

    // Check if admin exists
    const checkQuery = 'SELECT * FROM usuarios WHERE email = $1';
    const checkResult = await pool.query(checkQuery, [email]);

    if (checkResult.rows.length > 0) {
      console.log('El usuario administrador ya existe.');
    } else {
      const insertQuery = `
        INSERT INTO usuarios (nombre_completo, email, contrasena)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
      const result = await pool.query(insertQuery, [nombre, email, hashedPassword]);
      console.log('Usuario administrador creado exitosamente:', result.rows[0].email);
    }
  } catch (error) {
    console.error('Error al crear seed:', error);
  } finally {
    await pool.end();
  }
};

seedAdmin();
