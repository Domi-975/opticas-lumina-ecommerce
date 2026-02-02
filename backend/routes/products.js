import { Router } from 'express'; // Importa Router de express para definir rutas
import pool from '../DB/config.js'; // Importa la conexión a la base de datos (pool)
import { requireAuth } from '../middleware/auth.js'; // Importa middleware para proteger rutas (requiere token)

const router = Router(); // Crea una instancia del enrutador de Express

// Función auxiliar para convertir texto a "slug" (URL amigable)
// Ejemplo: "Hola Mundo" -> "hola-mundo"
const slugify = (text) => text.toString().toLowerCase()
  .replace(/\s+/g, '-')           // Reemplaza espacios con guiones
  .replace(/[^\w\-]+/g, '')       // Elimina caracteres no alfanuméricos
  .replace(/\-\-+/g, '-')         // Reemplaza múltiples guiones por uno solo
  .replace(/^-+/, '')             // Elimina guiones al inicio
  .replace(/-+$/, '');            // Elimina guiones al final

/**
 * GET /products
 * Ruta pública para obtener el catálogo de productos.
 * Realiza una consulta compleja (JOINs) para traer toda la info necesaria.
 */
router.get('/products', async (req, res) => {
  try {
    // Consulta SQL para obtener productos activos con sus detalles
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

    // Devuelve los productos en formato JSON con código 200 (OK)
    return res.status(200).json({ products: result.rows });
  } catch (error) {
    // Manejo de errores: devuelve 500 (Server Error)
    return res.status(500).json({ message: 'Error al listar productos', error: error.message });
  }
});

/**
 * POST /products
 * Crea un nuevo producto. Requiere autenticación (requireAuth).
 * Utiliza una transacción SQL para asegurar integridad en múltiples tablas.
 */
router.post('/products', requireAuth, async (req, res) => {
  // Desestructura los datos enviados en el cuerpo de la petición
  const { titulo, descripcion, precio, categoria, imagen } = req.body;

  // Validación básica: verifica campos obligatorios
  if (!titulo || !precio || !categoria) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  // Obtiene un cliente de la pool para manejar la transacción
  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Inicia la transacción

    // 1. Gestionar Categoría (Buscar si existe o Crear nueva)
    let categoriaId;
    const catSlug = slugify(categoria); // Genera slug para la categoría
    // Busca si ya existe una categoría con ese slug
    const catResult = await client.query('SELECT id FROM categorias WHERE slug = $1', [catSlug]);

    if (catResult.rows.length > 0) {
      // Si existe, usa su ID
      categoriaId = catResult.rows[0].id;
    } else {
      // Si no existe, la crea y obtiene el nuevo ID
      const newCat = await client.query(
        'INSERT INTO categorias (nombre_categoria, slug) VALUES ($1, $2) RETURNING id',
        [categoria, catSlug]
      );
      categoriaId = newCat.rows[0].id;
    }

    // 2. Insertar Producto en la tabla principal
    const prodSlug = slugify(titulo) + '-' + Date.now(); // Crea slug único añadiendo timestamp
    const prodResult = await client.query(
      `INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
       VALUES ($1, $2, $3, $4, 'Generica', true) RETURNING id`, // Inserta y devuelve el ID generado
      [categoriaId, titulo, prodSlug, descripcion]
    );
    const productoId = prodResult.rows[0].id; // ID del producto recién creado

    // 3. Insertar SKU (Unidad de mantenimiento de stock - Variantes/Precios)
    const sku = 'SKU-' + productoId + '-' + Date.now(); // Genera código SKU único
    await client.query(
      `INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
       VALUES ($1, $2, 'Standard', $3, 10, true)`, // Crea un SKU "Standard" con stock inicial 10
      [productoId, sku, precio]
    );

    // 4. Insertar Imagen (si se proporcionó URL)
    if (imagen) {
      await client.query(
        'INSERT INTO imagenes_producto (producto_id, image_url) VALUES ($1, $2)',
        [productoId, imagen]
      );
    }

    await client.query('COMMIT'); // Confirma todas las operaciones de la transacción
    // Devuelve éxito 201 (Created)
    res.status(201).json({ message: 'Producto creado exitosamente', id: productoId });

  } catch (error) {
    await client.query('ROLLBACK'); // Si algo falla, deshace todos los cambios pendientes
    console.error('Error creando producto:', error);
    res.status(500).json({ message: 'Error al crear el producto', error: error.message });
  } finally {
    client.release(); // Libera el cliente de la base de datos
  }
});

/**
 * DELETE /products/:id
 * Elimina un producto. Requiere autenticación.
 * Realiza un "soft delete" (borrado lógico) marcando activo = false.
 */
router.delete('/products/:id', requireAuth, async (req, res) => {
  const { id } = req.params; // Obtiene el ID de la URL
  try {
    // Actualiza el campo 'activo' a false en lugar de borrar el registro físico
    const result = await pool.query('UPDATE productos SET activo = false WHERE id = $1 RETURNING *', [id]);
    
    // Si no se actualizó ninguna fila, el producto no existía
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
 * Actualiza un producto existente. Requiere autenticación.
 * También usa transacción para asegurar consistencia entre tablas.
 */
router.put('/products/:id', requireAuth, async (req, res) => {
  const { id } = req.params; // ID del producto a editar
  const { titulo, descripcion, precio, categoria, imagen } = req.body; // Nuevos datos

  const client = await pool.connect(); // Cliente para transacción
  try {
    await client.query('BEGIN'); // Inicia transacción

    // 1. Actualizar datos básicos en tabla productos
    const prodRes = await client.query(
      'UPDATE productos SET nombre_producto = $1, descripcion = $2 WHERE id = $3 RETURNING *',
      [titulo, descripcion, id]
    );

    // Verifica si el producto existía
    if (prodRes.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // 2. Actualizar precio en tabla SKU (actualiza todos los SKUs de ese producto)
    await client.query(
      'UPDATE sku_productos SET precio = $1 WHERE producto_id = $2',
      [precio, id]
    );

    // 3. Actualizar Imagen
    // Estrategia simplificada: borrar todas las imágenes previas e insertar la nueva
    if (imagen) {
      await client.query('DELETE FROM imagenes_producto WHERE producto_id = $1', [id]);
      await client.query('INSERT INTO imagenes_producto (producto_id, image_url) VALUES ($1, $2)', [id, imagen]);
    }

    await client.query('COMMIT'); // Confirma cambios
    res.status(200).json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    await client.query('ROLLBACK'); // Deshace cambios en caso de error
    res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
  } finally {
    client.release(); // Libera cliente
  }
});

export default router; // Exporta el router para usarlo en app.js
