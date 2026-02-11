import express from 'express'
import cors from 'cors'
import mysql2 from 'mysql2'

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

export default app ;