import { api } from "./api.js"

/**  
 * Busca lista de produtos no back-end.  
 * O back retorna: { message: string, data: Produto[] }  
 * Aqui devolvemos APENAS o array (data).  
 */

//busca e mostra os produtos
export async function getProdutos() {
  const response = await api.get("/produto");
  if (response.status === 200) {
    return response.data.data ?? [];
  }
  return [];
}


//adicionar produto
export async function adicionarProduto(produto) {
  const response = await api.post("/produto", produto);

  if (response.status === 201)
    return true;

  return false;
}

//editar produto
export async function editarProduto() {
  const response = await api.patch(`/produto/${id}`, produto)

  if (response.status === 200)
    return true;

  return false;
}

//excluir produto
export async function excluirProduto(id) {
  const response = await api.delete(`/produto/${id}`)

  if (response.status === 200)
    return true;

  return false;
}