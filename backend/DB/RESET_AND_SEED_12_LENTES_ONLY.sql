-- backend/DB/RESET_AND_SEED_12_LENTES_ONLY.sql
-- Limpia catálogo y carga 12 productos SOLO LENTES (Sol / Recetados / Contacto)
-- Evita textos con tildes para no dejar "Ã“" en la DB.
-- Usa imágenes dinámicas por categoría (siempre relacionadas a lentes).

BEGIN;

-- ============================================================
-- 1) LIMPIEZA TOTAL (para evitar residuos de seeds anteriores)
-- ============================================================
DELETE FROM items_carrito;
DELETE FROM carrito;
DELETE FROM pagos;
DELETE FROM ordenes_compra;

DELETE FROM imagenes_producto;
DELETE FROM sku_productos;
DELETE FROM productos;

-- Deja sólo 3 categorías y las reescribe sin tildes (evita "Ã“")
DELETE FROM categorias
WHERE slug NOT IN ('lentes-de-sol', 'recetados', 'contacto');

INSERT INTO categorias (nombre_categoria, slug)
VALUES
  ('Lentes de Sol', 'lentes-de-sol'),
  ('Recetados', 'recetados'),
  ('Contacto', 'contacto')
ON CONFLICT (slug)
DO UPDATE SET nombre_categoria = EXCLUDED.nombre_categoria;

-- ============================================================
-- 2) INSERTAR 12 PRODUCTOS SOLO LENTES + SKU + IMAGEN
--    4 Sol, 4 Recetados, 4 Contacto
-- ============================================================

-- -------------------------
-- SOL (4)
-- -------------------------

-- SOL 01
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='lentes-de-sol'),
    'Aviator Polarizado',
    'lumina-sol-001',
    'Aviator clasico con lentes polarizados y proteccion UV400.',
    'Lumina',
    true
  )
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'LUM-SOL-001', 'Standard', 59990, 20, true FROM p;

WITH p AS (SELECT id FROM productos WHERE slug='lumina-sol-001')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id, 'https://images.unsplash.com/photo-1584036553516-bf83210aa16c?q=80&w=680&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
FROM p;

-- SOL 02
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='lentes-de-sol'),
    'Wayfarer Urbano',
    'lumina-sol-002',
    'Diseno urbano iconico, livianos y comodos. Proteccion UV400.',
    'Lumina',
    true
  )
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'LUM-SOL-002', 'Standard', 49990, 25, true FROM p;

WITH p AS (SELECT id FROM productos WHERE slug='lumina-sol-002')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id, 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
FROM p;

-- SOL 03
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='lentes-de-sol'),
    'Round Vintage',
    'lumina-sol-003',
    'Estilo vintage redondo con marco liviano. Proteccion UV400.',
    'Lumina',
    true
  )
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'LUM-SOL-003', 'Standard', 45990, 18, true FROM p;

WITH p AS (SELECT id FROM productos WHERE slug='lumina-sol-003')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id, 'https://images.unsplash.com/flagged/photo-1577479662097-5e0347cbe923?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
FROM p;

-- SOL 04
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='lentes-de-sol'),
    'Clubmaster Retro',
    'lumina-sol-004',
    'Estilo retro tipo clubmaster con proteccion UV400.',
    'Lumina',
    true
  )
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'LUM-SOL-004', 'Standard', 57990, 14, true FROM p;

WITH p AS (SELECT id FROM productos WHERE slug='lumina-sol-004')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id, 'https://images.unsplash.com/photo-1752127898590-49bdb53dc704?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
FROM p;

-- -------------------------
-- RECETADOS (4)
-- -------------------------

-- REC 01
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='recetados'),
    'Blue Light Office',
    'lumina-rec-005',
    'Lentes recetados con filtro de luz azul para pantallas.',
    'Lumina',
    true
  )
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'LUM-REC-005', 'Standard', 79990, 10, true FROM p;

WITH p AS (SELECT id FROM productos WHERE slug='lumina-rec-005')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id, 'https://images.unsplash.com/photo-1646084081219-1090f72a531c?q=80&w=996&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
FROM p;

-- REC 02
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='recetados'),
    'Metal Minimal',
    'lumina-rec-006',
    'Marco metalico liviano y elegante para uso diario.',
    'Lumina',
    true
  )
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'LUM-REC-006', 'Standard', 89990, 8, true FROM p;

WITH p AS (SELECT id FROM productos WHERE slug='lumina-rec-006')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id, 'https://images.unsplash.com/photo-1688905341704-c12ea8e58d20?q=80&w=721&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
FROM p;

-- REC 03
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='recetados'),
    'Acetato Premium',
    'lumina-rec-007',
    'Marco de acetato premium con alta durabilidad y estilo.',
    'Lumina',
    true
  )
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'LUM-REC-007', 'Standard', 99990, 6, true FROM p;

WITH p AS (SELECT id FROM productos WHERE slug='lumina-rec-007')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id, 'https://images.unsplash.com/photo-1663901303513-9f14f6ef6b23?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
FROM p;

-- REC 04
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='recetados'),
    'Round Classic',
    'lumina-rec-008',
    'Marco redondo clasico, comodo y versatil.',
    'Lumina',
    true
  )
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'LUM-REC-008', 'Standard', 74990, 12, true FROM p;

WITH p AS (SELECT id FROM productos WHERE slug='lumina-rec-008')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id, 'https://images.unsplash.com/photo-1625591341337-13dc6e871cee?q=80&w=1090&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
FROM p;

-- -------------------------
-- CONTACTO (4)
-- -------------------------

-- CON 01
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='contacto'),
    'SoftLens Daily',
    'lumina-con-009',
    'Lentes de contacto diarios: confort y facil adaptacion.',
    'Lumina',
    true
  )
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'LUM-CON-009', 'Caja 30', 19990, 50, true FROM p;

WITH p AS (SELECT id FROM productos WHERE slug='lumina-con-009')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id, 'https://images.unsplash.com/photo-1625591341337-13dc6e871cee?q=80&w=1090&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
FROM p;

-- CON 02
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='contacto'),
    'SoftLens Monthly',
    'lumina-con-010',
    'Lentes mensuales con alta hidratacion.',
    'Lumina',
    true
  )
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'LUM-CON-010', 'Caja 6', 24990, 40, true FROM p;

WITH p AS (SELECT id FROM productos WHERE slug='lumina-con-010')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id, 'https://images.unsplash.com/photo-1603578119639-798b8413d8d7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
FROM p;

-- CON 03
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='contacto'),
    'Hydra Comfort',
    'lumina-con-011',
    'Tecnologia de hidratacion prolongada para mayor comodidad.',
    'Lumina',
    true
  )
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'LUM-CON-011', 'Caja 6', 27990, 35, true FROM p;

WITH p AS (SELECT id FROM productos WHERE slug='lumina-con-011')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id, 'https://plus.unsplash.com/premium_photo-1663048816150-1638f707cea2?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
FROM p;

-- CON 04
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='contacto'),
    'Toric Balance',
    'lumina-con-012',
    'Lentes toricos para mayor estabilidad y vision.',
    'Lumina',
    true
  )
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'LUM-CON-012', 'Caja 6', 29990, 30, true FROM p;

WITH p AS (SELECT id FROM productos WHERE slug='lumina-con-012')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id, 'https://plus.unsplash.com/premium_photo-1663045444986-08558b50c13b?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
FROM p;

COMMIT;
