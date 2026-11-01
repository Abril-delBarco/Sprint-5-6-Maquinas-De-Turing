// En desarrollo se usa el puerto acordado por el backend. En producción,
// configurar VITE_API_URL con la URL del servidor (sin /api/productos).
const API_URL = (import.meta.env?.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request(path, { signal } = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}/api/productos${path}`, { signal });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new ApiError('No pudimos conectar con el servidor. Intentá nuevamente.', 0);
  }

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message = data?.mensaje || data?.error?.message;
    throw new ApiError(
      typeof message === 'string' ? message : 'No pudimos obtener los productos.',
      response.status,
    );
  }
  return data;
}

export async function getProducts(options) {
  const products = await request('', options);
  if (!Array.isArray(products)) {
    throw new ApiError('El servidor devolvió un catálogo con formato incorrecto.', 200);
  }
  return products;
}

export async function getProductById(id, options) {
  if (!id) throw new ApiError('Falta el identificador del producto.', 400);
  const product = await request(`/${encodeURIComponent(id)}`, options);
  if (!product || typeof product !== 'object' || Array.isArray(product) || !product._id) {
    throw new ApiError('El servidor devolvió un producto con formato incorrecto.', 200);
  }
  return product;
}
