# Integrante 5 — Martín Ortega

## Qué hice
- `src/components/ProductForm.jsx`: formulario controlado (`useState` + `onChange`).
  En `onSubmit` hace `POST /api/productos`, o `PUT /api/productos/:id` si recibe un
  `producto` con `_id`. Al guardar redirige a `/productos` con `useNavigate`.
  Muestra el error del backend (`mensaje` + detalle) o un aviso si no hay conexión.
- `src/pages/AdminCreateProductPage.jsx`: página con el formulario de alta.
- Verificado con un proyecto Vite aparte (compila y 4 pruebas con `fetch` simulado:
  POST, PUT, error del backend y error de red). Falta probarlo con la app integrada.

## Qué falta
- **Integrante 3:** registrar en `App.js` la ruta
  `<Route path="/admin/crear-producto" element={<AdminCreateProductPage />} />`
  y agregar un link en el `Navbar`.
- **Integrante 1:** en producción, `CLIENT_URL` del backend debe ser la URL del frontend
  desplegado (hoy el CORS solo permite `http://localhost:5173`).
- **Integrante 1/2:** integrar en una sola rama `server.js` (`feat/backend-server`) y
  `productRoutes.js` (`backend`). La rama `backend` tiene un `Product.js` sin `imagenUrl`.
- **Yo (pendiente):**
  - Desplegar el frontend en Vercel o Netlify, con `VITE_API_URL` apuntando al backend en Render.
  - Escribir el `README.md` (variables `.env` y links de los deploys).
  - Probar el formulario contra el backend real cuando todo esté integrado.
