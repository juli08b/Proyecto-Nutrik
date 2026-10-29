import { Link, useLocation } from "react-router-dom";
import "./Footer.css";

import logoNutrik from "../assets/logoNutrick.png";
import Tiktok from "../assets/Tiktok.jpg";
import Instagram from "../assets/Instagram.jpg";
import Facebook from "../assets/Facebook.jpg";
import Colombia from "../assets/Colombia.jpg";

const WHATSAPP =
  "https://wa.me/?text=Hola%20Nutrik%2C%20quiero%20informaci%C3%B3n%20sobre%20sus%20productos.";

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
      { texto: "Contáctanos", to: "/contact" },
      { texto: "Mi cuenta", to: "/perfil" },
      { texto: "Acceder / Registrarme", to: "/elegir-rol" },
      { texto: "Nuestro catálogo", to: "/productos" },
    ],
  },
  {
    titulo: "Términos y condiciones",
    links: [
      { texto: "Términos y condiciones", to: "/contact" },
      { texto: "Política de privacidad", to: "/contact" },
      { texto: "Política de envíos", to: "/contact" },
      { texto: "Devoluciones", to: "/contact" },
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

      {/* WHATSAPP FLOTANTE */}
      <a
        className="footer-whatsapp"
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbanos por WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.11.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.2-8.24 8.2Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.13-.56.12-.17.25-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29Z"
          />
        </svg>
        <span>Escríbanos por WhatsApp</span>
      </a>
    </footer>
  );
}

export default Footer;
