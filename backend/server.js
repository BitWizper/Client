const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');


// Importar rutas
const clienteRoutes = require('./routes/clienteRoutes');


const app = express();
const port = process.env.PORT || 3000;

// Middleware
// Configura CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: 'http://localhost:4000', // Cambia este valor al puerto de tu frontend
  credentials: true // Permite enviar cookies si es necesario
}));

app.use(express.json());

// Rutas
app.use('/api/cliente', clienteRoutes);


// Sincronizar la base de datos
sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
  });
}).catch(error => {
  console.error('Error al sincronizar la base de datos:', error);
});
