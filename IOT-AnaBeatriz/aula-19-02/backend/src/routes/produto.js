import { Router } from "express";
const router = Router();

import { getProdutos, editarProduto, excluirProduto, adicionarProduto } from '../controller/produtoController.js'


router.get('/produto', getProdutos);
router.patch('/produto/:id', editarProduto);
router.post('/produto/', adicionarProduto);
router.delete('/produto/:id', excluirProduto);

export default router;