-- backend/DB/SEED_LENTES_ONLY.sql
-- Seed SOLO de productos de lentes (sol y ópticos), con imágenes.
-- Seguro: borra únicamente productos anteriores con slugs que contengan '-seed-'.

BEGIN;

-- 1) Categorías (solo las de óptica)
INSERT INTO categorias (nombre_categoria, slug)
VALUES
  ('Lentes de Sol', 'lentes-de-sol'),
  ('Lentes Ópticos', 'opticos')
ON CONFLICT (slug)
DO UPDATE SET nombre_categoria = EXCLUDED.nombre_categoria;

-- 2) Limpieza controlada: borrar solo los productos seed anteriores
-- (esto evita tocar productos reales que ustedes hayan creado manualmente)
DELETE FROM imagenes_producto
WHERE producto_id IN (SELECT id FROM productos WHERE slug LIKE '%-seed-%');

DELETE FROM sku_productos
WHERE producto_id IN (SELECT id FROM productos WHERE slug LIKE '%-seed-%');

DELETE FROM productos
WHERE slug LIKE '%-seed-%';

-- 3) Insertar productos: LENTES DE SOL (8)
-- NOTA: cada producto se inserta + su SKU + su imagen.

-- SOL 1
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='lentes-de-sol'),
    'Aviator Polarizado',
    'aviator-polarizado-seed-001',
    'Aviator clásico con lentes polarizados y protección UV400.',
    'Lúmina',
    true
  )
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'LUM-SOL-001', 'Standard', 59990, 20, true FROM p;

WITH p AS (SELECT id FROM productos WHERE slug='aviator-polarizado-seed-001')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id, 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80'
FROM p;

-- SOL 2
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='lentes-de-sol'),
    'Wayfarer Urbano',
    'wayfarer-urbano-seed-002',
    'Diseño urbano icónico, livianos y cómodos. UV400.',
    'Lúmina',
    true
  )
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'LUM-SOL-002', 'Standard', 49990, 25, true FROM p;

WITH p AS (SELECT id FROM productos WHERE slug='wayfarer-urbano-seed-002')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id, 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=80'
FROM p;

-- SOL 3
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='lentes-de-sol'),
    'Round Vintage',
    'round-vintage-sol-seed-003',
    'Estilo vintage redondo, marco liviano y protección UV400.',
    'Lúmina',
    true
  )
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'LUM-SOL-003', 'Standard', 45990, 18, true FROM p;

WITH p AS (SELECT id FROM productos WHERE slug='round-vintage-sol-seed-003')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id, 'https://images.unsplash.com/photo-1519181245277-cffeb31da2fb?auto=format&fit=crop&w=1200&q=80'
FROM p;

-- SOL 4
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='lentes-de-sol'),
    'Sport Shield',
    'sport-shield-sol-seed-004',
    'Lentes deportivos con visión amplia y ajuste cómodo. UV400.',
    'Lúmina',
    true
  )
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'LUM-SOL-004', 'Standard', 69990, 12, true FROM p;

WITH p AS (SELECT id FROM productos WHERE slug='sport-shield-sol-seed-004')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id, 'https://images.unsplash.com/photo-1520975958225-70f29f62fdf3?auto=format&fit=crop&w=1200&q=80'
FROM p;

-- SOL 5
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='lentes-de-sol'),
    'Cat Eye Chic',
    'cat-eye-chic-sol-seed-005',
    'Diseño cat-eye moderno con lentes UV400.',
    'Lúmina',
    true
  )
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'LUM-SOL-005', 'Standard', 54990, 15, true FROM p;

WITH p AS (SELECT id FROM productos WHERE slug='cat-eye-chic-sol-seed-005')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80'
FROM p;

-- SOL 6
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='lentes-de-sol'),
    'Rectangular Minimal',
    'rectangular-minimal-sol-seed-006',
    'Marco rectangular minimalista con protección UV400.',
    'Lúmina',
    true
  )
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'LUM-SOL-006', 'Standard', 47990, 20, true FROM p;

WITH p AS (SELECT id FROM productos WHERE slug='rectangular-minimal-sol-seed-006')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id, 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80'
FROM p;

-- SOL 7
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='lentes-de-sol'),
    'Oversize Glam',
    'oversize-glam-sol-seed-007',
    'Lentes oversize con look glam y UV400.',
    'Lúmina',
    true
  )
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'LUM-SOL-007', 'Standard', 64990, 10, true FROM p;

WITH p AS (SELECT id FROM productos WHERE slug='oversize-glam-sol-seed-007')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id, 'https://images.unsplash.com/photo-1520975693411-bb3f1f3a7c1f?auto=format&fit=crop&w=1200&q=80'
FROM p;

-- SOL 8
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='lentes-de-sol'),
    'Clubmaster Retro',
    'clubmaster-retro-sol-seed-008',
    'Estilo retro tipo clubmaster con UV400.',
    'Lúmina',
    true
  )
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'LUM-SOL-008', 'Standard', 57990, 14, true FROM p;

WITH p AS (SELECT id FROM productos WHERE slug='clubmaster-retro-sol-seed-008')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id, 'https://images.unsplash.com/photo-1520975670231-9b2f1f5c2c38?auto=format&fit=crop&w=1200&q=80'
FROM p;

-- 4) Insertar productos: ÓPTICOS (4)

-- OPT 1
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='opticos'),
    'Blue Light Office',
    'blue-light-office-opt-seed-009',
    'Lentes ópticos con filtro de luz azul para pantallas.',
    'Lúmina',
    true
  )
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'LUM-OPT-009', 'Standard', 79990, 10, true FROM p;

WITH p AS (SELECT id FROM productos WHERE slug='blue-light-office-opt-seed-009')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id, 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80'
FROM p;

-- OPT 2
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='opticos'),
    'Metal Minimal',
    'metal-minimal-opt-seed-010',
    'Marco metálico liviano y elegante para uso diario.',
    'Lúmina',
    true
  )
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'LUM-OPT-010', 'Standard', 89990, 8, true FROM p;

WITH p AS (SELECT id FROM productos WHERE slug='metal-minimal-opt-seed-010')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id, 'https://images.unsplash.com/photo-1520974740341-236d4f2a7f64?auto=format&fit=crop&w=1200&q=80'
FROM p;

-- OPT 3
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='opticos'),
    'Acetato Premium',
    'acetato-premium-opt-seed-011',
    'Marco de acetato premium con alta durabilidad y estilo.',
    'Lúmina',
    true
  )
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'LUM-OPT-011', 'Standard', 99990, 6, true FROM p;

WITH p AS (SELECT id FROM productos WHERE slug='acetato-premium-opt-seed-011')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id, 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80'
FROM p;

-- OPT 4
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='opticos'),
    'Round Classic',
    'round-classic-opt-seed-012',
    'Marco redondo clásico, cómodo y versátil.',
    'Lúmina',
    true
  )
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'LUM-OPT-012', 'Standard', 74990, 12, true FROM p;

WITH p AS (SELECT id FROM productos WHERE slug='round-classic-opt-seed-012')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id, 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=1200&q=80'
FROM p;

COMMIT;
