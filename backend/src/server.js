const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const leadsRoutes = require("./routes/leads");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Conectado a la BD"))
.catch(err => console.error("No se pudo conectar a la BD", err));

// Rutas
app.use("/api/leads", leadsRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});