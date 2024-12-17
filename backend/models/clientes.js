const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
  id_cliente: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  comida_favorita: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  descuento_navideno: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'clientes',
  timestamps: false, // Esto desactiva las columnas automáticas `createdAt` y `updatedAt`.
});

module.exports = Cliente;
