// index.js

// 1. Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// 2. Cria a conexão com o banco de dados usando as variáveis
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// Middleware para processar JSON
app.use(express.json());

// 3. Cria uma rota de exemplo para testar a conexão
app.get('/usuarios', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        res.json(result.rows);
    } catch (err) {
        console.error('Erro na conexão com o banco de dados:', err);
        res.status(500).send('Erro interno do servidor');
    }
});

// 4. Inicia o servidor
app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});