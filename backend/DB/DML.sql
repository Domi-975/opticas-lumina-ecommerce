INSERT INTO categorias (nombre_categoria, slug)
VALUES ('lentes de sol', 'lentes-de-sol');

INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca)
VALUES (1, 'Lentes Black', 'lentes-black', 'Lentes de sol polarizados', 'Lumina original');

INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock)
VALUES (1, 'LentesBlack', 'Negro', 20501, 15);