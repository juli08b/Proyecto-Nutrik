import { Link } from 'react-router-dom';
import './About.css';

import logoNutrick from '../../assets/logoNutrick.png';
import comida from '../../assets/comida.jpg';

const FALLBACK = comida;

const VALORES = [
  {
    icono: '🌿',
    titulo: 'Natural',
    texto: 'Alimentos frescos y sin procesar, directo del campo a tu mesa.',
  },
  {
    icono: '📍',
    titulo: 'Origen local',
    texto: 'Trabajamos con productores de la región y precios justos.',
  },
  {
    icono: '💚',
    titulo: 'Bienestar',
    texto: 'Productos pensados para nutrir tu cuerpo y tu estilo de vida.',
  },
];

function About() {
  return (
    <section className="about-section" id="nosotros">
      <div className="about-hero">
        <span className="about-tag">Conoce Nutrik</span>
        <h1>Alimentarte bien debería sentirse natural.</h1>
        <p>
          Acercamos lo mejor de la naturaleza a tu mesa para que comer bien sea
          fácil, rico y parte de todos los días.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-visual">
          <img
            className="about-logo"
            src={logoNutrick}
            alt="Nutrik"
            onError={(e) => {
              e.currentTarget.src = FALLBACK;
            }}
          />
        </div>

        <div className="about-card">
          <span className="about-kicker">Nuestra esencia</span>
          <h2>¿Qué es Nutrik?</h2>
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

          <Link to="/productos" className="about-cta">
            Explorar productos →
          </Link>
        </div>
      </div>

      <div className="about-valores-section">
        <div className="about-valores-heading">
          <span className="about-kicker">Lo que nos mueve</span>
          <h2>Elegimos con intención</h2>
          <p>Pequeñas decisiones que hacen la diferencia en tu día a día.</p>
        </div>

        <ul className="about-valores">
          {VALORES.map((valor, index) => (
            <li key={valor.titulo}>
              <span className="about-valor-numero">0{index + 1}</span>
              <span className="about-valor-icono" aria-hidden="true">
                {valor.icono}
              </span>
              <div>
                <strong>{valor.titulo}</strong>
                <span>{valor.texto}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default About;
