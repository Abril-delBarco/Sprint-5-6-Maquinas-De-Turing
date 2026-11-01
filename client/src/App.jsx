import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import Navbar from './components/Navbar';
import AdminCreateProductPage from './pages/AdminCreateProductPage'; 

function App() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/admin/crear-producto" element={<AdminCreateProductPage />} /> {/* <-- Ruta agregada */}
        </Routes>
      </main>
    </div>
  );
}

export default App;