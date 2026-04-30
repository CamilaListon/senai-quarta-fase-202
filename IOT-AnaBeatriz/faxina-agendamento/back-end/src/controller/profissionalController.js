import db from "../config/db.js";

export const listarProfissionais = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM profissional");
  res.json(rows);
};

export const criarProfissional = async (req, res) => {
  const { nome, disponibilidade } = req.body;

  await db.query(
    "INSERT INTO profissional (nome, disponibilidade) VALUES (?, ?)",
    [nome, disponibilidade]
  );

  res.status(201).json({ message: "Profissional criado" });
};