import db from "../config/db.js";

export const listarClientes = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM cliente");
  res.json(rows);
};

export const criarCliente = async (req, res) => {
  const { nome, telefone } = req.body;

  if (!nome) {
    return res.status(400).json({ message: "Nome obrigatório" });
  }

  await db.query(
    "INSERT INTO cliente (nome, telefone) VALUES (?, ?)",
    [nome, telefone]
  );

  res.status(201).json({ message: "Cliente criado" });
};