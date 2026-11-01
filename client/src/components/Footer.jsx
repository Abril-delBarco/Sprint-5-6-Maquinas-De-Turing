import React from "react";

export default function Footer() {
  return (
    <footer className="pie">
      <div className="contenedor">
        <p className="pie__marca">Hermanos Jota</p>
        <p className="pie__descripcion">
          Mobiliario de autor diseñado para sanar espacios cotidianos y respetar la
          biodiversidad terrestre de las generaciones futuras.
        </p>
        <span className="insignia">■ Huella Neutra 2026</span>

        <div className="pie__grilla">
          <div className="pie__columna">
            <h4>Contacto</h4>
            <ul>
              <li>Calle del Taller 42, Ciudad</li>
              <li>
                <a href="tel:+541142424242">+54 9 11 4242 4242</a>
              </li>
              <li>
                <a href="mailto:hola@hermanosjota.com">hola@hermanosjota.com</a>
              </li>
            </ul>
          </div>

          <div className="pie__columna">
            <h4>Redes</h4>
            <ul>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                  Pinterest
                </a>
              </li>
              <li>
                <a href="#journal">Journal</a>
              </li>
            </ul>
          </div>

          <div className="pie__columna">
            <h4>Navegación</h4>
            <ul>
              <li>
                <a href="#inicio">Inicio</a>
              </li>
              <li>
                <a href="#coleccion">Colección</a>
              </li>
              <li>
                <a href="#contacto">Contacto</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pie__abajo">
          <span>© 2026 Hermanos Jota. Todos los derechos reservados.</span>
          <span>Artesanía lenta y diseño consciente.</span>
        </div>
      </div>
    </footer>
  );
}