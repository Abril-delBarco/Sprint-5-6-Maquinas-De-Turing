import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

// Helper de normalización para asegurar compatibilidad entre MongoDB y el componente
const normalizarProducto = (item) => {
  if (!item) return null;

  return {
    id: item._id || item.id,
    nombre: item.nombre || item.title || 'Producto sin título',
    precio: typeof item.precio === 'number' ? item.precio : Number(item.price) || 0,
    descripcion: item.descripcion || item.description || 'Sin descripción disponible.',
    categoria: item.categoria || item.category || 'General',
    // Si la imagen no viene en el backend, usa un fallback de los assets locales
    imagen: item.imagen || item.image || '/assets/default-product.png',
    stock: item.stock ?? 10
  };
};

export default function ProductDetailPage({ alAgregarAlCarrito }) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    let cancelado = false;
    setCargando(true);
    setError(null);

    // Ajusta la URL según el puerto de tu backend (ej. http://localhost:5000/api/productos/${id})
    fetch(`http://localhost:5000/api/productos/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: No se pudo cargar el producto`);
        }
        return res.json();
      })
      .then((data) => {
        if (!cancelado) {
          // El backend puede devolver el objeto directo o dentro de { data: ... } o { producto: ... }
          const itemCrudo = data.producto || data.data || data;
          setProducto(normalizarProducto(itemCrudo));
          setCargando(false);
        }
      })
      .catch((err) => {
        if (!cancelado) {
          setError(err.message);
          setCargando(false);
        }
      });

    return () => {
      cancelado = true;
    };
  }, [id]);

  const handleAgregar = () => {
    if (alAgregarAlCarrito && producto) {
      alAgregarAlCarrito(producto, cantidad);
    }
  };

  if (cargando) {
    return (
      <div className="detalle-estado">
        <p>Cargando información del producto...</p>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="detalle-estado error">
        <h2>Producto no encontrado</h2>
        <p>{error || 'No se encontró el producto solicitado.'}</p>
        <Link to="/productos" className="boton-volver">
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <article className="detalle-producto">
      <nav className="migas-pan" aria-label="Breadcrumb">
        <Link to="/">Inicio</Link> &gt;{' '}
        <Link to="/productos">Productos</Link> &gt;{' '}
        <span>{producto.categoria}</span>
      </nav>

      <div className="detalle-producto__contenedor">
        <div className="detalle-producto__imagen-col">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="detalle-producto__imagen"
            onError={(e) => {
              // Respaldo automático si la URL externa está rota
              e.currentTarget.src = '/assets/default-product.png';
            }}
          />
        </div>

        <div className="detalle-producto__info-col">
          <span className="detalle-producto__categoria">{producto.categoria}</span>
          <h1 className="detalle-producto__titulo">{producto.nombre}</h1>
          <p className="detalle-producto__precio">${producto.precio.toLocaleString('es-AR')}</p>

          <p className="detalle-producto__descripcion">{producto.descripcion}</p>

          <div className="detalle-producto__acciones">
            <div className="control-cantidad">
              <label htmlFor="cantidad-input">Cantidad:</label>
              <input
                id="cantidad-input"
                type="number"
                min="1"
                max={producto.stock}
                value={cantidad}
                onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))}
              />
            </div>

            <button
              type="button"
              className="boton-comprar"
              onClick={handleAgregar}
            >
              Agregar al Carrito
            </button>
          </div>

          <Link to="/productos" className="enlace-retorno">
            ← Continuar comprando
          </Link>
        </div>
      </div>
    </article>
  );
}