import ProductForm from '../components/ProductForm';

// Página /admin/crear-producto: muestra el formulario de alta
function AdminCreateProductPage() {
  return (
    <section>
      <h1>Crear producto</h1>
      <ProductForm />
    </section>
  );
}

export default AdminCreateProductPage;
