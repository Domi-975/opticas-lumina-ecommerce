import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Acceso denegado. Falta header Authorization",
    });
  }

  // Esperamos: "Bearer TOKEN"
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      message: "Formato inválido. Usa: Authorization: Bearer <token>",
    });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({
      message: "Configuración inválida: falta JWT_SECRET en el servidor",
    });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // ej: { userId, email, iat, exp }
    return next();
  } catch (err) {
    return res.status(401).json({
      message: "Token inválido o expirado",
    });
  }
}
