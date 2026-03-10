import db from "../config/db.js";
import bcrypt from "bcrypt";

export const esqueciSenha = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email é obrigatório." });
    }

    const [rows] = await db.query(
      "SELECT id, email FROM usuario WHERE email = ? LIMIT 1",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Email não encontrado." });
    }

    return res.status(200).json({
      message: "Email encontrado. Pode prosseguir para redefinir a senha.",
      userId: rows[0].id
    });

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao verificar email.",
      error: error.message
    });
  }
};



export const redefinirSenha = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        message: "Email e nova senha são obrigatórios."
      });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const [result] = await db.query(
      "UPDATE usuario SET password_hash = ? WHERE email = ?",
      [senhaHash, email]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Usuário não encontrado."
      });
    }

    return res.status(200).json({
      message: "Senha redefinida com sucesso."
    });

  } catch (error) {
    return res.status(500).json({
      message: "Erro ao redefinir senha.",
      error: error.message
    });
  }
};