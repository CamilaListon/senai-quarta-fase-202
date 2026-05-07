import { db } from '../config/db.js';

export async function listarLogs(req, res) {

  try {

    const [rows] = await db.execute(`
      SELECT
        m.*,
        u.nome
      FROM movimentacoes m
      LEFT JOIN usuarios u
        ON u.id = m.usuario_id
      ORDER BY m.data_operacao DESC
    `);

    return res.json(rows);

  } catch (err) {

    return res.status(500).json({
      error: err.message
    });

  }

}