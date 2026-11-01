import { useState } from "react";

function ContactForm() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", form);
    setEnviado(true);
    setForm({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <section className="cta-consulta" id="contacto">
      <div className="cta-consulta__grid">
        <div className="cta-consulta__info">
          <span className="ojo-seccion">Contacto</span>
          <h2 className="titulo-seccion">Hablemos de tu proyecto</h2>
          <p>
            Contanos qué mueble estás buscando y te acercamos una propuesta con
            medidas, maderas y tiempos de producción.
          </p>

          <div className="cta-consulta__contacto">
            <a href="mailto:hola@hermanosjota.com.ar">hola@hermanosjota.com.ar</a>
            <a href="tel:+541145550000">+54 11 4555 0000</a>
          </div>
        </div>

        <div className="cta-consulta__formulario">
          {enviado && (
            <p className="mensaje-exito" role="status">
              ¡Gracias! Te contactaremos pronto.
            </p>
          )}

          <form className="formulario" onSubmit={handleSubmit}>
            <div className="formulario__fila">
              <div className="campo">
                <label htmlFor="nombre">Nombre</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div className="campo">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            <div className="campo">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                placeholder="Contanos qué estás buscando"
                required
              />
            </div>

            <button type="submit" className="boton boton--principal">
              Enviar consulta
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
