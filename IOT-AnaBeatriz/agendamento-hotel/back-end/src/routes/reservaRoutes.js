import express from 'express';

import {
  criarReserva,
  listarReservas,
  quartosDisponiveis,
  cancelarReserva
} from '../controllers/reservaController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = express.Router();


router.get(
  '/disponiveis',
  authMiddleware,
  quartosDisponiveis
);


router.post(
  '/',
  authMiddleware,
  roleMiddleware('CLIENTE'),
  criarReserva
);


router.get(
  '/',
  authMiddleware,
  roleMiddleware('FUNCIONARIO'),
  listarReservas
);


router.delete(
  '/:id',
  authMiddleware,
  cancelarReserva
);

export default router;