# Hermanos Jota — Sprint 5 y 6

Tienda online de la mueblería Hermanos Jota. Es una aplicación MERN: un backend con
Node.js, Express y MongoDB (Mongoose) que expone una API REST de productos, y un
frontend en React (Vite) que la consume.

```
.
├── backend/   API REST (Express + Mongoose)
└── client/    Aplicación React (Vite + React Router)
```

## Requisitos
- Node.js 20.19 o superior (o 22.12+), que es lo que piden Vite y Mongoose
- MongoDB: local (`mongodb://127.0.0.1:27017/...`) o un cluster en MongoDB Atlas

## Variables de entorno

Los archivos `.env` no se suben al repositorio (están en `.gitignore`). Hay que crearlos a mano.

### Backend — `backend/.env`
```dotenv
MONGO_URI=mongodb://127.0.0.1:27017/hermanos-jota
PORT=5000
CLIENT_URL=http://localhost:5173
```

| Variable     | Para qué sirve                                              | Valor por defecto       |
|--------------|-------------------------------------------------------------|-------------------------|
| `MONGO_URI`  | Cadena de conexión a MongoDB. **Es obligatoria.**           | —                       |
| `PORT`       | Puerto donde escucha el servidor.                           | `5000`                  |
| `CLIENT_URL` | Origen del frontend permitido por CORS.                     | `http://localhost:5173` |

### Cliente — `client/.env`
```dotenv
VITE_API_URL=http://localhost:5000
```

| Variable       | Para qué sirve                                                                 | Valor por defecto       |
|----------------|--------------------------------------------------------------------------------|-------------------------|
| `VITE_API_URL` | URL del backend, **sin** `/api/productos` (el cliente agrega esa ruta).        | `http://localhost:5000` |

Si se cambia, hay que reiniciar `npm run dev` (Vite lee las variables al arrancar).

## Cómo correrlo en local

1. **Backend**
   ```bash
   cd backend
   npm install
   node server.js
   ```
   Debe mostrar `Servidor corriendo en el puerto 5000` y `Conexion exitosa a la base de datos`.

2. **Cliente** (en otra terminal)
   ```bash
   cd client
   npm install
   npm run dev
   ```
   Abrir `http://localhost:5173`.

Para generar la versión de producción del cliente: `npm run build` (queda en `client/dist`).

> **Importante:** el backend tiene que estar corriendo **antes** de abrir el sitio. La portada, el
> catálogo y el detalle piden los productos a la API; si no responde, muestran un mensaje de error
> en lugar de los productos.

## Primer uso

La base de datos arranca **vacía**, así que la portada y el catálogo muestran
"Todavía no hay productos". Para cargar productos:

1. Entrar a `http://localhost:5173/admin/crear-producto` (o al link "Crear Producto" del menú).
2. Completar el formulario. `nombre` y `precio` son obligatorios.
3. Al guardar, la página redirige al catálogo (`/productos`) y el producto ya aparece también en la portada.

**Imagen del producto (`URL de la imagen`):** se puede usar una URL completa de internet o una de las
imágenes del sitio, escribiendo la ruta tal cual, por ejemplo `/assets/mesa-comedor-pampa.webp`.
Las disponibles en `client/public/assets` son: `aparador-uspallata`, `biblioteca-recoleta`,
`butaca-mendoza`, `escritorio-costa`, `mesa-comedor-pampa`, `mesa-de-centro-araucaria`,
`mesa-de-noche-aconcagua`, `silla-de-trabajo-belgrano`, `sillas-cordoba`, `sillon-copacabana` y
`sofa-patagonia` (todas con extensión `.webp`). Si se deja vacío o la imagen no carga, se muestra un
recuadro de "Imagen no disponible" o el logo del sitio.

## API

Base: `/api/productos`

| Método | Ruta                 | Descripción                  | Respuesta exitosa |
|--------|----------------------|------------------------------|-------------------|
| GET    | `/api/productos`     | Lista completa               | 200               |
| GET    | `/api/productos/:id` | Producto por `_id`           | 200               |
| POST   | `/api/productos`     | Crea un producto             | 201               |
| PUT    | `/api/productos/:id` | Actualiza un producto        | 200               |
| DELETE | `/api/productos/:id` | Elimina un producto          | 200               |

Errores: `400` (ID inválido o datos inválidos), `404` (producto inexistente) y `500` (error interno).
Los errores devuelven `{ "mensaje": "...", "error": "..." }`.

### Modelo `Product`

| Campo         | Tipo   | Reglas                                   |
|---------------|--------|------------------------------------------|
| `nombre`      | String | Obligatorio                              |
| `descripcion` | String | Opcional                                 |
| `precio`      | Number | Obligatorio, no puede ser negativo       |
| `stock`       | Number | Por defecto `0`                          |
| `imagenUrl`   | String | Opcional. Por defecto `''`               |

Además Mongoose agrega `_id`, `createdAt` y `updatedAt`.

## Páginas del cliente

| Ruta                     | Contenido                                                    |
|--------------------------|--------------------------------------------------------------|
| `/`                      | Inicio, con la colección tomada de la API                    |
| `/contacto`              | Formulario de contacto                                       |
| `/productos`             | Catálogo: lista los productos de la API                      |
| `/productos/:id`         | Detalle de un producto, con botón para agregarlo al carrito  |
| `/admin/crear-producto`  | Formulario de alta; al guardar redirige a `/productos`       |
| cualquier otra           | Página 404                                                   |

Las imágenes de los productos se cargan con el campo `imagenUrl`. Las del sitio están en
`client/public/assets` (por ejemplo, `/assets/sofa-patagonia.webp`).

## Alcance y limitaciones
- El carrito desplegable guarda los productos solo en memoria: se vacía al recargar la página.
- No existen las páginas de carrito completo ni de checkout; esos enlaces llevan al 404.
- Desde el sitio solo se pueden **crear** productos. Editar (`PUT`) y eliminar (`DELETE`) se hace
  únicamente a través de la API (Postman, Thunder Client o cURL). El componente `ProductForm` ya
  soporta edición, pero no hay una página que lo use.
- `/admin/crear-producto` no tiene login: cualquier persona que conozca la URL puede crear productos.
- El formulario de contacto es solo visual: muestra el mensaje de agradecimiento, pero no envía
  los datos a ningún servidor.
- No hay despliegue publicado: el proyecto se ejecuta en local.

## Equipo

| Integrante | Responsabilidad                                         | Usuario de GitHub  |
|------------|---------------------------------------------------------|--------------------|
| 1          | Backend: servidor, conexión a MongoDB y modelo          | Abril-delBarco     |
| 2          | Backend: rutas CRUD de la API                           | MatiasIsmaelA      |
| 3          | Frontend: estructura base, rutas, Inicio y Contacto     | Lauchax            |
| 4          | Frontend: catálogo, detalle y consumo de la API         | Zeindesito         |
| 5          | Frontend: formulario de alta, README e integración      | MartinOrtega3RL    |
