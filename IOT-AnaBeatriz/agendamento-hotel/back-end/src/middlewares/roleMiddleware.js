export function roleMiddleware(tipoPermitido) {
  return (req, res, next) => {
    if (req.user.tipo !== tipoPermitido) {
      return res.status(403).json({ message: 'Acesso negado' });
    }
    next();
  };
}