// server.js
import express from "express";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, "frontend")));

// Rota raiz → login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "login", "index.html"));
});

// Importar rotas de operadores (se existir)
import operadoresRoutes from "./routes/operadores.js";
app.use("/api/operadores", operadoresRoutes);

// Conectar ao MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado com sucesso!"))
  .catch((err) => console.log("Erro ao conectar no MongoDB:", err));

// Start do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
