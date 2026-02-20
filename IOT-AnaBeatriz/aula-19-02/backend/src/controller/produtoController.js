import db from '../config/db.js'

const getProdutos = async (req, res) => {
  try {

    const [results] = await db.query("SELECT id, nome, descricao, valor FROM produto");

    if (results.length === 0)
      return res.status(404).json({ message: "Produto não encontrado" })

    return res.status(200).json({ message: "Produtos encontrados com sucesso", data: results})

  } catch (error) {
    return res.status(400).json({ message: "Erro ao buscar os produtos" })
  }

}

export { getProdutos };