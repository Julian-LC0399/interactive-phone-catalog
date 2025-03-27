const express = require('express');
const cors = require('cors');
const leadsRouter = require('./src/routes/leads');
const phonesRouter = require('./src/routes/phones');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/leads', leadsRouter);
app.use('/api/phones', phonesRouter);

// Conexión MySQL (solo para verificar)
const pool = require('./src/config/db');
pool.getConnection()
  .then(conn => {
    console.log('✅ Conectado a MySQL');
    conn.release();
  })
  .catch(err => console.error('❌ Error MySQL:', err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));