-- backend/DB/SEED_PRODUCTS.sql
BEGIN;

INSERT INTO categorias (nombre_categoria, slug)
VALUES
  ('Lentes de Sol', 'lentes-de-sol'),
  ('Recetados', 'recetados'),
  ('Contacto', 'contacto')
ON CONFLICT (slug)
DO UPDATE SET nombre_categoria = EXCLUDED.nombre_categoria;

-- LENTES DE SOL
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='lentes-de-sol'),
    'Aviator Classic',
    'aviator-classic-seed-001',
    'Lentes de sol estilo aviador con protección UV400.',
    'Lúmina',
    true
  )
  ON CONFLICT (slug) DO NOTHING
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'SEED-SKU-001', 'Standard', 59990, 20, true FROM p
ON CONFLICT (sku) DO NOTHING;

WITH p AS (SELECT id FROM productos WHERE slug='aviator-classic-seed-001')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id,'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80'
FROM p
WHERE NOT EXISTS (SELECT 1 FROM imagenes_producto ip WHERE ip.producto_id=p.id);

WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='lentes-de-sol'),
    'Wayfarer Urban',
    'wayfarer-urban-seed-002',
    'Diseño urbano, livianos y cómodos. Protección UV.',
    'Lúmina',
    true
  )
  ON CONFLICT (slug) DO NOTHING
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'SEED-SKU-002', 'Standard', 49990, 20, true FROM p
ON CONFLICT (sku) DO NOTHING;

WITH p AS (SELECT id FROM productos WHERE slug='wayfarer-urban-seed-002')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id,'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=80'
FROM p
WHERE NOT EXISTS (SELECT 1 FROM imagenes_producto ip WHERE ip.producto_id=p.id);

WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='lentes-de-sol'),
    'Sport Shield',
    'sport-shield-seed-003',
    'Lentes deportivos con visión amplia y ajuste cómodo.',
    'Lúmina',
    true
  )
  ON CONFLICT (slug) DO NOTHING
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'SEED-SKU-003', 'Standard', 69990, 15, true FROM p
ON CONFLICT (sku) DO NOTHING;

WITH p AS (SELECT id FROM productos WHERE slug='sport-shield-seed-003')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id,'https://images.unsplash.com/photo-1520975958225-70f29f62fdf3?auto=format&fit=crop&w=1200&q=80'
FROM p
WHERE NOT EXISTS (SELECT 1 FROM imagenes_producto ip WHERE ip.producto_id=p.id);

WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='lentes-de-sol'),
    'Round Vintage',
    'round-vintage-seed-004',
    'Estilo vintage redondo con protección UV y marco liviano.',
    'Lúmina',
    true
  )
  ON CONFLICT (slug) DO NOTHING
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'SEED-SKU-004', 'Standard', 45990, 25, true FROM p
ON CONFLICT (sku) DO NOTHING;

WITH p AS (SELECT id FROM productos WHERE slug='round-vintage-seed-004')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id,'https://images.unsplash.com/photo-1519181245277-cffeb31da2fb?auto=format&fit=crop&w=1200&q=80'
FROM p
WHERE NOT EXISTS (SELECT 1 FROM imagenes_producto ip WHERE ip.producto_id=p.id);

-- RECETADOS
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='recetados'),
    'Classic Blue Light',
    'classic-blue-light-seed-005',
    'Lentes recetados con filtro de luz azul para pantallas.',
    'Lúmina',
    true
  )
  ON CONFLICT (slug) DO NOTHING
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'SEED-SKU-005', 'Standard', 79990, 10, true FROM p
ON CONFLICT (sku) DO NOTHING;

WITH p AS (SELECT id FROM productos WHERE slug='classic-blue-light-seed-005')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id,'https://images.unsplash.com/photo-1520974740341-236d4f2a7f64?auto=format&fit=crop&w=1200&q=80'
FROM p
WHERE NOT EXISTS (SELECT 1 FROM imagenes_producto ip WHERE ip.producto_id=p.id);

WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='recetados'),
    'Metal Minimal',
    'metal-minimal-seed-006',
    'Marco metálico minimalista, ideal para uso diario.',
    'Lúmina',
    true
  )
  ON CONFLICT (slug) DO NOTHING
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'SEED-SKU-006', 'Standard', 89990, 10, true FROM p
ON CONFLICT (sku) DO NOTHING;

