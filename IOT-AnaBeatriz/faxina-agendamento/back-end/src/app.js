import express from "express";
import cors from "cors";

import routerUser from "./routes/usuario.js";
import routerLogin from "./routes/login.js";
import routerCliente from "./routes/cliente.js";
import routerProfissional from "./routes/profissional.js";
import routerAgendamento from "./routes/agendamento.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

app.use(routerUser);
app.use(routerLogin);
app.use(routerCliente);
app.use(routerProfissional);
app.use(routerAgendamento);

export { app };