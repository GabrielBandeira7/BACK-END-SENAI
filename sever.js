const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const cors = require("cors")
const bcrypt = require("bcrypt")
const { log } = require("console")

const app = express()
const  PORT =  3000

app.use(cors())
app.use(express.json())

//Criar um banco sqlite e tabela
const db = new sqlite3.Database("./database.db")

db.run(`CREATE TABLE IF NOT EXISTS usuarios(id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT, senha TEXT)`)

//Cadastrar usuario
app.post("/usuarios", async (req, res) => {

    console.log(req.body);

    let nome = req.body.nome
    let email = req.body.email
    let senha = req.body.senha

    let senhaHash = await bcrypt.hash(senha, 10)
    console.log(senhaHash);

    //Inserir no banco de dados
    db.run(`INSERT INTO usuarios (nome, email, senha) VALUE(?, ?, ?)`,
        [nome, email, senhaHash],
        res.json({
            id: this.lastID,
            nome,
            email
        })
    )


})