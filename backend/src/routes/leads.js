// routes/leads.js
const express = require("express");
const Lead = require("../models/Lead");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email } = req.body;

  try {
    const newLead = new Lead({ name, email });
    await newLead.save();
    res.status(201).json({ message: "Lead creado exitosamente" });
  } catch (error) {
    res.status(400).json({ message: "Error al crear el lead", error });
  }
});

module.exports = router;