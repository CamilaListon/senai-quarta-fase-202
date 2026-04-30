import db from "../config/db.js";

export const listarAgendamentos = async (req, res) => {
  const [rows] = await db.query(`
    SELECT a.*, c.nome AS cliente, p.nome AS profissional
    FROM agendamento a
    JOIN cliente c ON a.cliente_id = c.id
    JOIN profissional p ON a.profissional_id = p.id
    ORDER BY data_hora ASC
  `);

  res.json(rows);
};

export const criarAgendamento = async (req, res) => {
  const { cliente_id, profissional_id, data_hora, tipo } = req.body;

  const [conflito] = await db.query(
    `SELECT * FROM agendamento 
    WHERE profissional_id = ? AND data_hora = ?`,
    [profissional_id, data_hora]
  );

  if (conflito.length > 0) {
    return res.status(400).json({
      message: "Conflito de horário para este profissional."
    });
  }

  await db.query(
    `INSERT INTO agendamento 
    (cliente_id, profissional_id, data_hora, tipo)
    VALUES (?, ?, ?, ?)`,
    [cliente_id, profissional_id, data_hora, tipo]
  );

  res.status(201).json({ message: "Agendamento criado" });
};

export const deletarAgendamento = async (req, res) => {
  const { id } = req.params;

  await db.query("DELETE FROM agendamento WHERE id = ?", [id]);

  res.json({ message: "Agendamento removido" });
};