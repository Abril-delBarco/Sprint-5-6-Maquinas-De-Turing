import ProductForm from '../components/ProductForm';

// Página /admin/crear-producto: muestra el formulario de alta
function AdminCreateProductPage() {
  return (
    <section className="contenedor catalogo-encabezado">
      <span className="ojo-seccion">Panel de administración</span>
      <h1 className="titulo-seccion">Crear producto</h1>
      <ProductForm />
    </section>
  );
}

export default AdminCreateProductPage;
