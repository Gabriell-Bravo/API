// index.js

const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configurações de conexão com o banco de dados
// Substitua pelas suas informações
const pool = new Pool({
    user: 'SEU_USUARIO',
    host: 'IP_INTERNO_DO_BANCO_DE_DADOS',
    database: 'NOME_DO_BANCO',
    password: 'SUA_SENHA',
    port: 5432, // Porta padrão do PostgreSQL. Verifique se a sua é diferente.
});

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Rota de exemplo para buscar todos os usuários
app.get('/usuarios', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).send('Erro no servidor');
    }
});

// Rota de exemplo para buscar um usuário por ID
app.get('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(`Erro ao buscar usuário com ID ${id}:`, error);
        res.status(500).send('Erro no servidor');
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});