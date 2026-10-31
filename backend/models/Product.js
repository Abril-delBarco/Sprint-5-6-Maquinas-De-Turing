const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    precio: { type: Number, required: true, min: 0 },
    descripcion: { type: String },
    stock: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);