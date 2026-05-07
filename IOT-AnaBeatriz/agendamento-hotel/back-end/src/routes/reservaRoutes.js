import express from 'express';

import {
  criarReserva,
  listarReservas,
  quartosDisponiveis,
  cancelarReserva,
  minhasReservas,
  alterarReserva
} from '../controllers/reservaController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = express.Router();

/*
==================================================
CLIENTE
==================================================
*/

// 🔍 QUARTOS DISPONÍVEIS
router.get(
  '/disponiveis',
  authMiddleware,
  quartosDisponiveis
);

// 📅 CRIAR RESERVA
router.post(
  '/',
  authMiddleware,
  roleMiddleware('CLIENTE'),
  criarReserva
);

// 👤 MINHAS RESERVAS
router.get(
  '/minhas',
  authMiddleware,
  roleMiddleware('CLIENTE'),
  minhasReservas
);

// ✏️ ALTERAR RESERVA
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware('CLIENTE'),
  alterarReserva
);

// ❌ CANCELAR
router.delete(
  '/:id',
  authMiddleware,
  cancelarReserva
);

/*
==================================================
FUNCIONÁRIO
==================================================
*/

// 📊 TODAS RESERVAS
router.get(
  '/',
  authMiddleware,
  roleMiddleware('FUNCIONARIO'),
  listarReservas
);

export default router;