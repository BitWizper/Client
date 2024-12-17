const ClienteService = require('../service/clienteService');

class ClienteController {
  static async crearCliente(req, res) {
    try {
      const cliente = await ClienteService.crearCliente(req.body);
      res.status(201).json(cliente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async obtenerClientes(req, res) {
    try {
      const clientes = await ClienteService.obtenerClientes();
      res.status(200).json(clientes);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async obtenerClientePorId(req, res) {
    try {
      const cliente = await ClienteService.obtenerClientePorId(req.params.id);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
      res.status(200).json(cliente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async actualizarCliente(req, res) {
    try {
      const cliente = await ClienteService.actualizarCliente(req.params.id, req.body);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
      res.status(200).json(cliente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async eliminarCliente(req, res) {
    try {
      const eliminado = await ClienteService.eliminarCliente(req.params.id);
      if (!eliminado) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
      }
      res.status(200).json({ message: 'Cliente eliminado exitosamente' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = ClienteController;
