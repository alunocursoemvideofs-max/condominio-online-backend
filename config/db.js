const mongoose = require("mongoose");

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB conectado com sucesso!");
    } catch (error) {
        console.error("Erro ao conectar MongoDB:", error);
        process.exit(1);
    }
};

module.exports = conectarDB;
