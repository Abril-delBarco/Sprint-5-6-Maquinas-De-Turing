import { useState } from "react";
import { Routes, Route } from "react-router-dom";



import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import AdminCreateProductPage from "./pages/AdminCreateProductPage";
import ProductDetail from "./components/ProductDetail"; 
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import "./App.css";

export default function App() {
  return (
    <div className="layout-app">
      {/* Navbar con to="/productos" */}
      <Navbar cartCount={0} carrito={[]} />

      {/* Contenido enrutado */}
      <main className="contenedor">
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* Ruta que falta registrar para solucionar el warning */}
          <Route path="/productos" element={<ProductsPage />} />
          
          {/* Ruta dinámica para el detalle de cada producto */}
          <Route path="/productos/:id" element={<ProductDetailPage />} />
          
          {/* Ruta de respaldo para páginas no encontradas */}
          <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
        </Routes>
      </main>

      <footer className="pie-pagina">
        <div className="contenedor">
          <p>© 2026 Hermanos Jota / Máquinas de Turing - Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}