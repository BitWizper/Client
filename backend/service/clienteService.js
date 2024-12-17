const Cliente = require('../models/clientes');

class ClienteService {
  static async crearCliente(data) {
    try {
      const cliente = await Cliente.create(data);
      return cliente;
    } catch (error) {
      throw new Error('Error al crear cliente: ' + error.message);
    }
  }

  static async obtenerClientes() {
    try {
      const clientes = await Cliente.findAll();
      return clientes;
    } catch (error) {
      throw new Error('Error al obtener clientes: ' + error.message);
    }
  }

  static async obtenerClientePorId(id) {
    try {
      const cliente = await Cliente.findByPk(id);
      return cliente;
    } catch (error) {
      throw new Error('Error al obtener cliente: ' + error.message);
    }
  }

  static async actualizarCliente(id, data) {
    try {
      const cliente = await Cliente.findByPk(id);
      if (!cliente) return null;
      await cliente.update(data);
      return cliente;
    } catch (error) {
      throw new Error('Error al actualizar cliente: ' + error.message);
    }
  }

  static async eliminarCliente(id) {
    try {
      const cliente = await Cliente.findByPk(id);
      if (!cliente) return null;
      await cliente.destroy();
      return true;
    } catch (error) {
      throw new Error('Error al eliminar cliente: ' + error.message);
    }
  }
}

module.exports = ClienteService;
