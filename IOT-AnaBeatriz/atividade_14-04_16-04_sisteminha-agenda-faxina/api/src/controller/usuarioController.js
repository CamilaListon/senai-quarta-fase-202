import db from "../config/db.js";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
  try {
    const { nome, email, senha, tipo_usuario } = req.body;

    // Validação do nome
    if (!nome || nome.length < 5) {
      return res.status(400).json({
        message: "O nome deve conter pelo menos 5 caracteres."
      });
    }

    // Validação do email
    if (!email || email.length < 5) {
      return res.status(400).json({
        message: "O email deve conter pelo menos 5 caracteres."
      });
    }

    // Validação da senha
    const senhaRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,12}$/;
    if (!senhaRegex.test(senha)) {
      return res.status(400).json({
        message: "A senha deve ter 6-12 caracteres, incluir pelo menos uma letra maiúscula, um número e um caractere especial."
      });
    }

    // Criptografar senha
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(senha, saltRounds);

    // Inserir no banco
    const [rows] = await db.query(
      "INSERT INTO usuario (nome, email, password_hash, tipo_usuario, ativo) VALUES (?, ?, ?, ?, ?)",
      [nome, email, hashPassword, tipo_usuario, 1]
    );

    // rows.insertId indica que o insert funcionou
    if (!rows.insertId) {
      return res.status(400).json({ message: "Não foi possível criar o usuário." });
    }

    return res.status(201).json({ message: "Usuário criado com sucesso." });

  } catch (error) {
    console.error("Erro no createUser:", error); // <- log detalhado
    return res.status(500).json({ message: "Erro ao criar usuário.", error: error.message });
  }
};