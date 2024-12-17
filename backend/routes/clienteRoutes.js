const express = require('express');
const ClienteController = require('../controllers/clienteController');

const router = express.Router();

// Ruta para obtener todos los clientes
router.get('/obtclientes', ClienteController.obtenerClientes);

// Ruta para obtener un cliente por ID
router.get('/clientes/:id', ClienteController.obtenerClientePorId);

// Ruta para crear un nuevo cliente
router.post('/crearclientes', ClienteController.crearCliente);

// Ruta para actualizar un cliente existente
router.put('/actclientes/:id', ClienteController.actualizarCliente);

// Ruta para eliminar un cliente
router.delete('/elimclientes/:id', ClienteController.eliminarCliente);

module.exports = router;

