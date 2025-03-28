const express = require('express');
const cors = require('cors');
const leadRoutes = require('./src/routes/leads');

// Crear aplicación Express
const app = express();

// Configuración básica de CORS (puedes personalizarlo según tus necesidades)
const corsOptions = {
  origin: '*', // En producción cambia esto a tu dominio específico
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middlewares
app.use(cors(corsOptions)); // Habilitar CORS con las opciones configuradas
app.use(express.json()); // Para parsear application/json

// Rutas
app.use('/api', leadRoutes);

// Ruta básica de health check
app.get('/', (req, res) => {
  res.status(200).json({ status: 'running', message: 'API funcionando' });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo centralizado de errores
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.stack);
  res.status(500).json({ 
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Configuración del puerto
const PORT = process.env.PORT || 8000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🟢 Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app; // Para testing