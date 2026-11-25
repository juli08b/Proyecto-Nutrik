import { Link } from 'react-router-dom';
import './About.css';

import logoNutrick from '../../assets/logoNutrick.png';

// Contenido institucional estático para las tarjetas de valores.
const VALORES = [
  {
    icono: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.5 4.5c-6.2.3-10.6 2.5-12.2 6.6-1.4 3.5.7 6.8 4.1 7.2 5.2.6 8-5.1 8.1-13.8Z" />
        <path d="M5 20c2.4-4.7 6-7.8 11-10" />
      </svg>
    ),
    titulo: 'Natural',
    texto: 'Alimentos frescos y sin procesar, directo del campo a tu mesa.',
  },
  {
    icono: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 10c0 5.8-8 11-8 11S4 15.8 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.7" />
      </svg>
    ),
    titulo: 'Origen local',
    texto: 'Trabajamos con productores de la región y precios justos.',
  },
  {
    icono: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.8 4.8a5.4 5.4 0 0 0-7.7 0L12 5.9l-1.1-1.1a5.4 5.4 0 0 0-7.7 7.7l1.1 1.1L12 21l7.7-7.4 1.1-1.1a5.4 5.4 0 0 0 0-7.7Z" />
      </svg>
    ),
    titulo: 'Bienestar',
    texto: 'Productos pensados para nutrir tu cuerpo y tu estilo de vida.',
  },
];

function About() {
  return (
    <main className="about-section" id="nosotros">
      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-hero-inner">
          <div className="about-intro">
            <span className="about-kicker">Conoce Nutrik</span>
            <h1 id="about-title">Alimentarte bien debería sentirse <span>natural.</span></h1>
            <p>
              Acercamos lo mejor de la naturaleza a tu mesa para que comer bien sea
              fácil, rico y parte de todos los días.
            </p>
            <div className="about-actions">
              <Link to="/productos" className="about-cta">Explorar productos <span aria-hidden="true">↗</span></Link>
              <a href="#nuestra-esencia" className="about-cta about-cta-secondary">Conoce Nutrik <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <div className="about-visual">
            <div className="about-logo-circle">
              <img className="about-logo" src={logoNutrick} alt="Nutrik: tu salud empieza aquí" />
            </div>
          </div>
        </div>
      </section>

      <section className="about-story" id="nuestra-esencia" aria-labelledby="about-story-title">
        <div className="about-story-inner">
          <div className="about-story-heading">
            <span className="about-kicker">Nuestra esencia</span>
            <h2 id="about-story-title">¿Qué es Nutrik?</h2>
          </div>
          <div className="about-story-copy">
            <p>
              Somos una tienda de alimentación consciente que acerca lo mejor de
              la naturaleza a tu mesa. Creemos que comer bien es la base de una
              vida plena, por eso seleccionamos productos frescos, naturales y de
              origen local, revisando cada detalle para que llegue a tus manos
              con el sabor y los nutrientes intactos.
            </p>
            <p>
              Más que una tienda, somos tu aliado: te acompañamos con opciones
              accesibles y consejos prácticos para que nutrir tu cuerpo y
              mantener un estilo de vida saludable sea mucho más fácil de
              manejar, todos los días.
            </p>
          </div>
        </div>
      </section>

      <section className="about-valores-section" aria-labelledby="about-values-title">
        <div className="about-valores-inner">
          <div className="about-valores-heading">
            <span className="about-kicker">Lo que nos mueve</span>
            <h2 id="about-values-title">Elegimos con intención</h2>
            <p>Pequeñas decisiones que hacen la diferencia en tu día a día.</p>
          </div>
          <ul className="about-valores">
            {VALORES.map((valor, index) => (
              <li key={valor.titulo}>
                <span className="about-valor-numero">0{index + 1}</span>
                <span className="about-valor-icono" aria-hidden="true">
                  {valor.icono}
                </span>
                <strong>{valor.titulo}</strong>
                <span className="about-valor-texto">{valor.texto}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

export default About;
