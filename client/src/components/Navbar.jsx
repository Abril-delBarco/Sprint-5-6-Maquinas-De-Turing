import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import MiniCarrito from "./MiniCarrito";

export default function Navbar({ cartCount = 0, carrito = [] }) {
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const carritoRef = useRef(null);

  // Cierra el menú mobile al hacer click en cualquier enlace de navegación
  const cerrarMenu = () => setMenuAbierto(false);

  // Cierra el mini carrito al clickear fuera de su contenedor
  useEffect(() => {
    if (!carritoAbierto) return;

    const alClickearFuera = (e) => {
      if (carritoRef.current && !carritoRef.current.contains(e.target)) {
        setCarritoAbierto(false);
      }
    };

    document.addEventListener("mousedown", alClickearFuera);
    return () => document.removeEventListener("mousedown", alClickearFuera);
  }, [carritoAbierto]);

  return (
    <header className="encabezado">
      <div className="contenedor encabezado__barra">
        {/* Logo / Marca */}
        <Link to="/" className="encabezado__marca" onClick={cerrarMenu}>
          <img src="/assets/logo.svg" alt="Logo Hermanos Jota" />
          <span>Hermanos Jota</span>
        </Link>

        {/* Navegación Principal */}
        <nav
          className={`nav-principal${menuAbierto ? " nav--abierto" : ""}`}
          id="nav-principal"
        >
          <ul className="nav-principal__lista">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => (isActive ? "activo" : undefined)}
                onClick={cerrarMenu}
              >
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/coleccion"
                className={({ isActive }) => (isActive ? "activo" : undefined)}
                onClick={cerrarMenu}
              >
                Colección
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contacto"
                className={({ isActive }) => (isActive ? "activo" : undefined)}
                onClick={cerrarMenu}
              >
                Contacto
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/crear-producto"
                className={({ isActive }) => (isActive ? "activo" : undefined)}
                onClick={cerrarMenu}
              >
                Crear Producto
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Acciones: Carrito y Botón Hamburguesa */}
        <div className="encabezado__acciones">
          <div className="carrito-wrapper" ref={carritoRef}>
            <button
              className="boton-carrito"
              id="boton-carrito"
              type="button"
              aria-label="Ver carrito"
              aria-expanded={carritoAbierto}
              onClick={() => setCarritoAbierto((abierto) => !abierto)}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
                alt="Carrito"
                className="icono-carrito"
              />
              {cartCount > 0 && (
                <span className="contador-carrito" id="contador-carrito">
                  {cartCount}
                </span>
              )}
            </button>

            <MiniCarrito carrito={carrito} abierto={carritoAbierto} />
          </div>

          <button
            className="boton-menu"
            type="button"
            aria-label="Abrir menú"
            aria-expanded={menuAbierto}
            aria-controls="nav-principal"
            onClick={() => setMenuAbierto((abierto) => !abierto)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}