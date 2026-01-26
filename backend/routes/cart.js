import { Router } from 'express';
import pool from '../DB/config.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

/**
 * POST /cart/items
 * Agrega o actualiza un item en el carrito del usuario.
 * Body: { sku_productos_id, cantidad }
 */
router.post('/cart/items', requireAuth, async (req, res) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    const { sku_productos_id, sku_productos, skuId, cantidad } = req.body;
    const skuIdFinal = sku_productos_id ?? sku_productos ?? skuId;

    const qty = Number(cantidad);
    if (!skuIdFinal || !Number.isInteger(qty) || qty <= 0) {
      return res.status(400).json({ message: 'Body inválido. Requiere sku_productos_id y cantidad > 0.' });
    }

    // Validar SKU y obtener precio
    const skuRes = await pool.query(
      `SELECT id, precio, activo, stock
       FROM sku_productos
       WHERE id = $1`,
      [skuIdFinal]
    );
    if (skuRes.rowCount === 0) {
      return res.status(404).json({ message: 'SKU no encontrado' });
    }
    const sku = skuRes.rows[0];
    if (!sku.activo) {
      return res.status(400).json({ message: 'SKU inactivo' });
    }
    if (sku.stock !== null && Number(sku.stock) < qty) {
      return res.status(400).json({ message: 'Stock insuficiente' });
    }

    // Obtener o crear carrito
    const cartRes = await pool.query(
      `SELECT id
       FROM carrito
       WHERE user_id = $1
       ORDER BY fecha DESC
       LIMIT 1`,
      [userId]
    );

    let cartId;
    if (cartRes.rowCount) {
      cartId = cartRes.rows[0].id;
    } else {
      const created = await pool.query(
        `INSERT INTO carrito (user_id, status)
         VALUES ($1, $2)
         RETURNING id`,
        [userId, 'abierto']
      );
      cartId = created.rows[0].id;
    }

    // Upsert item
    const existingItemRes = await pool.query(
      `SELECT id, cantidad
       FROM items_carrito
       WHERE carrito_id = $1 AND sku_productos_id = $2`,
      [cartId, skuIdFinal]
    );

    if (existingItemRes.rowCount) {
      const existing = existingItemRes.rows[0];
      const newQty = Number(existing.cantidad) + qty;
      await pool.query(
        `UPDATE items_carrito
         SET cantidad = $1
         WHERE id = $2`,
        [newQty, existing.id]
      );
    } else {
      await pool.query(
        `INSERT INTO items_carrito (carrito_id, sku_productos_id, cantidad, precio_unitario)
         VALUES ($1, $2, $3, $4)`,
        [cartId, skuIdFinal, qty, sku.precio]
      );
    }

    return res.status(200).json({ message: 'Item agregado/actualizado', cart_id: cartId });
  } catch (error) {
    return res.status(500).json({ message: 'Error al agregar item', error: error.message });
  }
});

export default router;
