import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'e9f1a4c3d7b8f2e1c4a9d3e5f6b7a8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4';

export function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Token requerido' });
    }

    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { userId, email, iat, exp }
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}
