import { Link } from "react-router-dom";

export default function MiniCarrito({ carrito = [], abierto = false, onCerrar }) {
  if (!abierto) return null;

  // Cálculo del total acumulado
  const total = carrito.reduce(
    (acum, item) => acum + (item.precio || 0) * (item.cantidad || 1),
    0
  );

  return (
    <aside
      className="mini-carrito mini-carrito--abierto"
      id="mini-carrito"
      role="dialog"
      aria-label="Resumen del carrito de compras"
    >
      <div className="mini-carrito__cabecera">
        <h3 className="mini-carrito__titulo">Tu Carrito</h3>
        {onCerrar && (
          <button
            type="button"
            className="mini-carrito__boton-cerrar"
            onClick={onCerrar}
            aria-label="Cerrar carrito"
          >
            &times;
          </button>
        )}
      </div>

      <div className="mini-carrito__cuerpo">
        {carrito.length === 0 ? (
          <p className="mini-carrito__vacio">El carrito está vacío.</p>
        ) : (
          <ul className="mini-carrito__lista">
            {carrito.map((item) => (
              <li key={item._id} className="mini-carrito__item">
                <img
                  src={item.imagenUrl || "/assets/logo.svg"}
                  alt={item.nombre}
                  className="mini-carrito__item-img"
                />
                
                <div className="mini-carrito__item-info">
                  {/* Navegación al detalle del producto */}
                  <Link
                    to={`/productos/${item._id}`}
                    className="mini-carrito__item-titulo"
                    onClick={onCerrar}
                  >
                    {item.nombre}
                  </Link>
                  <span className="mini-carrito__item-cantidad">
                    {item.cantidad || 1} x ${item.precio?.toLocaleString("es-AR")}
                  </span>
                </div>

                <span className="mini-carrito__item-subtotal">
                  ${((item.precio || 0) * (item.cantidad || 1)).toLocaleString("es-AR")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {carrito.length > 0 && (
        <div className="mini-carrito__pie">
          <div className="mini-carrito__total-fila">
            <span>Total:</span>
            <strong>${total.toLocaleString("es-AR")}</strong>
          </div>

          <div className="mini-carrito__acciones">
            {/* Navegación al Checkout */}
            <Link
              to="/checkout"
              className="boton boton--principal mini-carrito__btn-checkout"
              onClick={onCerrar}
            >
              Finalizar compra
            </Link>

            {/* Opcional: enlace a la vista completa del carrito */}
            <Link
              to="/carrito"
              className="boton boton--secundario mini-carrito__btn-ver-mas"
              onClick={onCerrar}
            >
              Ver carrito completo
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}