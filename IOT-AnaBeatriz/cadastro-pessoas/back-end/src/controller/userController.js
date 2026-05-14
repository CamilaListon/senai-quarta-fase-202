import database from "../config/database"


const createUser = async(req, res) = {
    const { nome, email, senha, cpf } = req.body;
    try{
        if(!nome || !email || !senha || !cpf){
            return res.status(400).json({ message: "Todos os campos são obrigatorios" })
        }

        await database.query("INSERT INTO usuario VALUES (?, ?, ?, ?)")
    }
}