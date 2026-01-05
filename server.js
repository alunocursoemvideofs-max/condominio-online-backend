const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ========================
// MIDDLEWARES
// ========================
app.use(cors());
app.use(express.json());

// ========================
// ROTA RAIZ (TESTE RENDER)
// ========================
app.get("/", (req, res) => {
  res.send("🚀 API Condomínio Online está funcionando!");
});

// ========================
// ROTAS
// ========================
const operadoresRoutes = require("./routes/operadores");
app.use("/api/operadores", operadoresRoutes);

// ========================
// CONEXÃO COM MONGODB
// ========================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao conectar no MongoDB:", err);
  });

// ========================
// INICIAR SERVIDOR
// ========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
