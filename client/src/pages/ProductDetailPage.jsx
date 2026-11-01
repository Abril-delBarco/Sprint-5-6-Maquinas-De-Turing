import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductById } from '../services/api';
import { formatPrice, ProductImage } from '../components/ProductCard';
import '../styles/products.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [result, setResult] = useState({ id: null, product: null, error: null });
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setResult({ id, product: null, error: null });

    async function loadProduct() {
      try {
        const product = await getProductById(id, { signal: controller.signal });
        if (!controller.signal.aborted) setResult({ id, product, error: null });
      } catch (error) {
        if (!controller.signal.aborted) setResult({ id, product: null, error });
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadProduct();
    return () => controller.abort();
  }, [id, attempt]);

  // Evita mostrar el producto anterior al cambiar la URL, antes de ejecutar el efecto.
  const pending = loading || result.id !== id;
  const { product, error } = result;
  const unavailable = error && [400, 404].includes(error.status);

  return (
    <section className="products-page" aria-label="Detalle del producto">
      <Link className="products-back" to="/productos">← Volver al catálogo</Link>
      {pending ? <p className="products-status" role="status">Cargando producto…</p>
        : error ? <div className="products-status" role="alert">
          <h1>{unavailable ? 'Producto no encontrado' : 'No pudimos cargar el producto'}</h1>
          <p>{unavailable ? 'El producto que buscás no existe o ya no está disponible.' : error.message}</p>
          {!unavailable && <button className="product-button" onClick={() => setAttempt(value => value + 1)}>
            Reintentar
          </button>}
        </div>
          : product && <article className="product-detail">
            <ProductImage key={product._id} src={product.imagenUrl} name={product.nombre} />
            <div className="product-detail-content">
              <p className="products-eyebrow">Mueblería Jota</p>
              <h1>{product.nombre}</h1>
              <p className="product-price">{formatPrice(product.precio)}</p>
              <p className="product-description">{product.descripcion || 'Este producto todavía no tiene una descripción.'}</p>
              <p className="product-stock">{product.stock > 0
                ? `Stock disponible: ${product.stock} ${product.stock === 1 ? 'unidad' : 'unidades'}`
                : 'Sin stock por el momento'}</p>
            </div>
          </article>}
    </section>
  );
}
