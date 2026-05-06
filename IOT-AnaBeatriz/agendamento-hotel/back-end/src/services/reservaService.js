import { db } from '../config/db.js';

export async function verificarDisponibilidade(dataInicio, dataFim) {
  const [totalQuartos] = await db.execute(
    'SELECT COUNT(*) as total FROM quartos WHERE status = "DISPONIVEL"'
  );

  const [ocupados] = await db.execute(`
    SELECT COUNT(DISTINCT rq.quarto_id) as ocupados
    FROM reserva_quartos rq
    JOIN reservas r ON r.id = rq.reserva_id
    WHERE r.status = 'ATIVA'
    AND (
      (r.data_checkin <= ? AND r.data_checkout >= ?) OR
      (r.data_checkin <= ? AND r.data_checkout >= ?)
    )
  `, [dataInicio, dataInicio, dataFim, dataFim]);

  return totalQuartos[0].total - ocupados[0].ocupados;
}