import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token não fornecido."
      });
    }

    const partes = authHeader.split(" ");

    if (partes.length !== 2) {
      return res.status(401).json({
        message: "Formato de token inválido."
      });
    }

    const token = partes[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = {
      id: decoded.sub,
      tipo_usuario: decoded.tipo_usuario
    };

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Token inválido ou expirado."
    });
  }
};