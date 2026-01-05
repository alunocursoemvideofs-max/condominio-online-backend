const mongoose = require("mongoose");

const operadorSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    usuario: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Operador", operadorSchema);
