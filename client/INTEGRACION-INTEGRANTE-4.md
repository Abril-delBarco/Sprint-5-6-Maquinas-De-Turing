# Catálogo y detalle — Integrante 4

Esta entrega agrega el consumo de la API, las tarjetas, el catálogo y el detalle.
La rama parte de `main`, que por ahora no tiene la aplicación React. Se integra
con la estructura del integrante 3; no incluye un segundo App ni un servidor.

## Integración con React Router

Se usan archivos `.jsx` para los componentes con JSX, compatibles con Vite.
Requiere `react`, `react-dom` y `react-router-dom` en la aplicación del grupo.
Dentro del `BrowserRouter` y del `Routes` del integrante 3, agregar:

```jsx
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';

// Dentro de <Routes>:
<Route path="/productos" element={<ProductsPage />} />
<Route path="/productos/:id" element={<ProductDetailPage />} />
```

El Navbar debe enlazar a `/productos`. Los estilos se importan automáticamente
y sus clases están limitadas a estos componentes.

## API y entorno

En el `.env` del cliente Vite, configurar (sin subir claves):

```dotenv
VITE_API_URL=http://localhost:5000
```

Usar la URL pública de Render en producción y volver a compilar el frontend.
La variable contiene solo el origen del backend; el servicio agrega
`/api/productos`. Sin variable se utiliza `http://localhost:5000`.
No necesita Axios: usa `fetch` y `AbortController` del navegador.
Si el grupo elige otra herramienta de compilación, adaptar la lectura de
`import.meta.env.VITE_API_URL` en `src/services/api.js` a esa herramienta.

- `getProducts({ signal })`: GET `/api/productos`, devuelve un array.
- `getProductById(id, { signal })`: GET `/api/productos/:id`, devuelve un objeto.
- Ambos exportan errores `ApiError` con `message` y `status`.
- Los mensajes del backend admiten `{ mensaje }` y `{ error: { message } }`.

Cada producto debe usar `_id`, `nombre`, `descripcion`, `precio` (número),
`stock` (número) e `imagenUrl` (opcional). Los precios se muestran en pesos argentinos.

## Coordinación pendiente del grupo

- Integrante 1: el modelo visto en `origin/backend` todavía no incluye
  `imagenUrl`. Agregar ese campo según la consigna. Si no hay imagen o falla,
  estas vistas muestran “Imagen no disponible”.
- Integrantes 1 y 2: integrar las rutas y el servidor de sus ramas; permitir
  el origen del cliente en CORS y disponer de MongoDB para probar datos reales.
- Integrante 3: registrar las dos rutas anteriores en su aplicación React.
- Integrante 5: conservar la URL de la API en el entorno del despliegue.

## Comprobación manual con el proyecto integrado

1. Abrir `/productos`: carga y luego lista de tarjetas con nombre, precio y stock.
2. Usar “Ver detalle”: abre `/productos/:id` y muestra los datos del producto.
3. Cambiar entre IDs: se solicita el producto correspondiente sin mostrar datos viejos.
4. Probar un catálogo vacío, un ID inexistente y el backend apagado.
5. Restablecer el servidor y usar “Reintentar” para recuperar la vista.
6. Probar imágenes ausentes o rotas, ancho móvil y navegación con teclado.

Las solicitudes se cancelan al abandonar una vista para evitar que una respuesta
anterior reemplace los datos de una navegación nueva.

## Pruebas automatizadas

Se incluyen 13 pruebas de servicio y componentes en `tests/products.test.jsx`.
Se verificaron con React 19 y React Router 7 en un entorno separado, porque
la rama principal todavía no tiene `package.json` para el cliente.

Una vez integrada la aplicación, instalar las dependencias de prueba desde `client`:

```sh
npm install --save-dev vitest@3 jsdom@26 @testing-library/react@16
npx vitest run --config tests/vitest.config.mjs
```

Cubren carga, navegación al detalle, catálogo vacío, errores y reintentos,
respuesta 404, imágenes rotas, formato de la API y cancelación al navegar.
La conexión con MongoDB y el despliegue se comprueban después de integrar
las partes del grupo; las pruebas usan respuestas simuladas.
