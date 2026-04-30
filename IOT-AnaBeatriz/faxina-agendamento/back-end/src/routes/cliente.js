import express from "express";
import { listarClientes, criarCliente } from "../controller/clienteController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/clientes", authMiddleware, listarClientes);
router.post("/clientes", authMiddleware, criarCliente);

export default router;