import { useState, useEffect } from "react";
import { getProdutos } from "../services/produto";

function Produto() {

  const [produtos, setProdutos] = useState([])

  const carregaProduto = async () => {

    try {
      const lista = await getProdutos();
      setProdutos(lista)
    } catch (error) {
      console.log("Deu erro na treta toda: ", error);
    }
  }

  useEffect(() => {
    carregaProduto();
  }, [])

  return (
    <>
      <h1>Lanches</h1>

      <button className="btn btn-danger">Adicionar</button>

      <table>
        <thead>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Valor</th>
          <th>Ações</th>
        </thead>
      </table>
      <tbody>
        {
          produtos.map((p) => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>{p.descricao}</td>
              <td>{p.valor}</td>
            </tr>
          ))
        }
      </tbody>
    </>
  )
}

export default Produto;