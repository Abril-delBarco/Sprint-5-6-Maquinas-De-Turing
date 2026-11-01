import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mismo origen de la API que usa services/api.js (VITE_API_URL en el .env del cliente)
const API_URL = (import.meta.env?.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');

// Valores iniciales de los campos del modelo Product
const formularioVacio = {
  nombre: '',
  descripcion: '',
  precio: '',
  stock: '',
  imagenUrl: '',
};

// Si recibe "producto" (con _id) el formulario edita (PUT); si no, crea (POST)
function ProductForm({ producto }) {
  // Componente controlado: el estado guarda lo que hay en cada campo
  const [datos, setDatos] = useState(producto || formularioVacio);
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();

  // onChange: actualiza solo el campo que cambió, usando su atributo name
  function handleChange(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  }

  // onSubmit: envía el producto al backend (POST o PUT)
  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setEnviando(true);

    const editando = Boolean(producto && producto._id);
    const url = editando
      ? `${API_URL}/api/productos/${producto._id}`
      : `${API_URL}/api/productos`;

    // El formulario guarda texto: precio y stock se convierten a número
    const cuerpo = {
      nombre: datos.nombre,
      descripcion: datos.descripcion,
      precio: Number(datos.precio),
      stock: Number(datos.stock),
      imagenUrl: datos.imagenUrl,
    };

    try {
      const respuesta = await fetch(url, {
        method: editando ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cuerpo),
      });

      if (!respuesta.ok) {
        // El backend responde { mensaje, error: "detalle" } o { error: { message } }
        const info = await respuesta.json().catch(() => null);
        const detalle = typeof info?.error === 'string' ? info.error : info?.error?.message;
        const mensaje = [info?.mensaje, detalle].filter(Boolean).join(': ');
        setError(mensaje || 'No se pudo guardar el producto.');
        setEnviando(false);
        return;
      }

      // Guardado OK: redirige al catálogo
      navigate('/productos');
    } catch (err) {
      setError('No pudimos conectar con el servidor. Intentá nuevamente.');
      setEnviando(false);
    }
  }

  return (
    <form className="formulario formulario--admin" onSubmit={handleSubmit}>
      <div className="campo">
        <label htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={datos.nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="campo">
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={datos.descripcion}
          onChange={handleChange}
        />
      </div>

      <div className="campo">
        <label htmlFor="precio">Precio</label>
        <input
          id="precio"
          name="precio"
          type="number"
          min="0"
          value={datos.precio}
          onChange={handleChange}
          required
        />
      </div>

      <div className="campo">
        <label htmlFor="stock">Stock</label>
        <input
          id="stock"
          name="stock"
          type="number"
          min="0"
          value={datos.stock}
          onChange={handleChange}
        />
      </div>

      <div className="campo">
        <label htmlFor="imagenUrl">URL de la imagen</label>
        <input
          id="imagenUrl"
          name="imagenUrl"
          type="text"
          value={datos.imagenUrl}
          onChange={handleChange}
        />
      </div>

      {error && <p className="campo__error" role="alert">{error}</p>}

      <button type="submit" className="boton boton--principal" disabled={enviando}>
        {enviando ? 'Guardando...' : 'Guardar producto'}
      </button>
    </form>
  );
}

export default ProductForm;
