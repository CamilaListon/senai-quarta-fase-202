import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        message: "Email e senha são obrigatorios"
      });
    }

    const [rows] = await db.query("SELECT id, nome, email, password_hash, tipo_usuario, ativo FROM usuario WHERE email = ? LIMIT 1", [email]);

    if (rows.length === 0) {
      return res.status(401).json({
        message: "Email ou senha invalidos"
      });
    }

    const usuario = rows[0];

    if (!usuario.ativo) {
      return res.status(403).json({
        message: "Usuario inativo"
      });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.password_hash);

    if (!senhaValida) {
      return res.status(401).json({
        message: "Email ou senha invalidos"
      });
    }

    const token = jwt.sign(
      {
        sub: usuario.id,
        nome: usuario.nome,
        tipo_usuario: usuario.tipo_usuario
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login realizado com sucesso",
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipo_usuario: usuario.tipo_usuario
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro interno no login", error: error.message
    });
  }
};