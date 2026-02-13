import express from "express";
import pool from "../config/db.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/eficiencia", authMiddleware, async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM relatorio_eficiencia");
  res.json(rows);
});

export default router;
