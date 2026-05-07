import express from 'express';

import { listarLogs } from '../controllers/logsController.js';

import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleMiddleware } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// 📜 SOMENTE FUNCIONÁRIO
router.get(
  '/',
  authMiddleware,
  roleMiddleware('FUNCIONARIO'),
  listarLogs
);

export default router;