import express from "express";
import {
  listarProfissionais,
  criarProfissional
} from "../controller/profissionalController.js";

import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/profissionais", authMiddleware, listarProfissionais);
router.post("/profissionais", authMiddleware, criarProfissional);

export default router;