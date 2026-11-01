import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Inicio</Link>
      <Link to="/contacto">Contacto</Link>
      <Link to="/admin/crear-producto">Crear Producto</Link> {/* <-- Link agregado[cite: 3] */}
    </nav>
  );
}