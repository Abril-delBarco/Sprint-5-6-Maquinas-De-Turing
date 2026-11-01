import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/products.css';

export function formatPrice(price) {
  return typeof price === 'number' && Number.isFinite(price)
    ? new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(price)
    : 'Precio a consultar';
}

export function ProductImage({ src, name, className = '' }) {
  const [failedSource, setFailedSource] = useState(null);
  if (!src || failedSource === src) {
    return <div className={`product-image product-image-placeholder ${className}`}>
      <span>Imagen no disponible</span>
    </div>;
  }
  return <img className={`product-image ${className}`} src={src} alt={name}
    loading="lazy" onError={() => setFailedSource(src)} />;
}

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <ProductImage src={product.imagenUrl} name={product.nombre} />
      <div className="product-card-content">
        <h2>{product.nombre}</h2>
        <p className="product-price">{formatPrice(product.precio)}</p>
        <p className="product-stock">{product.stock > 0 ? 'Disponible' : 'Sin stock'}</p>
        <Link className="product-button" to={`/productos/${encodeURIComponent(product._id)}`}
          aria-label={`Ver detalle de ${product.nombre}`}>Ver detalle</Link>
      </div>
    </article>
  );
}
