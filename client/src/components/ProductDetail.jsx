import { useState, useEffect } from "react";
import { getProductoPorId } from "../services/api";
import "./ProductDetail.css";

function ProductDetail({ id, onBack, onAddToCart }) {
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCargando(true);
    setError(null);

    getProductoPorId(id)
      .then(setProducto)
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) {
    return (
      <div className="cargando">
        <span className="cargando__spinner" aria-hidden="true" />
        <p>Cargando el detalle del producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mensaje-vacio">
        <p>{error}</p>
        <button
          type="button"
          className="boton boton--secundario"
          onClick={onBack}
        >
          Volver al catálogo
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        className="detalle-volver"
        style={{ marginBottom: "1.25rem" }}
        onClick={onBack}
      >
        &larr; Volver al catálogo
      </button>

      <article className="detalle-producto">
      <div className="detalle-producto__imagen">
        <img src={producto.imagen} alt={producto.nombre} />
      </div>

      <div className="detalle-producto__info">
        <button
          type="button"
          className="detalle-volver"
          onClick={onBack}
        >
          &larr; Volver al catálogo
        </button>

        <span className="insignia">{producto.categoria}</span>

        <h2 className="detalle-producto__nombre">{producto.nombre}</h2>

        <p className="detalle-producto__precio">
          ${producto.precio.toLocaleString("es-AR")}
        </p>

        <p className="detalle-producto__descripcion">{producto.descripcion}</p>

        <div className="detalle-producto__acciones">
          <button
            type="button"
            className="boton boton--principal"
            onClick={() => onAddToCart(producto)}
          >
            Agregar al carrito
          </button>
        </div>

        <div className="ficha-tecnica">
          <h3 className="ficha-tecnica__titulo">Ficha técnica</h3>
          <dl>
            <div className="ficha-tecnica__fila">
              <dt>Categoría</dt>
              <dd>{producto.categoria}</dd>
            </div>
            <div className="ficha-tecnica__fila">
              <dt>Código</dt>
              <dd>#{producto.id}</dd>
            </div>
          </dl>
        </div>
      </div>
    </article>
    </div>
  );
}

export default ProductDetail;
