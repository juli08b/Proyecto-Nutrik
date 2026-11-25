import { Link, useLocation } from "react-router-dom";
import "./Footer.css";

import logoNutrik from "../assets/logoNutrick.png";
import Tiktok from "../assets/Tiktok.jpg";
import Instagram from "../assets/Instagram.jpg";
import Facebook from "../assets/Facebook.jpg";
import Colombia from "../assets/Colombia.jpg";

const CONFIANZA = [
  {
    titulo: "100% Natural",
    icono: (
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Zm0 0c0-3 1.9-5.4 5.1-6" />
    ),
  },
  {
    titulo: "Envío nacional",
    icono: (
      <>
        <path d="M1 6h13v10H1z" />
        <path d="M14 9h4l3 3v4h-7" />
        <circle cx="6" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </>
    ),
  },
  {
    titulo: "Pago seguro",
    icono: (
      <>
        <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    titulo: "Origen local",
    icono: (
      <>
        <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
];

const ENLACES = [
  {
    titulo: "Productos",
    links: [
      { texto: "Catálogo completo", to: "/productos" },
      { texto: "Ofertas", to: "/discount" },
      { texto: "Categorías", to: "/catalog/frozen" },
    ],
  },
  {
    titulo: "Información corporativa",
    links: [
      { texto: "Mi cuenta", to: "/perfil" },
      { texto: "Acceder / Registrarme", to: "/elegir-rol" },
      { texto: "Nuestro catálogo", to: "/productos" },
    ],
  },
];

function Footer() {
  const { pathname } = useLocation();
  const esHome = pathname === "/";

  return (
    <footer className="main-footer">
      {/* FRANJA DE MARCA Y CONFIANZA (ancho completo, fondo verde) — solo en el Home */}
      {esHome && (
        <div className="footer-marca">
        <div className="footer-marca-inner">
          <div className="footer-marca-head">
            <span className="footer-marca-kicker">NUESTRO COMPROMISO</span>
            <h2>¿Por qué elegir Nutrik?</h2>
            <p>
              Más que alimentos, es bienestar. Cada producto que ves aquí pasó
              por nuestras manos antes de llegar a las tuyas.
            </p>
            <p className="footer-marca-parrafo">
              Trabajamos con agricultores y productores locales para
              garantizar frescura, trazabilidad y precios justos. Creemos que
              alimentarse bien no debería ser un lujo ni un rompecabezas:
              nuestro equipo de nutrición curado el catálogo para que
              encuentres justo lo que tu cuerpo necesita, con la tranquilidad
              de saber de dónde viene y cómo se cultivó. Elegir Nutrik es
              elegir sabor real, salud de verdad y un impacto positivo en
              nuestra tierra.
            </p>
          </div>
          <ul className="footer-confianza">
            {CONFIANZA.map((item) => (
              <li key={item.titulo}>
                <span className="confianza-icono">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {item.icono}
                  </svg>
                </span>
                <span>{item.titulo}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      )}

      <div className="footer-cuerpo">
        <div className="footer-container">
        {/* Columna del Logo */}
        <div className="footer-section brand-column">
          <div className="logo-wrapper">
            <img src={logoNutrik} alt="Nutrik Logo" className="footer-logo" />
          </div>
          <p className="tagline">TU SALUD EMPIEZA AQUÍ</p>
        </div>

        {ENLACES.map((columna) => (
          <div className="footer-section" key={columna.titulo}>
            <h3>{columna.titulo}</h3>
            <ul>
              {columna.links.map((enlace) => (
                <li key={enlace.texto}>
                  <Link to={enlace.to}>{enlace.texto}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Columna Redes Sociales */}
        <div className="footer-section socials-column">
          <h3>Síguenos</h3>
          <div className="footer-socials">
            <a
              href="#"
              className="social-icon-link"
              aria-label="Instagram"
            >
              <img src={Instagram} alt="Instagram" />
            </a>
            <a href="#" className="social-icon-link" aria-label="Facebook">
              <img src={Facebook} alt="Facebook" />
            </a>
            <a href="#" className="social-icon-link" aria-label="TikTok">
              <img src={Tiktok} alt="TikTok" />
            </a>
          </div>
        </div>
      </div>

      {/* Barra Inferior */}
      <div className="footer-bottom">
        <p>© 2026 Nutrik. Todos los derechos reservados.</p>
        <div className="developer-tag">
          <span>
            Hecho por <strong>@Nutrik Co</strong>
          </span>
          <img src={Colombia} alt="Colombia" className="flag" />
        </div>
      </div>
      </div>

    </footer>
  );
}
  
export default Footer;