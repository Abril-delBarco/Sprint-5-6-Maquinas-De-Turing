import { Link } from "react-router-dom";

// Se muestra cuando la URL no coincide con ninguna ruta (por ejemplo /checkout o /carrito)
export default function NotFoundPage() {
  return (
    <section className="contenedor catalogo-encabezado">
      <span className="ojo-seccion">Error 404</span>
      <h1 className="titulo-seccion">Página no encontrada</h1>
      <p>La página que buscás no existe o todavía no está disponible.</p>
      <Link to="/" className="boton boton--principal">
        Volver al inicio
      </Link>
    </section>
  );
}
