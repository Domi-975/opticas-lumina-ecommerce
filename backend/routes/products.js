import { Router } from 'express';
import pool from '../DB/config.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Helper to slugify
const slugify = (text) => text.toString().toLowerCase()
  .replace(/\s+/g, '-')           // Replace spaces with -
  .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
  .replace(/\-\-+/g, '-')         // Replace multiple - with single -
  .replace(/^-+/, '')             // Trim - from start
  .replace(/-+$/, '');            // Trim - from end

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

/**
 * POST /products
 * Crea un nuevo producto (requiere autenticación)
 */
router.post('/products', requireAuth, async (req, res) => {
  const { titulo, descripcion, precio, categoria, imagen } = req.body;

  if (!titulo || !precio || !categoria) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Gestionar Categoría (Buscar o Crear)
    let categoriaId;
    const catSlug = slugify(categoria);
    const catResult = await client.query('SELECT id FROM categorias WHERE slug = $1', [catSlug]);

    if (catResult.rows.length > 0) {
      categoriaId = catResult.rows[0].id;
    } else {
      const newCat = await client.query(
        'INSERT INTO categorias (nombre_categoria, slug) VALUES ($1, $2) RETURNING id',
        [categoria, catSlug]
      );
      categoriaId = newCat.rows[0].id;
    }

    // 2. Insertar Producto
    const prodSlug = slugify(titulo) + '-' + Date.now(); // Unique slug
    const prodResult = await client.query(
      `INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
       VALUES ($1, $2, $3, $4, 'Generica', true) RETURNING id`,
      [categoriaId, titulo, prodSlug, descripcion]
    );
    const productoId = prodResult.rows[0].id;

    // 3. Insertar SKU (Precio y Stock)
    const sku = 'SKU-' + productoId + '-' + Date.now();
    await client.query(
      `INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
       VALUES ($1, $2, 'Standard', $3, 10, true)`,
      [productoId, sku, precio]
    );

    // 4. Insertar Imagen
    if (imagen) {
      await client.query(
        'INSERT INTO imagenes_producto (producto_id, image_url) VALUES ($1, $2)',
        [productoId, imagen]
      );
    }

    await client.query('COMMIT');
    res.status(201).json({ message: 'Producto creado exitosamente', id: productoId });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creando producto:', error);
    res.status(500).json({ message: 'Error al crear el producto', error: error.message });
  } finally {
    client.release();
  }
});

/**
 * DELETE /products/:id
 * Elimina un producto (lógica: lo marca como inactivo)
 */
router.delete('/products/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('UPDATE productos SET activo = false WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
  }
});

/**
 * PUT /products/:id
 * Actualiza un producto
 */
router.put('/products/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, precio, categoria, imagen } = req.body;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Actualizar tabla productos
    const prodRes = await client.query(
      'UPDATE productos SET nombre_producto = $1, descripcion = $2 WHERE id = $3 RETURNING *',
      [titulo, descripcion, id]
    );

    if (prodRes.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // 2. Actualizar SKU (precio)
    await client.query(
      'UPDATE sku_productos SET precio = $1 WHERE producto_id = $2',
      [precio, id]
    );

    // 3. Actualizar Imagen (simplificado: borramos y creamos la nueva si viene)
    if (imagen) {
      await client.query('DELETE FROM imagenes_producto WHERE producto_id = $1', [id]);
      await client.query('INSERT INTO imagenes_producto (producto_id, image_url) VALUES ($1, $2)', [id, imagen]);
    }

    await client.query('COMMIT');
    res.status(200).json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
  } finally {
    client.release();
  }
});

export default router;
