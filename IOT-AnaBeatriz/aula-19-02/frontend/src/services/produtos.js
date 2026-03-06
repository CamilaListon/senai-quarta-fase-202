import { api } from "./api.js";

// Função auxiliar para pegar headers com token
const authHeader = () => {
  const token = localStorage.getItem("token"); // token salvo no login
  return { Authorization: `Bearer ${token}` };
};

// Buscar produtos
export async function getProdutos() {
  try {
    const response = await api.get("/produto", { headers: authHeader() });
    if (response.status === 200) {
      return response.data.data ?? [];
    }
    return [];
  } catch (error) {
    console.error("Erro ao buscar produtos:", error.response?.data || error.message);
    return [];
  }
}

// Adicionar produto
export async function adicionarProduto(produto) {
  try {
    const response = await api.post("/produto", produto, { headers: authHeader() });
    return response.status === 201;
  } catch (error) {
    console.error("Erro ao adicionar produto:", error.response?.data || error.message);
    return false;
  }
}

// Editar produto
export async function editarProduto(id, produto) {
  try {
    const response = await api.patch(`/produto/${id}`, produto, { headers: authHeader() });
    return response.status === 200;
  } catch (error) {
    console.error("Erro ao editar produto:", error.response?.data || error.message);
    return false;
  }
}

// Excluir produto
export async function excluirProduto(id) {
  try {
    const response = await api.delete(`/produto/${id}`, { headers: authHeader() });
    return response.status === 200;
  } catch (error) {
    console.error("Erro ao excluir produto:", error.response?.data || error.message);
    return false;
  }
}