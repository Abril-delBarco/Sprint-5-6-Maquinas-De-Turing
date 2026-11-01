# Integrante 5 — Martín Ortega

## Qué hice
- `src/components/ProductForm.jsx`: formulario controlado (`useState` + `onChange`).
  En `onSubmit` hace `POST /api/productos`, o `PUT /api/productos/:id` si recibe un
  `producto` con `_id`. Al guardar redirige a `/productos` con `useNavigate`.
  Muestra el error del backend (`mensaje` + detalle) o un aviso si no hay conexión.
- `src/pages/AdminCreateProductPage.jsx`: página `/admin/crear-producto` con el formulario.
- `README.md` de la raíz: variables `.env`, cómo correrlo, API, modelo y rutas.
- Integración de las ramas de los demás integrantes, conservando sus commits:
  - Integrante 4: se usa su `api.js` y sus páginas de catálogo y detalle; la `ProductCard`
    del Integrante 3 pasó a `HomeProductCard.jsx`.
  - CSS del sitio (Sprint 1 y 2) como `index.css` y assets en `client/public/assets`.
  - Carrito desplegable: se agregó la clase `mini-carrito--abierto` (estaba oculto) y el CSS faltante.
  - Página 404 para las URL que no existen.
- Probado en el navegador contra el backend real y una base de datos local: crear un
  producto, redirección al catálogo, detalle y errores de conexión.

## Qué falta
- Las páginas de carrito completo y checkout (hoy llevan al 404). No están en la consigna.
- La portada y el carrito usan productos de ejemplo; conectarlos a la API es decisión del grupo.
- No hay despliegue: se decidió que no era necesario.
