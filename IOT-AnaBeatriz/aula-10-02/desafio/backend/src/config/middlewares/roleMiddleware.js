export const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.perfil)) {
      return res.status(403).json({ message: "Acesso negado" });
    }
    next();
  };
};
