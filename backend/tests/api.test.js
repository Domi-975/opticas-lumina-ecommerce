import request from 'supertest';
import app from '../app.js';
import pool from '../DB/config.js';

describe('Hito 3 - API REST tests', () => {
  let token;
  let slug;
  let skuId;
  let cartItemId;

  beforeAll(async () => {
    // Crear un producto + sku único para tests (evitar choques de UNIQUE)
    const stamp = Date.now();
    slug = `test-prod-${stamp}`;
    const sku = `TEST-SKU-${stamp}`;

    // Categoria (si no existe, crear una)
    const cat = await pool.query(
      `INSERT INTO categorias (nombre_categoria, slug)
       VALUES ($1, $2)
       RETURNING id`,
      [`TestCat ${stamp}`, `testcat-${stamp}`]
    );
    const catId = cat.rows[0].id;

    const prod = await pool.query(
      `INSERT INTO productos (categoria_id, nombre_producto, slug, descripcion, marca, activo)
       VALUES ($1, $2, $3, $4, $5, true)
       RETURNING id`,
      [catId, `Producto Test ${stamp}`, slug, 'desc', 'Lumina']
    );
    const prodId = prod.rows[0].id;

    const skuRes = await pool.query(
      `INSERT INTO sku_productos (producto_id, sku, variant_name, precio, stock, activo)
       VALUES ($1, $2, $3, $4, $5, true)
       RETURNING id`,
      [prodId, sku, 'Negro', 19990, 10]
    );
    skuId = skuRes.rows[0].id;
  });

  afterAll(async () => {
    // Cerrar conexiones
    await pool.end();
  });

  test('POST /auth/register -> 201', async () => {
    const stamp = Date.now();
    const res = await request(app)
      .post('/auth/register')
      .send({
        nombre_completo: 'Ignacio Test',
        email: `ignacio_test_${stamp}@lumina.cl`,
        password: '123456',
      });

    expect(res.status).toBe(201);
  });

  test('POST /auth/login -> 200 y token', async () => {
    // Creamos usuario fijo para este login:
    const stamp = Date.now();
    const email = `login_test_${stamp}@lumina.cl`;

    await request(app).post('/auth/register').send({
      nombre_completo: 'Login Test',
      email,
      password: '123456',
    });

    const res = await request(app).post('/auth/login').send({
      email,
      password: '123456',
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  test('GET /products -> 200', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('products');
  });

  test('GET /products/:slug -> 200', async () => {
    const res = await request(app).get(`/products/${slug}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('product');
  });

  test('GET /users/profile sin token -> 401', async () => {
    const res = await request(app).get('/users/profile');
    expect(res.status).toBe(401);
  });

  test('POST /cart/items con token -> 200', async () => {
    const res = await request(app)
      .post('/cart/items')
      .set('Authorization', `Bearer ${token}`)
      .send({ sku_productos_id: skuId, cantidad: 2 });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('cart');
    cartItemId = res.body.cart.items?.[0]?.id;
  });

  test('PUT /cart/items/:itemId -> 200', async () => {
    const res = await request(app)
      .put(`/cart/items/${cartItemId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ cantidad: 3 });

    expect(res.status).toBe(200);
  });

  test('DELETE /cart/items/:itemId -> 200', async () => {
    const res = await request(app)
      .delete(`/cart/items/${cartItemId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
  });
});
