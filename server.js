const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());

// Serve arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, "frontend")));

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado com sucesso!"))
  .catch(err => console.log("Erro ao conectar no MongoDB:", err));

// Rotas da API
const operadoresRoutes = require("./routes/operadores");
app.use("/api/operadores", operadoresRoutes);

// Rota raiz serve o login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "login", "index.html"));
});

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
