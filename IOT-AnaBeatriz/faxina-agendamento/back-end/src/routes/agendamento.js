import express from "express";
import {
  listarAgendamentos,
  criarAgendamento,
  deletarAgendamento
} from "../controller/agendamentoController.js";

import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/agendamentos", authMiddleware, listarAgendamentos);
router.post("/agendamentos", authMiddleware, criarAgendamento);
router.delete("/agendamentos/:id", authMiddleware, deletarAgendamento);

export default router;