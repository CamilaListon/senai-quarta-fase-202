const API_URL = 'http://localhost:3000';

export async function getQuartosDisponiveis(token, data_inicio, data_fim) {
  const res = await fetch(
    `${API_URL}/reservas/disponiveis?inicio=${data_inicio}&fim=${data_fim}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.json();
}

export async function criarReserva(token, body) {
  const res = await fetch(`${API_URL}/reservas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });

  return res.json();
}

export async function cancelarReserva(token, id) {
  const res = await fetch(`${API_URL}/reservas/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.json();
}