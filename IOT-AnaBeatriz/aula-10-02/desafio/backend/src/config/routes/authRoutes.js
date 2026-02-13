import express from "express";
import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  const [rows] = await pool.query("SELECT * FROM usuario WHERE email = ?", [email]);

  if (rows.length === 0)
    return res.status(404).json({ message: "Usuário não encontrado" });

  const usuario = rows[0];

  const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
  if (!senhaValida)
    return res.status(401).json({ message: "Senha inválida" });

  const token = jwt.sign(
    { id: usuario.id_usuario, perfil: usuario.perfil },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.json({ token });
});

export default router;
