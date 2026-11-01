import "./ProductCard.css";

function ProductCard({ producto, onSelect, onAddToCart }) {
  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(producto);
  };

  return (
    <article className="tarjeta-producto" onClick={() => onSelect(producto.id)}>
      <div className="tarjeta-producto__imagen">
        <img src={producto.imagen} alt={producto.nombre} />
      </div>

      <div className="tarjeta-producto__cabecera">
        <h3 className="tarjeta-producto__nombre">{producto.nombre}</h3>
        <span className="tarjeta-producto__precio">
          ${producto.precio.toLocaleString("es-AR")}
        </span>
      </div>

      <p className="tarjeta-producto__descripcion">{producto.descripcion}</p>

      <button
        type="button"
        className="boton boton--secundario"
        onClick={handleAddToCart}
      >
        Agregar al carrito
      </button>
    </article>
  );
}

export default ProductCard;
