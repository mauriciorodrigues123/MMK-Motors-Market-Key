const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            if (user.senha) {
                user.senha = await bcrypt.hash(user.senha, 8);
            }
        }
    }
});

module.exports = User; 