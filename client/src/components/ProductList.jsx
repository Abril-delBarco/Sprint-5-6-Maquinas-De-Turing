import { useState, useEffect } from "react";
import { getProductos } from "../services/api";
import ProductCard from "./ProductCard";

function ProductList({ onSelect, onAddToCart }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProductos()
      .then(setProductos)
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="grilla-productos">
      {productos.map((p) => (
        <ProductCard
          key={p.id}
          producto={p}
          onSelect={onSelect}
          onAddToCart={onAddToCart}
        />
      ))}
    </section>
  );
}

export default ProductList;
