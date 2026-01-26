import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../DB/config.js';

const router = Router();
const JWT_SECRET_HEX = process.env.JWT_SECRET || 'e9f1a4c3d7b8f2e1c4a9d3e5f6b7a8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4';

// POST /auth/register
router.post('/auth/register', async (req, res) => {
  try {
    const { nombre_completo, email, password, contrasena, telefono, direccion } = req.body;
    const passwordPlain = password ?? contrasena;
    if (!nombre_completo || !email || !passwordPlain) {
      return res.status(400).json({ message: 'Campos requeridos: nombre_completo, email, password' });
    }

    // Verificar si ya existe el email
    const exists = await pool.query('SELECT id FROM usuarios WHERE email = $1', [email]);
    if (exists.rowCount > 0) {
      return res.status(409).json({ message: 'El email ya está registrado' });
    }

    const hashed = await bcrypt.hash(passwordPlain, 10);

    const insert = await pool.query(
      'INSERT INTO usuarios (nombre_completo, email, contrasena, telefono, direccion) VALUES ($1, $2, $3, $4, $5) RETURNING id, nombre_completo, email, telefono, direccion, fecha_creacion',
      [nombre_completo, email, hashed, telefono ?? null, direccion ?? null]
    );

    const user = insert.rows[0];
    return res.status(201).json({ message: 'Usuario registrado', user });
  } catch (error) {
    return res.status(500).json({ message: 'Error en registro', error: error.message });
  }
});

// POST /auth/login
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password, contrasena } = req.body;
    const passwordInput = password ?? contrasena;
    if (!email || !passwordInput) {
      return res.status(400).json({ message: 'Email y password son requeridos' });
    }

    const result = await pool.query('SELECT id, email, contrasena, nombre_completo FROM usuarios WHERE email = $1', [email]);
    if (result.rowCount === 0) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const user = result.rows[0];
    const isValid = await bcrypt.compare(passwordInput, user.contrasena);
    if (!isValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET_HEX, { expiresIn: '2h' });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Error en login', error: error.message });
  }
});

export default router;
