import { api } from "./api";

export async function listarClientes() {
  const res = await api.get("/clientes");
  return res.data;
}

export async function criarCliente(data) {
  await api.post("/clientes", data);
}