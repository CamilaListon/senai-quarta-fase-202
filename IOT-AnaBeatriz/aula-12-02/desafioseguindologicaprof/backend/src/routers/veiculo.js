import express from "express";
const router = express.Router();
import db from '../config/db.js'

router.get("/", async (req, res) => {
  const [results] = await db.query("SELECT * FROM veiculo");
  res.send(results); //envia para o navegador
});

export default router;