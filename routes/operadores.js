const express = require("express");
const bcrypt = require("bcryptjs");
const Operador = require("../models/Operador");

const router = express.Router();

// Cadastrar operador
router.post("/cadastrar", async (req, res) => {
    const { nome, usuario, email, senha } = req.body;
    try {
        const existe = await Operador.findOne({ usuario });
        if (existe) return res.status(400).json({ msg: "Usuário já existe" });

        const hash = await bcrypt.hash(senha, 10);
        const operador = new Operador({ nome, usuario, email, senha: hash });
        await operador.save();

        res.json({ msg: "Operador cadastrado com sucesso!" });
    } catch (error) {
        res.status(500).json({ msg: "Erro no servidor" });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { usuario, senha } = req.body;
    try {
        const operador = await Operador.findOne({ usuario });
        if (!operador) return res.status(400).json({ msg: "Usuário não encontrado" });

        const senhaValida = await bcrypt.compare(senha, operador.senha);
        if (!senhaValida) return res.status(400).json({ msg: "Senha incorreta" });

        res.json({ 
            msg: "Login realizado com sucesso!", 
            operador: { nome: operador.nome, usuario: operador.usuario } 
        });
    } catch (error) {
        res.status(500).json({ msg: "Erro no servidor" });
    }
});

// Listar operadores
router.get("/", async (req, res) => {
    try {
        const operadores = await Operador.find().select("-senha");
        res.json(operadores);
    } catch (error) {
        res.status(500).json({ msg: "Erro ao buscar operadores" });
    }
});

// Deletar operador
router.delete("/:id", async (req, res) => {
    try {
        await Operador.findByIdAndDelete(req.params.id);
        res.json({ msg: "Operador removido com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao remover operador" });
    }
});

// Editar operador
router.put("/:id", async (req, res) => {
    const { nome, usuario, email, senha } = req.body;
    try {
        const updateData = { nome, usuario, email };
        if (senha) {
            const hash = await bcrypt.hash(senha, 10);
            updateData.senha = hash;
        }
        await Operador.findByIdAndUpdate(req.params.id, updateData);
        res.json({ msg: "Operador atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ msg: "Erro ao atualizar operador" });
    }
});

module.exports = router;
