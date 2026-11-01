require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

//MIDDLEWARES GLOBALES 
app.use(express.json());

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

//CONEXION A LA BASE DE DATOS
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conexion exitosa a la base de datos'))
  .catch(err => console.error('Error al conectar a la base de datos:', err.message));

//RUTAS
app.get('/', (req, res) => {
  res.send('...');
});

try {
  const productRoutes = require('./routes/productRoutes');
  app.use('/api/productos', productRoutes);
} catch (error) {
  console.log('Rutas de productos ');
}

//MIDDLEWARES DE ERROR 
app.use((req, res, next) => {
  res.status(404).json({ error: { message: 'Ruta no encontrada' } });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: { message: err.message || 'Error interno del servidor' }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});