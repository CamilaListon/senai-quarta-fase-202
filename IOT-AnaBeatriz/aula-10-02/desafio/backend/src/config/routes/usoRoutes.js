import express from "express";
import pool from "../config/db.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      id_veiculo,
      id_entregador,
      bateria_saida,
      km_saida
    } = req.body;

    await pool.query(
      `INSERT INTO uso_veiculo 
      (id_veiculo, id_entregador, horario_saida, bateria_saida, km_saida)
      VALUES (?, ?, NOW(), ?, ?)`,
      [id_veiculo, id_entregador, bateria_saida, km_saida]
    );

    res.json({ message: "Uso registrado" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
