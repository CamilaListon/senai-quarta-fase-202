import { db } from '../config/db.js';

export async function logAcao({
  usuario_id = null,
  tipo,
  descricao,
  reserva_id = null
}) {
  try {
    await db.execute(
      `INSERT INTO movimentacoes (usuario_id, tipo, descricao, reserva_id)
      VALUES (?, ?, ?, ?)`,
      [usuario_id, tipo, descricao, reserva_id]
    );
  } catch (err) {
    console.error('Erro ao salvar log:', err.message);
  }
}