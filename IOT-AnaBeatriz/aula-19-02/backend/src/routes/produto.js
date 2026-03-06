import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

import {
  getProdutos,
  editarProduto,
  excluirProduto,
  adicionarProduto
} from "../controller/produtoController.js";

router.get("/produto", authMiddleware, getProdutos);
router.post("/produto", authMiddleware, adicionarProduto);
router.patch("/produto/:id", authMiddleware, editarProduto);
router.delete("/produto/:id", authMiddleware, excluirProduto);

export default router;