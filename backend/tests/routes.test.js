import request from 'supertest';
import app from '../app.js';

describe('API Tests (routes.test.js)', () => {
  let token;

  // Antes de probar login, registramos el usuario (si ya existe, no rompe)
  beforeAll(async () => {
    const email = 'test@example.com';
    const password = 'password123';

    await request(app).post('/auth/register').send({
      nombre_completo: 'Test User',
      email,
      password,
    });

    const loginRes = await request(app).post('/auth/login').send({
      email,
      password,
    });

    token = loginRes.body?.token;
  });

  describe('POST /auth/login', () => {
    it('should return 200 on valid credentials', async () => {
      const res = await request(app).post('/auth/login').send({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should return 401 on invalid credentials', async () => {
      const res = await request(app).post('/auth/login').send({
        email: 'wrong@example.com',
        password: 'wrongpass',
      });

      expect([400, 401]).toContain(res.status); // algunas implementaciones dan 400
    });

    it('should return 400 on missing fields', async () => {
      const res = await request(app).post('/auth/login').send({
        email: 'test@example.com',
      });

      expect(res.status).toBe(400);
    });
  });

  describe('GET /users/profile', () => {
    it('should return 200 with valid token', async () => {
      const res = await request(app)
        .get('/users/profile')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('user');
    });

    it('should return 401 without token', async () => {
      const res = await request(app).get('/users/profile');
      expect(res.status).toBe(401);
    });

    it('should return 401 with invalid token', async () => {
      const res = await request(app)
        .get('/users/profile')
        .set('Authorization', 'Bearer invalidtoken');

      expect(res.status).toBe(401);
    });
  });

  describe('GET /products', () => {
    it('should return 200 and list products', async () => {
      const res = await request(app).get('/products');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('products');
      expect(Array.isArray(res.body.products)).toBe(true);
    });
  });

  describe('POST /cart/items', () => {
    it('should return 200 and add item with valid token', async () => {
      const res = await request(app)
        .post('/cart/items')
        .set('Authorization', `Bearer ${token}`)
        .send({ sku_productos_id: 1, cantidad: 2 });

      // según tu implementación, puede ser 200 o 201
      expect([200, 201]).toContain(res.status);
    });

    it('should return 401 without token', async () => {
      const res = await request(app)
        .post('/cart/items')
        .send({ sku_productos_id: 1, cantidad: 2 });

      expect(res.status).toBe(401);
    });

    it('should return 400 on invalid input', async () => {
      const res = await request(app)
        .post('/cart/items')
        .set('Authorization', `Bearer ${token}`)
        .send({ sku_productos_id: 1, cantidad: -1 });

      expect(res.status).toBe(400);
    });
  });
});
