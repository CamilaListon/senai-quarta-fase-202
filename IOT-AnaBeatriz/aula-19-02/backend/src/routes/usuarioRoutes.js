import express from "express";
import { esqueciSenha, redefinirSenha } from "../controller/esqueciSenhaController.js";

const router = express.Router();

router.post("/esqueci-senha", esqueciSenha);
router.patch("/redefinir-senha", redefinirSenha);

export default router;