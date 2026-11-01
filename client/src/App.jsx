import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import AdminCreateProductPage from './pages/AdminCreateProductPage'; 
// import Footer from './components/Footer'; // Descomentalo cuando traigas el Footer

function App() {
  return (
    <div className="layout-app">
      {/* Pasamos los props que pide tu nuevo Navbar maquetado */}
      <Navbar cartCount={0} carrito={[]} />

      <main className="contenido-principal">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/admin/crear-producto" element={<AdminCreateProductPage />} />
          {/* Más adelante podés sumar:
          <Route path="/coleccion" element={<ColeccionPage />} />
          <Route path="/productos/:id" element={<DetalleProductoPage />} /> 
          */}
        </Routes>
      </main>

      {/* <Footer /> */}
    </div>
  );
}

export default App;