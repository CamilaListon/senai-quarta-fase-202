import { db } from '../config/db.js';
import { verificarDisponibilidade } from '../services/reservaService.js';
import { logAcao } from '../logs/logger.js';


export async function criarReserva(req, res) {
  try {
    const { data_checkin, data_checkout, quarto_id } = req.body;
    const usuario_id = req.user.id;

    const disponiveis = await verificarDisponibilidade(
      data_checkin,
      data_checkout
    );

    if (disponiveis <= 0) {
      await logAcao({
        usuario_id,
        tipo: 'OVERBOOKING_TENTATIVA',
        descricao: `Tentativa de reserva sem disponibilidade`
      });

      return res.status(400).json({
        message: 'Sem disponibilidade (risco de overbooking)'
      });
    }

    const [reserva] = await db.execute(
      `INSERT INTO reservas (usuario_id, data_checkin, data_checkout)
      VALUES (?, ?, ?)`,
      [usuario_id, data_checkin, data_checkout]
    );

    await db.execute(
      `INSERT INTO reserva_quartos (reserva_id, quarto_id)
      VALUES (?, ?)`,
      [reserva.insertId, quarto_id]
    );

    await logAcao({
      usuario_id,
      tipo: 'RESERVA',
      descricao: `Reserva criada para o quarto ${quarto_id}`,
      reserva_id: reserva.insertId
    });

    res.status(201).json({ message: 'Reserva criada' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export async function listarReservas(req, res) {
  try {
    const [rows] = await db.execute(`
      SELECT r.*, u.nome, rq.quarto_id
      FROM reservas r
      JOIN usuarios u ON u.id = r.usuario_id
      LEFT JOIN reserva_quartos rq ON rq.reserva_id = r.id
      ORDER BY r.criado_em DESC
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export async function quartosDisponiveis(req, res) {
  try {
    const { inicio, fim } = req.query;

    const [rows] = await db.execute(`
      SELECT q.*
      FROM quartos q
      WHERE q.status = 'DISPONIVEL'
      AND q.id NOT IN (
        SELECT rq.quarto_id
        FROM reserva_quartos rq
        JOIN reservas r ON r.id = rq.reserva_id
        WHERE r.status = 'ATIVA'
        AND (
          (r.data_checkin <= ? AND r.data_checkout >= ?) OR
          (r.data_checkin <= ? AND r.data_checkout >= ?)
        )
      )
    `, [inicio, inicio, fim, fim]);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export async function cancelarReserva(req, res) {
  try {
    const { id } = req.params;
    const usuario_id = req.user.id;

    await db.execute(
      `UPDATE reservas SET status = 'CANCELADA' WHERE id = ?`,
      [id]
    );

    await logAcao({
      usuario_id,
      tipo: 'CANCELAMENTO',
      descricao: `Reserva ${id} cancelada`,
      reserva_id: id
    });

    res.json({ message: 'Reserva cancelada' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}