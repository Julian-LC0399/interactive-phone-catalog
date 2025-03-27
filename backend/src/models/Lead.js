const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  {
    timestamps:true,
    versionKey:false
  }
);

const Lead = mongoose.model("Lead", leadSchema);

module.exports = Lead;