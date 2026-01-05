// Importações
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

// Configura variáveis de ambiente
dotenv.config();

const app = express();

// Middlewares
app.use(cors({ origin: "*" })); // Permite requisições do frontend
app.use(bodyParser.json()); // Permite receber JSON

// Importa rotas
const operadoresRoutes = require("./routes/operadores");

// Rotas
app.use("/api/operadores", operadoresRoutes);

// Rota de teste raiz
app.get("/", (req, res) => {
    res.send("Servidor rodando!");
});

// Conectar MongoDB Atlas (Mongoose 7+ não precisa de useNewUrlParser ou useUnifiedTopology)
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB conectado com sucesso!"))
    .catch(err => console.error("Erro ao conectar no MongoDB:", err));

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
