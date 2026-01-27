import { Router } from 'express';
import pool from '../DB/config.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

/**
 * GET /users/profile
 */
router.get('/users/profile', requireAuth, async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: 'Token inválido' });

    const userRes = await pool.query(
      `SELECT id, nombre_completo, email, telefono, direccion, fecha_creacion
       FROM usuarios
       WHERE id = $1`,
      [userId]
    );

    if (userRes.rowCount === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

    return res.status(200).json({ user: userRes.rows[0] });
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener perfil', error: error.message });
  }
});

export default router;
