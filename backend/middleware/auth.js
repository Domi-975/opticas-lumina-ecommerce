import jwt from 'jsonwebtoken';

function getJwtSecret() {
  return process.env.JWT_SECRET ||
    'e9f1a4c3d7b8f2e1c4a9d3e5f6b7a8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4';
}

/**
 * Middleware de autorización basado en JWT.
 * Espera: Authorization: Bearer <token>
 */
export function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ message: 'Token requerido' });
  }

  const token = header.slice(7).trim();
  try {
    const payload = jwt.verify(token, getJwtSecret());
    req.user = payload; // { userId, email, ... }
    return next();
  } catch {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}
