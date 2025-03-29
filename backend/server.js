const express = require('express');
const cors = require('cors');
const leadRoutes = require('./src/routes/leads');
const phoneRoutes = require('./src/routes/phones'); // Nueva importación

const app = express();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

// Rutas existentes
app.use('/api', leadRoutes);
app.use('/api/phones', phoneRoutes); // Nueva ruta para teléfonos

app.get('/', (req, res) => {
  res.status(200).json({ status: 'running', message: 'API funcionando' });
});

// Resto del código (manejadores de error, etc.)
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  console.error('[ERROR]', err.stack);
  res.status(500).json({ 
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🟢 Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;