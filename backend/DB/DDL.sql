CREATE TABLE usuarios(
    id SERIAL PRIMARY KEY,
    nombre_completo VARCHAR(80) NOT NULL,
    email VARCHAR(80) NOT NULL,
    contrasena VARCHAR(80) NOT NULL, 
    telefono VARCHAR(20),
    direccion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    categoria_id INT REFERENCES categorias(id),
    nombre_producto VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    descripcion TEXT,
    marca VARCHAR(100),
    activo BOOLEAN DEFAULT true
);

CREATE TABLE imagenes_producto (
    id SERIAL PRIMARY KEY,
    producto_id INT REFERENCES productos(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL
);

CREATE TABLE sku_productos (
    id SERIAL PRIMARY KEY,
    producto_id INT REFERENCES productos(id) ON DELETE CASCADE,
    sku VARCHAR(50) UNIQUE NOT NULL,
    variant_name VARCHAR(100),
    precio NUMERIC(10,2) NOT NULL,
    precio_antes NUMERIC(10,2),
    stock INT DEFAULT 0,
    activo BOOLEAN DEFAULT true
);
CREATE TABLE carrito (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES usuarios(id),
    status VARCHAR(50),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE items_carrito (
    id SERIAL PRIMARY KEY,
    carrito_id INT REFERENCES carrito(id) ON DELETE CASCADE,
    sku_productos_id INT REFERENCES sku_productos(id),
    cantidad INT NOT NULL,
    precio_unitario NUMERIC(10,2) NOT NULL
);
CREATE TABLE ordenes_compra (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES usuarios(id),
    status VARCHAR(50),
    moneda VARCHAR(10),
    subtotal NUMERIC(10,2),
    costo_envio NUMERIC(10,2),
    descuento NUMERIC(10,2),
    total NUMERIC(10,2),
    direccion_envio TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pagos (
    id SERIAL PRIMARY KEY,
    orden_id INT REFERENCES ordenes_compra(id),
    metodo_pago VARCHAR(50),
    status VARCHAR(50),
    monto NUMERIC(10,2),
    numero_transaccion VARCHAR(100),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);