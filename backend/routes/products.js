import { Router } from 'express';
import pool from '../DB/config.js';

const router = Router();

/**
 * GET /products
 * Lista productos activos + categoria + imagenes + precio_min (sku activo)
 */
router.get('/products', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
          p.id,
          p.categoria_id,
          p.nombre_producto,
          p.slug,
          p.descripcion,
          p.marca,
          c.nombre_categoria,
          c.slug AS categoria_slug,
          COALESCE(
            ARRAY_REMOVE(ARRAY_AGG(DISTINCT ip.image_url), NULL),
            '{}'::text[]
          ) AS imagenes,
          MIN(sp.precio) FILTER (WHERE sp.activo = true) AS precio_min
        FROM productos p
        LEFT JOIN categorias c ON c.id = p.categoria_id
        LEFT JOIN imagenes_producto ip ON ip.producto_id = p.id
        LEFT JOIN sku_productos sp ON sp.producto_id = p.id
        WHERE p.activo = true
        GROUP BY p.id, c.id
        ORDER BY p.id DESC;`
    );

    return res.status(200).json({ products: result.rows });
  } catch (error) {
    return res.status(500).json({ message: 'Error al listar productos', error: error.message });
  }
});

export default router;
