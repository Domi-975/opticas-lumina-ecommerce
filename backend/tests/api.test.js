import request from 'supertest';
import jwt from 'jsonwebtoken';
import { jest } from '@jest/globals';

// --- Mock DB pool (pg) ---
jest.unstable_mockModule('../DB/config.js', () => {
  return {
    default: {
      query: jest.fn(),
    },
  };
});

const { default: pool } = await import('../DB/config.js');
const { default: app } = await import('../app.js');

describe('Hito 3 - API REST (mínimo 4 rutas + escenarios)', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'test';
    process.env.JWT_SECRET = 'test_secret';
  });

  beforeEach(() => {
    pool.query.mockReset();
  });

  test('GET /products -> 200 y lista de productos', async () => {
    pool.query.mockResolvedValueOnce({
      rowCount: 1,
      rows: [
        {
          id: 10,
          categoria_id: 1,
          nombre_producto: 'Lente X',
          slug: 'lente-x',
          descripcion: 'desc',
          marca: 'Lumina',
          nombre_categoria: 'Sol',
          categoria_slug: 'sol',
          imagenes: ['https://img/1.jpg'],
          precio_min: 19990,
        },
      ],
    });

    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('products');
    expect(res.body.products.length).toBe(1);
  });

  test('GET /products/:slug -> 200 si existe, 404 si no existe', async () => {
    // Existe
    pool.query
      .mockResolvedValueOnce({ rowCount: 1, rows: [{ id: 1, categoria_id: 2, nombre_producto: 'A', slug: 'a', descripcion: 'd', marca: 'm', activo: true }] })
      .mockResolvedValueOnce({ rowCount: 1, rows: [{ id: 2, nombre_categoria: 'Cat', slug: 'cat' }] })
      .mockResolvedValueOnce({ rowCount: 1, rows: [{ image_url: 'https://img/a.jpg' }] })
      .mockResolvedValueOnce({ rowCount: 1, rows: [{ id: 99, sku: 'SKU1', variant_name: 'V1', precio: 100, precio_antes: null, stock: 5, activo: true }] });

    const ok = await request(app).get('/products/a');
    expect(ok.status).toBe(200);
    expect(ok.body).toHaveProperty('product');

    // No existe
    pool.query.mockResolvedValueOnce({ rowCount: 0, rows: [] });
    const notFound = await request(app).get('/products/no-existe');
    expect(notFound.status).toBe(404);
  });

  test('GET /users/profile -> 401 sin token, 200 con token válido', async () => {
    const noToken = await request(app).get('/users/profile');
    expect(noToken.status).toBe(401);

    const token = jwt.sign({ userId: 7, email: 'u@u.com' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    pool.query
      // usuario
      .mockResolvedValueOnce({
        rowCount: 1,
        rows: [{ id: 7, nombre_completo: 'User Test', email: 'u@u.com', telefono: null, direccion: null, fecha_creacion: new Date().toISOString() }],
      })
      // carrito
      .mockResolvedValueOnce({ rowCount: 0, rows: [] })
      // ordenes
      .mockResolvedValueOnce({ rowCount: 0, rows: [] });

    const ok = await request(app)
      .get('/users/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(ok.status).toBe(200);
    expect(ok.body).toHaveProperty('user');
  });

  test('POST /cart/items -> 401 sin token, 400 por body inválido, 200 si agrega item', async () => {
    const noToken = await request(app).post('/cart/items').send({ sku_productos_id: 1, cantidad: 1 });
    expect(noToken.status).toBe(401);

    const token = jwt.sign({ userId: 7, email: 'u@u.com' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const invalid = await request(app)
      .post('/cart/items')
      .set('Authorization', `Bearer ${token}`)
      .send({ sku_productos_id: 1, cantidad: -1 });
    expect(invalid.status).toBe(400);

    // Flujo exitoso
    pool.query
      // sku
      .mockResolvedValueOnce({ rowCount: 1, rows: [{ id: 1, precio: 1000, activo: true, stock: 10 }] })
      // buscar carrito
      .mockResolvedValueOnce({ rowCount: 0, rows: [] })
      // crear carrito
      .mockResolvedValueOnce({ rowCount: 1, rows: [{ id: 55 }] })
      // buscar item existente
      .mockResolvedValueOnce({ rowCount: 0, rows: [] })
      // insertar item
      .mockResolvedValueOnce({ rowCount: 1, rows: [] });

    const ok = await request(app)
      .post('/cart/items')
      .set('Authorization', `Bearer ${token}`)
      .send({ sku_productos_id: 1, cantidad: 2 });

    expect(ok.status).toBe(200);
    expect(ok.body).toHaveProperty('cart_id');
  });
});
