import express from 'express';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import reservaRoutes from './routes/reservaRoutes.js';
import { requestLogger } from './middlewares/requestLogger.js';
import logsRoutes from './routes/logsRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());


app.use(requestLogger);

app.use('/auth', authRoutes);
app.use('/reservas', reservaRoutes);

app.use('/logs', logsRoutes);

export default app;