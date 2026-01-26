export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Acceso denegado. Falta header de autorización",
    });
  }

  next();
}
