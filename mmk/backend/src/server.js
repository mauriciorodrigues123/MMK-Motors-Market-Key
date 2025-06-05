const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/users', require('./routes/users'));
app.use('/api/cars', require('./routes/cars'));
app.use('/api/rentals', require('./routes/rentals'));

// Teste de conexão com o banco
sequelize.authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch(err => {
        console.error('Erro ao conectar com o banco de dados:', err);
    });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}); 