WITH p AS (SELECT id FROM productos WHERE slug='metal-minimal-seed-006')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id,'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80'
FROM p
WHERE NOT EXISTS (SELECT 1 FROM imagenes_producto ip WHERE ip.producto_id=p.id);

WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='recetados'),
    'Acetate Premium',
    'acetate-premium-seed-007',
    'Marco de acetato premium con alta durabilidad.',
    'Lúmina',
    true
  )
  ON CONFLICT (slug) DO NOTHING
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'SEED-SKU-007', 'Standard', 99990, 10, true FROM p
ON CONFLICT (sku) DO NOTHING;

WITH p AS (SELECT id FROM productos WHERE slug='acetate-premium-seed-007')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id,'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80'
FROM p
WHERE NOT EXISTS (SELECT 1 FROM imagenes_producto ip WHERE ip.producto_id=p.id);

WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='recetados'),
    'Office Comfort',
    'office-comfort-seed-008',
    'Diseñados para largas jornadas. Comodidad y estilo.',
    'Lúmina',
    true
  )
  ON CONFLICT (slug) DO NOTHING
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'SEED-SKU-008', 'Standard', 74990, 12, true FROM p
ON CONFLICT (sku) DO NOTHING;

WITH p AS (SELECT id FROM productos WHERE slug='office-comfort-seed-008')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id,'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=1200&q=80'
FROM p
WHERE NOT EXISTS (SELECT 1 FROM imagenes_producto ip WHERE ip.producto_id=p.id);

-- CONTACTO
WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='contacto'),
    'SoftLens Daily',
    'softlens-daily-seed-009',
    'Lentes de contacto diarios, confort y fácil adaptación.',
    'Lúmina',
    true
  )
  ON CONFLICT (slug) DO NOTHING
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'SEED-SKU-009', 'Standard', 19990, 50, true FROM p
ON CONFLICT (sku) DO NOTHING;

WITH p AS (SELECT id FROM productos WHERE slug='softlens-daily-seed-009')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id,'https://images.unsplash.com/photo-1582719478185-2c3bb38f7d35?auto=format&fit=crop&w=1200&q=80'
FROM p
WHERE NOT EXISTS (SELECT 1 FROM imagenes_producto ip WHERE ip.producto_id=p.id);

WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='contacto'),
    'SoftLens Monthly',
    'softlens-monthly-seed-010',
    'Lentes mensuales con alta hidratación.',
    'Lúmina',
    true
  )
  ON CONFLICT (slug) DO NOTHING
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'SEED-SKU-010', 'Standard', 24990, 40, true FROM p
ON CONFLICT (sku) DO NOTHING;

WITH p AS (SELECT id FROM productos WHERE slug='softlens-monthly-seed-010')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id,'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80'
FROM p
WHERE NOT EXISTS (SELECT 1 FROM imagenes_producto ip WHERE ip.producto_id=p.id);

WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='contacto'),
    'Solution Care Kit',
    'solution-care-kit-seed-011',
    'Kit de cuidado: solución + estuche.',
    'Lúmina',
    true
  )
  ON CONFLICT (slug) DO NOTHING
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'SEED-SKU-011', 'Standard', 8990, 80, true FROM p
ON CONFLICT (sku) DO NOTHING;

WITH p AS (SELECT id FROM productos WHERE slug='solution-care-kit-seed-011')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id,'https://images.unsplash.com/photo-1615485925873-0c3481b3b404?auto=format&fit=crop&w=1200&q=80'
FROM p
WHERE NOT EXISTS (SELECT 1 FROM imagenes_producto ip WHERE ip.producto_id=p.id);

WITH p AS (
  INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
  VALUES (
    (SELECT id FROM categorias WHERE slug='contacto'),
    'Travel Contact Case',
    'travel-contact-case-seed-012',
    'Estuche compacto para viaje + pinza.',
    'Lúmina',
    true
  )
  ON CONFLICT (slug) DO NOTHING
  RETURNING id
)
INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
SELECT id, 'SEED-SKU-012', 'Standard', 5990, 100, true FROM p
ON CONFLICT (sku) DO NOTHING;

WITH p AS (SELECT id FROM productos WHERE slug='travel-contact-case-seed-012')
INSERT INTO imagenes_producto (producto_id, image_url)
SELECT id,'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80'
FROM p
WHERE NOT EXISTS (SELECT 1 FROM imagenes_producto ip WHERE ip.producto_id=p.id);

COMMIT;
