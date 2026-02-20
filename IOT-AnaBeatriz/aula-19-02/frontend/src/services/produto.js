import { api } from "./api"

export async function getProdutos() {
  const response = await api.get("/produto");
  if (response.status === 200)
    if (response.data)
      return response.data;
}