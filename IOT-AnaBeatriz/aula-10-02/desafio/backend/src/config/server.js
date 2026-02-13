import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import veiculoRoutes from "./routes/veiculoRoutes.js";
import usoRoutes from "./routes/usoRoutes.js";
import manutencaoRoutes from "./routes/manutencaoRoutes.js";
import relatorioRoutes from "./routes/relatorioRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/veiculos", veiculoRoutes);
app.use("/api/uso-veiculo", usoRoutes);
app.use("/api/manutencao", manutencaoRoutes);
app.use("/api/relatorio", relatorioRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Servidor rodando na porta ${process.env.PORT}`)
);
