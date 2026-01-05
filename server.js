const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();

// =======================
// MIDDLEWARES
// =======================
app.use(express.json());

// =======================
// MONGODB
// =======================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado com sucesso!"))
  .catch(err => console.error("Erro ao conectar no MongoDB:", err));

// =======================
// ROTAS DA API
// =======================
app.use("/api/operadores", require("./routes/operadores"));

// =======================
// SERVIR FRONTEND
// =======================
const frontendPath = path.join(__dirname, "frontend");
app.use(express.static(frontendPath));

// LOGIN (rota principal)
app.get("/", (req, res) => {
  res.sendFile(path.join(frontendPath, "login", "index.html"));
});

// DASHBOARD
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(frontendPath, "dashboard", "index.html"));
});

// =======================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
