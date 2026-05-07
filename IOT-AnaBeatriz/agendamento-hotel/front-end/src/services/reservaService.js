import api from '../api/api.js';

/*
==================================================
QUARTOS DISPONÍVEIS
==================================================
*/

export async function getQuartosDisponiveis(
  inicio,
  fim
) {

  const response = await api.get(
    `/reservas/disponiveis?inicio=${inicio}&fim=${fim}`
  );

  return response.data;

}

/*
==================================================
CRIAR RESERVA
==================================================
*/

export async function criarReserva(data) {

  const response = await api.post(
    '/reservas',
    data
  );

  return response.data;

}

/*
==================================================
MINHAS RESERVAS
==================================================
*/

export async function minhasReservas() {

  const response = await api.get(
    '/reservas/minhas'
  );

  return response.data;

}

/*
==================================================
ALTERAR RESERVA
==================================================
*/

export async function alterarReserva(id, data) {

  const response = await api.put(
    `/reservas/${id}`,
    data
  );

  return response.data;

}

/*
==================================================
CANCELAR RESERVA
==================================================
*/

export async function cancelarReserva(id) {

  const response = await api.delete(
    `/reservas/${id}`
  );

  return response.data;

}