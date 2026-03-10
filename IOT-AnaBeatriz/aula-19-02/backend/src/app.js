import express from "express";
import cors from "cors";
import router from "./routes/produto.js";
import routerUser from "./routes/usuario.js";
import routerLogin from "./routes/login.js";
import routerSenha from "./routes/usuarioRoutes.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use(routerUser);
app.use(routerLogin);
app.use("/usuario", routerSenha);
app.use(router);

export { app };