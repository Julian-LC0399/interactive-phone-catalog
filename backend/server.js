const express = require('express');
const cors = require('cors');
const leadRoutes = require('./src/routes/leads');
const phoneRoutes = require('./src/routes/phones'); // Importa las rutas de teléfonos

// Crear aplicación Express
const app = express();

// Configuración básica de CORS
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Rutas
app.use('/api/leads', leadRoutes); // Rutas para leads
app.use('/api/phones', phoneRoutes); // Rutas para phones (nuevo)

// Ruta básica de health check
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'running', 
    message: 'API funcionando',
    endpoints: {
      leads: '/api/leads',
      phones: '/api/phones'
    }
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ 
    message: 'Ruta no encontrada',
    available_routes: {
      leads: {
        methods: ['GET', 'POST'],
        path: '/api/leads'
      },
      phones: {
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        path: '/api/phones'
      }
    }
  });
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
  console.log('📌 Endpoints disponibles:');
  console.log(`- Leads: http://localhost:${PORT}/api/leads`);
  console.log(`- Phones: http://localhost:${PORT}/api/phones`);
});

module.exports = app;