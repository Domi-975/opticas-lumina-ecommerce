const request = require('supertest');
const app = require('../server');

describe('API Tests', () => {
  let token;

  describe('POST /auth/login', () => {
    it('should return 200 on valid credentials', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'test@example.com', contraseña: 'password123' });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      token = res.body.token;
    });

    it('should return 401 on invalid credentials', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'wrong@example.com', contraseña: 'wrongpass' });
      expect(res.status).toBe(401);
    });

    it('should return 400 on missing fields', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: 'test@example.com' });
      expect(res.status).toBe(400);
    });
  });

  describe('GET /users/profile', () => {
    it('should return 200 with valid token', async () => {
      const res = await request(app)
        .get('/users/profile')
        .set('Authorization', `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    it('should return 401 without token', async () => {
      const res = await request(app)
        .get('/users/profile');
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
      const res = await request(app)
        .get('/products');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('products');
    });
  });

  describe('POST /cart/items', () => {
    it('should return 200 and add item with valid token', async () => {
      const res = await request(app)
        .post('/cart/items')
        .set('Authorization', `Bearer ${token}`)
        .send({ sku_productos: 1, cantidad: 2 });
      expect(res.status).toBe(200);
    });

    it('should return 401 without token', async () => {
      const res = await request(app)
        .post('/cart/items')
        .send({ sku_productos: 1, cantidad: 2 });
      expect(res.status).toBe(401);
    });

    it('should return 400 on invalid input', async () => {
      const res = await request(app)
        .post('/cart/items')
        .set('Authorization', `Bearer ${token}`)
        .send({ sku_productos: 1, cantidad: -1 });
      expect(res.status).toBe(400);
    });
  });
});