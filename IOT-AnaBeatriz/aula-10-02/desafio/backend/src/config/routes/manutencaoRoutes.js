import express from "express";
import pool from "../config/db.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { id_veiculo, tipo, descricao, km_registrado } = req.body;

  await pool.query(
    `INSERT INTO manutencao 
     (id_veiculo, data_manutencao, tipo, descricao, km_registrado)
     VALUES (?, CURDATE(), ?, ?, ?)`,
    [id_veiculo, tipo, descricao, km_registrado]
  );

  res.json({ message: "Manutenção registrada" });
});

export default router;
