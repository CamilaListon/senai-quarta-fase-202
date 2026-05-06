import { logAcao } from '../logs/logger.js';

export function requestLogger(req, res, next) {
  const start = Date.now();

  res.on('finish', async () => {
    const tempo = Date.now() - start;

    await logAcao({
      usuario_id: req.user?.id || null,
      tipo: 'REQUEST',
      descricao: `${req.method} ${req.originalUrl} - ${res.statusCode} - ${tempo}ms`
    });
  });

  next();
}