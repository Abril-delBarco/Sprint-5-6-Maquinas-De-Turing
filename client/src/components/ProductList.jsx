import { useState } from "react";
import ProductCard from "./HomeProductCard";

// Datos de prueba locales para maquetar
const PRODUCTOS_MOCK = [
  {
    id: 1,
    nombre: "Sofá Patagonia",
    precio: 450000,
    descripcion: "Tapizado en lino natural con estructura de madera maciza.",
    imagen: "/assets/sofa-patagonia.webp",
  },
  {
    id: 2,
    nombre: "Aparador Uspallata",
    precio: 380000,
    descripcion: "Madera recuperada con ensambles artesanales y acabado mate.",
    imagen: "/assets/aparador-uspallata.webp",
  },
  {
    id: 3,
    nombre: "Mesa Comedor Arrayán",
    precio: 520000,
    descripcion: "Tapa maciza de roble con terminación al aceite orgánico.",
    imagen: "/assets/sofa-patagonia.webp",
  },
];

function ProductList({ onSelect, onAddToCart }) {
  const [productos] = useState(PRODUCTOS_MOCK);

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