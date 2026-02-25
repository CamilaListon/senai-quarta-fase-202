import db from '../config/db.js'

const getProdutos = async (req, res) => {
  try {

    const [results] = await db.query("SELECT id, nome, descricao, valor FROM produto");

    if (results.length === 0)
      return res.status(404).json({ message: "Produto não encontrado" })

    return res.status(200).json({ message: "Produtos encontrados com sucesso", data: results })

  } catch (error) {
    return res.status(400).json({ message: "Erro ao buscar os produtos" })
  }
}

const editarProduto = async (req, res) => {
  try {
    const nomeProduto = req.body.nome;
    const descicao = req.body.descricao;
    const valor = req.body.valor
    const id = req.params.id;

    const [resultado] = await db.query("UPDATE produto SET nome = ?, valor = ?, descricao = ? WHERE id = ?", [nomeProduto, descicao, valor, id]);

    if (resultado.affectedRows === 0)
      return res.status(400).json({ message: "Produto não encontrado" })

    return res.status(200).json({ message: "Produto atualizado com sucesso" })

  } catch (error) {
    return res.status(400).json({ message: "Erro ao editar produto.", error: error.message })
  }
}

const excluirProduto = async (req, res) => {
  try {
    const id = req.params.id;
    const [resultado] = await db.query("DELETE FROM produto WHERE id = ?", [id]);

    if (resultado.affectedRows === 0) //se o produto não foi afetado
      return res.status(400).json({ message: "Produto não encontrado" })

    return res.status(200).json({ message: "Produto excluido com sucesso" })

  } catch (error) {
    return res.status(400).json({ message: "Erro ao excluir produto.", error: error.message })

  }
}

const adicionarProduto = async (req, res) => {
  try {
    const nomeProduto = req.body.nome;
    const descicao = req.body.descricao;
    const valor = req.body.valor

    const [resultado] = await db.query("INSERT INTO produto (nome, descricao, valor) VALUES (?, ?,? )", [req.body.nome, req.body.descricao, req.body.valor]);

    if (resultado.affectedRows === 0) //se o produto não foi afetado
      return res.status(400).json({ message: "Produto não foi criado" })

    return res.status(201).json({ message: "Produto criado com sucesso" })

  } catch (error) {
    return res.status(400).json({ message: "Erro ao criar produto.", error: error.message })
  }
}

export { getProdutos, editarProduto, excluirProduto, adicionarProduto };