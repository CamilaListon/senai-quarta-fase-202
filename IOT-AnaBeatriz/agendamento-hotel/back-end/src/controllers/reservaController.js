import { db } from '../config/db.js';
import { verificarDisponibilidade } from '../services/reservaService.js';
import { logAcao } from '../logs/logger.js';

/*
==================================================
CRIAR RESERVA
==================================================
*/

export async function criarReserva(req, res) {

  try {

    const {
      data_checkin,
      data_checkout,
      quarto_id
    } = req.body;

    const usuario_id = req.user.id;

    const disponiveis = await verificarDisponibilidade(
      data_checkin,
      data_checkout
    );

    if (disponiveis <= 0) {

      await logAcao({
        usuario_id,
        tipo: 'OVERBOOKING_TENTATIVA',
        descricao: 'Tentativa de reserva sem disponibilidade'
      });

      return res.status(400).json({
        message: 'Sem disponibilidade'
      });

    }

    const [reserva] = await db.execute(`
      INSERT INTO reservas (
        usuario_id,
        data_checkin,
        data_checkout
      )
      VALUES (?, ?, ?)
    `, [
      usuario_id,
      data_checkin,
      data_checkout
    ]);

    await db.execute(`
      INSERT INTO reserva_quartos (
        reserva_id,
        quarto_id
      )
      VALUES (?, ?)
    `, [
      reserva.insertId,
      quarto_id
    ]);

    await logAcao({
      usuario_id,
      tipo: 'RESERVA',
      descricao: `Reserva criada para quarto ${quarto_id}`,
      reserva_id: reserva.insertId
    });

    return res.status(201).json({
      message: 'Reserva criada'
    });

  } catch (err) {

    return res.status(500).json({
      error: err.message
    });

  }

}

/*
==================================================
LISTAR TODAS RESERVAS
==================================================
*/

export async function listarReservas(req, res) {

  try {

    const [rows] = await db.execute(`
      SELECT
        r.*,
        u.nome,
        rq.quarto_id,
        q.numero AS quarto_numero
      FROM reservas r
      JOIN usuarios u
        ON u.id = r.usuario_id
      LEFT JOIN reserva_quartos rq
        ON rq.reserva_id = r.id
      LEFT JOIN quartos q
        ON q.id = rq.quarto_id
      ORDER BY r.criado_em DESC
    `);

    return res.json(rows);

  } catch (err) {

    return res.status(500).json({
      error: err.message
    });

  }

}

/*
==================================================
QUARTOS DISPONÍVEIS
==================================================
*/

export async function quartosDisponiveis(req, res) {

  try {

    const { inicio, fim } = req.query;

    const [rows] = await db.execute(`
      SELECT *
      FROM quartos
      WHERE status = 'DISPONIVEL'
      AND id NOT IN (

        SELECT rq.quarto_id
        FROM reserva_quartos rq

        JOIN reservas r
          ON r.id = rq.reserva_id

        WHERE r.status = 'ATIVA'

        AND (
          (? BETWEEN r.data_checkin AND r.data_checkout)
          OR
          (? BETWEEN r.data_checkin AND r.data_checkout)
        )

      )
    `, [inicio, fim]);

    return res.json(rows);

  } catch (err) {

    return res.status(500).json({
      error: err.message
    });

  }

}

/*
==================================================
MINHAS RESERVAS
==================================================
*/

export async function minhasReservas(req, res) {

  try {

    const usuario_id = req.user.id;

    const [rows] = await db.execute(`
      SELECT
        r.*,
        rq.quarto_id,
        q.numero AS quarto_numero
      FROM reservas r
      LEFT JOIN reserva_quartos rq
        ON rq.reserva_id = r.id
      LEFT JOIN quartos q
        ON q.id = rq.quarto_id
      WHERE r.usuario_id = ?
      ORDER BY r.criado_em DESC
    `, [usuario_id]);

    return res.json(rows);

  } catch (err) {

    return res.status(500).json({
      error: err.message
    });

  }

}

/*
==================================================
ALTERAR RESERVA
==================================================
*/

export async function alterarReserva(req, res) {

  try {

    const { id } = req.params;

    const {
      data_checkin,
      data_checkout
    } = req.body;

    const usuario_id = req.user.id;

    const [reserva] = await db.execute(`
      SELECT *
      FROM reservas
      WHERE id = ?
      AND usuario_id = ?
    `, [id, usuario_id]);

    if (reserva.length === 0) {

      return res.status(404).json({
        message: 'Reserva não encontrada'
      });

    }

    await db.execute(`
      UPDATE reservas
      SET data_checkin = ?,
          data_checkout = ?
      WHERE id = ?
    `, [
      data_checkin,
      data_checkout,
      id
    ]);

    await logAcao({
      usuario_id,
      tipo: 'ALTERACAO_RESERVA',
      descricao: `Reserva ${id} alterada`,
      reserva_id: id
    });

    return res.json({
      message: 'Reserva atualizada'
    });

  } catch (err) {

    return res.status(500).json({
      error: err.message
    });

  }

}

/*
==================================================
CANCELAR RESERVA
==================================================
*/

export async function cancelarReserva(req, res) {

  try {

    const { id } = req.params;
    const usuario_id = req.user.id;

    const [reserva] = await db.execute(`
      SELECT *
      FROM reservas
      WHERE id = ?
    `, [id]);

    if (reserva.length === 0) {

      return res.status(404).json({
        message: 'Reserva não encontrada'
      });

    }

    await db.execute(`
      UPDATE reservas
      SET status = 'CANCELADA'
      WHERE id = ?
    `, [id]);

    await logAcao({
      usuario_id,
      tipo: 'CANCELAMENTO',
      descricao: `Reserva ${id} cancelada`,
      reserva_id: id
    });

    return res.json({
      message: 'Reserva cancelada'
    });

  } catch (err) {

    return res.status(500).json({
      error: err.message
    });

  }

}