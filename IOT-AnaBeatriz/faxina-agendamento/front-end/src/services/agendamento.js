import { api } from "./api";

export async function listarAgendamentos() {
  const res = await api.get("/agendamentos");
  return res.data;
}

export async function criarAgendamento(data) {
  await api.post("/agendamentos", data);
}

export async function deletarAgendamento(id) {
  await api.delete(`/agendamentos/${id}`);
}