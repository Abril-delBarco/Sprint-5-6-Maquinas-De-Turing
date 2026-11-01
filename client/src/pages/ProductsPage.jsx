import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ProductsPage() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/productos')
      .then((res) => res.json())
      .then((data) => {
        const lista = Array.isArray(data) ? data : data.productos || [];
        // Normalización de campos
        const adaptados = lista.map((p) => ({
          id: p._id || p.id,
          nombre: p.nombre || p.title || 'Producto',
          precio: p.precio || p.price || 0,
          imagen: p.imagen || p.image || '/assets/default-product.png',
          categoria: p.categoria || p.category || 'General'
        }));
        setProductos(adaptados);
        setCargando(false);
      })
      .catch(() => {
        // Si el backend no está encendido, fallback temporal
        setProductos([
          { id: '1', nombre: 'Producto de Muestra 1', precio: 15000, imagen: '/assets/default-product.png', categoria: 'General' },
          { id: '2', nombre: 'Producto de Muestra 2', precio: 22000, imagen: '/assets/default-product.png', categoria: 'General' }
        ]);
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando catálogo...</p>;

  return (
    <section>
      <h1 style={{ marginBottom: '1.5rem' }}>Catálogo de Productos</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
        {productos.map((prod) => (
          <article key={prod.id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem', background: '#fff' }}>
            <img src={prod.imagen} alt={prod.nombre} style={{ height: '180px', width: '100%', objectFit: 'cover', borderRadius: '4px' }} />
            <h3 style={{ margin: '0.75rem 0 0.25rem' }}>{prod.nombre}</h3>
            <p style={{ fontWeight: 'bold', color: '#2563eb' }}>${prod.precio.toLocaleString('es-AR')}</p>
            <Link
              to={`/productos/${prod.id}`}
              style={{ display: 'inline-block', marginTop: '0.75rem', background: '#111827', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '4px' }}
            >
              Ver Detalle
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}