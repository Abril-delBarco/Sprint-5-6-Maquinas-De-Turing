import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Componentes estructurales
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Páginas / Vistas
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import AdminCreateProductPage from "./pages/AdminCreateProductPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";

export default function App() {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => [...prevCarrito, producto]);
  };

  return (
    <div className="layout-app">
      {/* Navbar conectado al carrito real */}
      <Navbar cartCount={carrito.length} carrito={carrito} />

      {/* main sin clase contenedor: mantiene la compatibilidad con franjas de ancho completo */}
      <main>
        <Routes>
          {/* Ruta principal: Hero, Cita, Catálogo, Franja y Taller */}
          <Route
            path="/"
            element={<HomePage onAddToCart={agregarAlCarrito} />}
          />

          {/* Página individual de contacto */}
          <Route path="/contacto" element={<ContactPage />} />

          {/* Panel de administración */}
          <Route
            path="/admin/crear-producto"
            element={<AdminCreateProductPage />}
          />

          {/* Detalle de producto por ID en la URL */}
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/productos/:id" element={<ProductDetailPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}