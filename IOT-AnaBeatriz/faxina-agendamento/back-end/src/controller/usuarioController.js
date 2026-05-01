import db from "../config/db.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const { nome, email, senha, tipo_usuario } = req.body;

    if (!nome || nome.length < 5) {
      return res.status(400).json({
        message: "Nome deve ter pelo menos 5 caracteres."
      });
    }

    if (!email || !email.includes("@")) {
      return res.status(400).json({
        message: "Email inválido."
      });
    }

    const senhaRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/;
    if (!senhaRegex.test(senha)) {
      return res.status(400).json({
        message:
          "Senha deve ter 6-12 caracteres, com maiúscula, número e símbolo."
      });
    }

    const [existe] = await db.query(
      "SELECT id FROM usuario WHERE email = ?",
      [email]
    );

    if (existe.length > 0) {
      return res.status(400).json({
        message: "Email já cadastrado."
      });
    }

    const hash = await bcrypt.hash(senha, 10);

    const [result] = await db.query(
      `INSERT INTO usuario 
      (nome, email, password_hash, tipo_usuario, ativo) 
      VALUES (?, ?, ?, ?, ?)`,
      [nome, email, hash, tipo_usuario || "1", 1]
    );

    return res.status(201).json({
      message: "Usuário criado com sucesso.",
      usuario: {
        id: result.insertId,
        nome,
        email
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao criar usuário.",
      error: error.message
    });
  }
};