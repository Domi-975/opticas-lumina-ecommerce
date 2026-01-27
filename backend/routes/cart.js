import { Router } from 'express';
import pool from '../DB/config.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

async function getOrCreateActiveCart(userId) {
  const cartRes = await pool.query(
    `SELECT id, user_id, status, fecha
     FROM carrito
     WHERE user_id = $1 AND status = 'activo'
     ORDER BY fecha DESC
     LIMIT 1`,
    [userId]
  );

  if (cartRes.rowCount) return cartRes.rows[0];

  const created = await pool.query(
    `INSERT INTO carrito (user_id, status) VALUES ($1, 'activo')
     RETURNING id, user_id, status, fecha`,
    [userId]
  );

  return created.rows[0];
}

async function getCartPayload(cartId) {
  const itemsRes = await pool.query(
    `SELECT
        ic.id,
        ic.cantidad,
        ic.precio_unitario,
        sp.id AS sku_id,
        sp.sku,
        sp.variant_name,
        p.id AS producto_id,
        p.nombre_producto,
        p.slug
      FROM items_carrito ic
      JOIN sku_productos sp ON sp.id = ic.sku_productos_id
      JOIN productos p ON p.id = sp.producto_id
      WHERE ic.carrito_id = $1
      ORDER BY ic.id DESC`,
    [cartId]
  );

  const items = itemsRes.rows.map((r) => ({
    id: r.id,
    cantidad: r.cantidad,
    precio_unitario: Number(r.precio_unitario),
    sku: { id: r.sku_id, sku: r.sku, variant_name: r.variant_name },
    producto: { id: r.producto_id, nombre_producto: r.nombre_producto, slug: r.slug },
  }));

  const total = items.reduce((acc, it) => acc + it.cantidad * it.precio_unitario, 0);
  const itemsCount = items.reduce((acc, it) => acc + it.cantidad, 0);

  return { cartId, items, itemsCount, total };
}

/**
 * GET /cart
 * Devuelve carrito activo del usuario (lo crea si no existe)
 */
router.get('/cart', requireAuth, async (req, res) => {
  try {
    const userId = req.user?.userId;
    const cart = await getOrCreateActiveCart(userId);
    const payload = await getCartPayload(cart.id);
    return res.status(200).json({ cart: payload });
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener carrito', error: error.message });
  }
});

/**
 * POST /cart/items
 * body: { sku_productos_id, cantidad } (acepta tambien sku_productos)
 */
router.post('/cart/items', requireAuth, async (req, res) => {
  try {
    const userId = req.user?.userId;
    const skuId = req.body.sku_productos_id ?? req.body.sku_productos;
    const cantidad = Number(req.body.cantidad);

    if (!skuId || !Number.isInteger(cantidad) || cantidad <= 0) {
      return res.status(400).json({ message: 'sku_productos_id y cantidad (>0) son requeridos' });
    }

    // Validar SKU
    const skuRes = await pool.query(
      `SELECT id, precio, stock, activo
       FROM sku_productos
       WHERE id = $1`,
      [skuId]
    );
    if (skuRes.rowCount === 0) return res.status(404).json({ message: 'SKU no encontrado' });

    const sku = skuRes.rows[0];
    if (!sku.activo) return res.status(400).json({ message: 'SKU inactivo' });

    // Carrito activo
    const cart = await getOrCreateActiveCart(userId);

    // Si ya existe el item, suma cantidad
    const existingRes = await pool.query(
      `SELECT id, cantidad
       FROM items_carrito
       WHERE carrito_id = $1 AND sku_productos_id = $2`,
      [cart.id, skuId]
    );

    if (existingRes.rowCount) {
      const newQty = existingRes.rows[0].cantidad + cantidad;
      await pool.query(
        `UPDATE items_carrito
         SET cantidad = $1
         WHERE id = $2`,
        [newQty, existingRes.rows[0].id]
      );
    } else {
      await pool.query(
        `INSERT INTO items_carrito (carrito_id, sku_productos_id, cantidad, precio_unitario)
         VALUES ($1, $2, $3, $4)`,
        [cart.id, skuId, cantidad, sku.precio]
      );
    }

    const payload = await getCartPayload(cart.id);
    return res.status(200).json({ message: 'Item agregado', cart: payload });
  } catch (error) {
    return res.status(500).json({ message: 'Error al agregar item', error: error.message });
  }
});

/**
 * PUT /cart/items/:itemId
 * body: { cantidad }
 */
router.put('/cart/items/:itemId', requireAuth, async (req, res) => {
  try {
    const userId = req.user?.userId;
    const itemId = Number(req.params.itemId);
    const cantidad = Number(req.body.cantidad);

    if (!Number.isInteger(itemId) || !Number.isInteger(cantidad) || cantidad <= 0) {
      return res.status(400).json({ message: 'itemId y cantidad (>0) son requeridos' });
    }

    const cart = await getOrCreateActiveCart(userId);

    const up = await pool.query(
      `UPDATE items_carrito
       SET cantidad = $1
       WHERE id = $2 AND carrito_id = $3
       RETURNING id`,
      [cantidad, itemId, cart.id]
    );

    if (up.rowCount === 0) return res.status(404).json({ message: 'Item no encontrado en tu carrito' });

    const payload = await getCartPayload(cart.id);
    return res.status(200).json({ message: 'Cantidad actualizada', cart: payload });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar item', error: error.message });
  }
});

/**
 * DELETE /cart/items/:itemId
 */
router.delete('/cart/items/:itemId', requireAuth, async (req, res) => {
  try {
    const userId = req.user?.userId;
    const itemId = Number(req.params.itemId);

    if (!Number.isInteger(itemId)) {
      return res.status(400).json({ message: 'itemId inválido' });
    }

    const cart = await getOrCreateActiveCart(userId);

    const del = await pool.query(
      `DELETE FROM items_carrito
       WHERE id = $1 AND carrito_id = $2
       RETURNING id`,
      [itemId, cart.id]
    );

    if (del.rowCount === 0) return res.status(404).json({ message: 'Item no encontrado en tu carrito' });

    const payload = await getCartPayload(cart.id);
    return res.status(200).json({ message: 'Item eliminado', cart: payload });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar item', error: error.message });
  }
});

export default router;
