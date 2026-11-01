import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';
import '../styles/products.css';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');

    async function loadProducts() {
      try {
        const data = await getProducts({ signal: controller.signal });
        if (!controller.signal.aborted) setProducts(data);
      } catch (err) {
        if (!controller.signal.aborted) setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadProducts();
    return () => controller.abort();
  }, [attempt]);

  return (
    <section className="products-page" aria-labelledby="catalog-title">
      <header className="products-header">
        <p className="products-eyebrow">Mueblería Jota</p>
        <h1 id="catalog-title">Nuestros muebles</h1>
        <p>Encontrá ese mueble que hace tu casa más tuya.</p>
      </header>
      {loading ? <p className="products-status" role="status">Cargando productos…</p>
        : error ? <div className="products-status" role="alert">
          <p>{error}</p>
          <button className="product-button" onClick={() => setAttempt(value => value + 1)}>Reintentar</button>
        </div>
          : products.length === 0 ? <p className="products-status" role="status">
            Todavía no hay productos en el catálogo. Volvé pronto para conocer las novedades.
          </p>
            : <div className="products-grid">
              {products.map(product => <ProductCard key={product._id} product={product} />)}
            </div>}
    </section>
  );
}
