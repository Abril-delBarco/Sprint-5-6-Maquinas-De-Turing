import { useEffect, useState } from "react";
import ProductCard from "./HomeProductCard";
import { getProducts } from "../services/api";

// Muestra la colección de la portada con los productos reales de la API
function ProductList({ onAddToCart }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function cargarProductos() {
      try {
        const data = await getProducts({ signal: controller.signal });
        if (!controller.signal.aborted) setProductos(data);
      } catch (err) {
        if (!controller.signal.aborted) setError(err.message);
      } finally {
        if (!controller.signal.aborted) setCargando(false);
      }
    }

    cargarProductos();
    return () => controller.abort();
  }, []);

  if (cargando) return <p role="status">Cargando productos…</p>;
  if (error) return <p role="alert">{error}</p>;
  if (productos.length === 0) {
    return <p role="status">Todavía no hay productos en la colección.</p>;
  }

  return (
    <section className="grilla-productos">
      {productos.map((p) => (
        <ProductCard key={p._id} producto={p} onAddToCart={onAddToCart} />
      ))}
    </section>
  );
}

export default ProductList;
