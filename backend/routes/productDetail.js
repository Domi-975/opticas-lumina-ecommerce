import { Router } from "express";
import pool from "../DB/config.js";
import authMiddleware from "../src/middlewares/authMiddleware.js";

const router = Router();

// middleware para proteger rutas
router.use(authMiddleware);

// GET /products/:slug
router.get("/products/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const prodRes = await pool.query(
      "SELECT id, categoria_id, nombre_producto, slug, descripcion, marca, activo FROM productos WHERE slug = $1 AND activo = true",
      [slug]
    );

    if (prodRes.rowCount === 0) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    const product = prodRes.rows[0];

    // obtener categoria
    let categoria = null;
    if (product.categoria_id) {
      const catRes = await pool.query(
        "SELECT id, nombre_categoria, slug FROM categorias WHERE id = $1",
        [product.categoria_id]
      );
      categoria = catRes.rowCount ? catRes.rows[0] : null;
    }

    // obtener imagenes
    const imgRes = await pool.query(
      "SELECT image_url FROM imagenes_producto WHERE producto_id = $1",
      [product.id]
    );
    const imagenes = imgRes.rows.map((row) => row.image_url);

    // obtener skus
    const skuRes = await pool.query(
      "SELECT id, sku, variant_name, precio, precio_antes, stock, activo FROM sku_productos WHERE producto_id = $1 AND activo = true",
      [product.id]
    );

    const skus = skuRes.rows;

    const payload = {
      id: product.id,
      nombre_producto: product.nombre_producto,
      slug: product.slug,
      descripcion: product.descripcion,
      marca: product.marca,
      categoria,
      imagenes,
      skus,
    };

    return res.status(200).json({
      product: payload,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al obtener producto",
    });
  }
});

export default router;
