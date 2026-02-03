-- backend/DB/CLEANUP_OLD_SEEDS.sql
-- Borra SOLO los productos antiguos del seed anterior (sin tocar usuarios/ordenes/carrito).
-- Reglas:
-- - elimina por slugs conocidos del seed anterior (ej: 'lentes-black')
-- - elimina productos de prueba tipo test-prod-*
-- - NO elimina los nuevos del SEED_LENTES_ONLY (que usan -seed-)
-- - NO toca tablas de usuarios/ordenes/carrito/pagos

BEGIN;

-- 1) Armar set de productos a eliminar
WITH to_delete AS (
  SELECT id
  FROM productos
  WHERE
    -- A) Slugs explícitos del seed viejo (ajusta si aparece alguno extra)
    slug IN (
      'lentes-black'
    )
    OR
    -- B) Productos de prueba típicos
    slug ILIKE 'test-prod-%'
    OR
    -- C) Productos que NO son los nuevos seed (estos nuevos llevan -seed-)
    -- y que además son de la marca/semilla vieja
    (marca ILIKE 'lumina original' AND slug NOT LIKE '%-seed-%')
)

-- 2) Borrar imágenes de esos productos
DELETE FROM imagenes_producto ip
USING to_delete d
WHERE ip.producto_id = d.id;

-- 3) Borrar SKUs de esos productos
WITH to_delete AS (
  SELECT id
  FROM productos
  WHERE
    slug IN ('lentes-black')
    OR slug ILIKE 'test-prod-%'
    OR (marca ILIKE 'lumina original' AND slug NOT LIKE '%-seed-%')
)
DELETE FROM sku_productos sp
USING to_delete d
WHERE sp.producto_id = d.id;

-- 4) Borrar productos
WITH to_delete AS (
  SELECT id
  FROM productos
  WHERE
    slug IN ('lentes-black')
    OR slug ILIKE 'test-prod-%'
    OR (marca ILIKE 'lumina original' AND slug NOT LIKE '%-seed-%')
)
DELETE FROM productos p
USING to_delete d
WHERE p.id = d.id;

COMMIT;
