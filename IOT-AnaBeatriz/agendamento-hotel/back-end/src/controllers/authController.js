import { db } from '../config/db.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/generateToken.js';
import { logAcao } from '../logs/logger.js';


export async function register(req, res) {
  try {
    const { nome, email, senha, tipo } = req.body;

    const hash = await bcrypt.hash(senha, 10);

    const [result] = await db.execute(
      'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)',
      [nome, email, hash, tipo]
    );

    await logAcao({
      usuario_id: result.insertId,
      tipo: 'REGISTER',
      descricao: `Usuário criado: ${nome}`
    });

    res.status(201).json({ message: 'Usuário criado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



export async function login(req, res) {
  try {
    const { email, senha } = req.body;

    const [rows] = await db.execute(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    const user = rows[0];

    const match = await bcrypt.compare(senha, user.senha);

    if (!match) {
      return res.status(400).json({ message: 'Senha inválida' });
    }

    const token = generateToken(user);

    await logAcao({
      usuario_id: user.id,
      tipo: 'LOGIN',
      descricao: `Usuário logado: ${email}`
    });

    res.json({ token, user: { id: user.id, tipo: user.tipo } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}