import express from "express";
import pool from "../config/db.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM veiculo");
  res.json(rows);
});

router.post("/", authMiddleware, async (req, res) => {
  const { placa, modelo, tipo, capacidade_carga } = req.body;

  await pool.query(
    "INSERT INTO veiculo (placa, modelo, tipo, capacidade_carga) VALUES (?, ?, ?, ?)",
    [placa, modelo, tipo, capacidade_carga]
  );

  res.json({ message: "Veículo criado" });
});

export default router;
