import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

function Contact() {
  const [estadoEnvio, setEstadoEnvio] = useState('idle');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    setEstadoEnvio('sending');

    try {
      const response = await fetch(
        'https://formsubmit.co/ajax/davidalexanderchangosantacruz@gmail.com',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('No se pudo enviar el formulario.');
      }

      setEstadoEnvio('success');
      form.reset();
      window.setTimeout(() => setEstadoEnvio('idle'), 5000);
    } catch {
      setEstadoEnvio('error');
    }
  };

  return (
    <section className="contacto-section" id="contacto">
      <div className="card-glass">
        <div className="contacto-header">
          <span className="section-tag">Centro de ayuda</span>
          <h2>Atencion al usuario</h2>
          <p>
            Tu opinion nos importa. Escribenos para una queja, reclamo,
            sugerencia o una consulta general.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="pqr-form">
          <input
            type="hidden"
            name="_subject"
            value="Nueva solicitud desde Nutrick"
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
                placeholder="Ej. David Santacruz"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="correo">Correo electronico</label>
              <input
                id="correo"
                name="email"
                type="email"
                placeholder="david@nutrick.com"
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="tipo">Tipo de solicitud</label>
            <select id="tipo" name="tipo_solicitud" required defaultValue="">
              <option value="" disabled>
                Selecciona una opcion...
              </option>
              <option value="queja">Queja o reclamo</option>
              <option value="sugerencia">Sugerencia</option>
              <option value="consulta">Contacto general</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="mensaje">Mensaje detallado</label>
            <textarea
              id="mensaje"
              name="mensaje"
              placeholder="Describe aqui tu situacion con el mayor detalle posible..."
              rows="6"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn-glow"
            disabled={estadoEnvio === 'sending'}
          >
            {estadoEnvio === 'sending' ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        </form>

        {estadoEnvio === 'success' && (
          <div className="alerta-success" role="status">
            Solicitud enviada. Revisa el correo de destino para confirmar
            FormSubmit la primera vez.
          </div>
        )}

        {estadoEnvio === 'error' && (
          <div className="alerta-error" role="alert">
            No pudimos enviar el formulario en este intento. Intenta
            nuevamente en un momento.
          </div>
        )}
      </div>
    </section>
  );
}

export default Contact;
