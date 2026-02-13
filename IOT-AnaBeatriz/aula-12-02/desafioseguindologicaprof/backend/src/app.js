import express from 'express'
import cors from 'cors'
const app = express();

//importando a rota veiculo
import router from "./routers/veiculo.js"

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//endpoints
app.use("/veiculo", router)

export default app;