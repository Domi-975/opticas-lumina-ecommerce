import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

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
