export async function getProductos() {
  const res = await fetch("/api/productos");
  if (!res.ok) throw new Error("No se pudieron cargar los productos");
  return res.json();
}

export async function getProductoPorId(id) {
  const res = await fetch(`/api/productos/${id}`);
  if (!res.ok) throw new Error("Producto no encontrado");
  return res.json();
}