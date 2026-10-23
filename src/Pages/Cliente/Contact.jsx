import { useState } from 'react';
import { Link } from 'react-router-dom';
import { enviarContacto } from '../../api/contactos';
import './Contact.css';

const TIPOS = [
  { valor: 'queja', etiqueta: 'Queja o reclamo' },
  { valor: 'sugerencia', etiqueta: 'Sugerencia' },
  { valor: 'consulta', etiqueta: 'Contacto general' },
  { valor: 'pedido', etiqueta: 'Pedido especial' },
];

const DATOS_CONTACTO = [
  { icono: '✉️', titulo: 'Escríbenos', texto: 'hola@nutrik.com' },
  { icono: '📞', titulo: 'Llámanos', texto: '+57 300 000 0000' },
  { icono: '🕘', titulo: 'Horario', texto: 'Lun a Sáb · 8am – 6pm' },
];

function Contact() {
  const [estadoEnvio, setEstadoEnvio] = useState('idle');
  const [tipo, setTipo] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const datos = Object.fromEntries(new FormData(form).entries());

    setEstadoEnvio('sending');

    try {
      await enviarContacto({
        nombre: datos.nombre,
        email: datos.email,
        tipo_solicitud: datos.tipo_solicitud,
        asunto: datos.asunto,
        mensaje: datos.mensaje,
      });

      setEstadoEnvio('success');
      form.reset();
      setTipo('');
      window.setTimeout(() => setEstadoEnvio('idle'), 6000);
    } catch {
      setEstadoEnvio('error');
    }
  };

  return (
    <section className="contacto-section" id="contacto">
      <div className="contacto-hero">
        <span className="section-tag">Centro de ayuda</span>
        <h1>Estamos para escucharte</h1>
        <p>
          Cuéntanos tu queja, sugerencia o solicitud. Cada mensaje nos ayuda a
          mejorar y a acompañarte mejor en tu camino hacia una vida más
          saludable.
        </p>
      </div>

      <div className="contacto-grid">
        <aside className="contacto-info">
          <h2>Datos de contacto</h2>
          <p className="contacto-info-intro">
            También puedes comunicarte con nosotros por estos canales. Con
            gusto te responderemos lo antes posible.
          </p>
          <ul className="contacto-datos">
            {DATOS_CONTACTO.map((dato) => (
              <li key={dato.titulo}>
                <span className="contacto-dato-icono">{dato.icono}</span>
                <div>
                  <strong>{dato.titulo}</strong>
                  <span>{dato.texto}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="contacto-nota">
            <strong>Respuesta rápida</strong>
            <p>
              Atendemos todas las solicitudes en un plazo máximo de 24 horas
              hábiles.
            </p>
          </div>
        </aside>

        <div className="card-glass">
          <div className="contacto-header">
            <span className="contacto-kicker">Formulario</span>
            <h2>Envíanos tu solicitud</h2>
            <p>Completa los campos y te contactaremos muy pronto.</p>
          </div>

          <form onSubmit={handleSubmit} className="pqr-form">
            <input
              type="hidden"
              name="_subject"
              value="Nueva solicitud desde Nutrik"
            />
            <input type="hidden" name="_template" value="table" />
            <input
              type="text"
              name="_honey"
              className="hidden-field"
              tabIndex="-1"
              autoComplete="off"
            />

            <div className="input-group">
              <div className="field">
                <label htmlFor="nombre">Nombre completo</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="Ej. Juliana Gómez"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="correo">Correo electrónico</label>
                <input
                  id="correo"
                  name="email"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  required
                />
              </div>
            </div>

            <div className="field">
              <span className="field-label">Tipo de solicitud</span>
              <div className="tipo-opciones">
                {TIPOS.map((opcion) => (
                  <label
                    key={opcion.valor}
                    className={`tipo-chip ${
                      tipo === opcion.valor ? 'activo' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="tipo_solicitud"
                      value={opcion.valor}
                      checked={tipo === opcion.valor}
                      onChange={() => setTipo(opcion.valor)}
                      required
                    />
                    {opcion.etiqueta}
                  </label>
                ))}
              </div>
            </div>

            <div className="field">
              <label htmlFor="asunto">Asunto</label>
              <input
                id="asunto"
                name="asunto"
                type="text"
                placeholder="Resume tu solicitud en una frase"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="mensaje">Cuéntanos con detalle</label>
              <textarea
                id="mensaje"
                name="mensaje"
                placeholder="Describe aquí tu situación, recomendación o solicitud con el mayor detalle posible..."
                rows="6"
                required
              ></textarea>
            </div>

            <div className="contacto-acciones">
              <button
                type="submit"
                className="btn-glow"
                disabled={estadoEnvio === 'sending'}
              >
                {estadoEnvio === 'sending' ? 'Enviando…' : 'Enviar solicitud'}
              </button>
              <Link to="/productos" className="btn-secundario">
                Volver a la tienda
              </Link>
            </div>
          </form>

          {estadoEnvio === 'success' && (
            <div className="alerta-success" role="status">
              ¡Gracias! Tu solicitud fue enviada. Te contactaremos muy pronto.
            </div>
          )}

          {estadoEnvio === 'error' && (
            <div className="alerta-error" role="alert">
              No pudimos enviar el formulario en este intento. Intenta
              nuevamente en un momento.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;
