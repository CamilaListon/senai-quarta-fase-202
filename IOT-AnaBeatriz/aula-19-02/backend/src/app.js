import express from "express";
import cors from "cors";
import router from "./routes/produto.js";
import routerUser from "./routes/usuario.js";
import routerLogin from "./routes/login.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // ou a porta do seu React dev server
    credentials: true
}));
app.use(express.json());
app.use(routerUser);
app.use(routerLogin);


app.use(router);



export { app };