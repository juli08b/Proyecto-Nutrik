import "./Home.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Pages/Cliente/Cart";

import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import hero3 from "../assets/hero3.png";
import comida from "../assets/comida.jpg";

const FALLBACK = comida;

const HEROES = [
  {
    img: hero1,
    kicker: "ALIMENTACIÓN CONSCIENTE",
    titulo: "ALIMENTA TU VIDA",
    titulo2: "DE FORMA NATURAL",
    sub: "Fresco · Natural · Equilibrado",
  },
  {
    img: hero2,
    kicker: "PRODUCTOS FRESCOS",
    titulo: "DIRECTO DEL CAMPO",
    titulo2: "A TU MESA",
    sub: "Calidad · Origen · Bienestar",
  },
  {
    img: hero3,
    kicker: "COMER BIEN ES VIVIR BIEN",
    titulo: "NUTRE TU CUERPO",
    titulo2: "CON LO MEJOR",
    sub: "Sabor · Energía · Salud",
  },
];

const BENEFICIOS = [
  {
    texto: "Productos frescos y de calidad",
    icono: (
      <>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z" />
        <path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12" />
      </>
    ),
  },
  {
    texto: "Envíos a todo el país",
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
    texto: "Pagos seguros y confiables",
    icono: (
      <>
        <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    texto: "Alimentación saludable para tu bienestar",
    icono: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8Z" />
    ),
  },
  {
    texto: "Comprometidos con el medio ambiente",
    icono: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
      </>
    ),
  },
];

const CATEGORIAS = [
  {
    nombre: "Snacks",
    img: "https://i.pinimg.com/1200x/11/5d/d2/115dd21987671c96653e064d0e729ccd.jpg",
  },
  {
    nombre: "Lácteos",
    img: "https://i.pinimg.com/736x/64/10/ad/6410ad6b63996945be07c809559299b4.jpg",
  },
  {
    nombre: "Cereales y granos",
    img: "https://i.pinimg.com/236x/dc/6f/9c/dc6f9ccb19f75c917d6d3bf0fd165af8.jpg",
  },
  {
    nombre: "Vitaminas y bienestar",
    img: "https://i.pinimg.com/1200x/2f/85/a9/2f85a9e19c7e427ebf65d7623e060fe9.jpg",
  },
  {
    nombre: "Suplementos en polvo",
    img: "https://i.pinimg.com/1200x/c4/a1/d5/c4a1d52cb3638dd539bba6d331b794bb.jpg",
  },
  {
    nombre: "Frutos secos y semillas",
    img: "https://i.pinimg.com/736x/2b/49/fb/2b49fb1cbab3746086b4748758254a9a.jpg",
  },
];

const DESTACADOS = [
  {
    id: "wild-mani",
    nombre: "wild protein chocolate con maní",
    peso: "15gr",
    precio: 7900,
    anterior: 9900,
    badge: "Oferta",
    textoBoton: "Comprar",
    img: "https://www.thewildfoods.com.co/cdn/shop/files/CHOCO_CACAHUATE_BARRITA.png?v=1707514803&width=480",
  },
  {
    id: "caramelo",
    nombre: "wild protein chocolate",
    peso: "15gr",
    precio: 7900,
    anterior: 9900,
    badge: "Oferta",
    textoBoton: "Comprar",
    img: "https://www.thewildfoods.com.co/cdn/shop/files/CHOCOLATE_BARRITA.png?v=1707514722&width=840",
  },
  {
    id: "yogur",
    nombre: "frubite Yogur de frutos rojos",
    peso: "220 g",
    precio: 19200,
    anterior: 26900,
    badge: "Oferta",
    textoBoton: "Comprar",
    img: "https://vitaintegral.co/wp-content/uploads/2026/08/1597-Bocadillo-de-frutos-rojos-x220-gr-Frubite-Atras.jpg.jpeg",
  },
  {
    id: "PUROVERDE_SOPA",
    nombre: "Sopa de verduras Puro Verde",
    peso: "400 gr",
    precio: 12900,
    anterior: 15300,
    badge: "Oferta",
    textoBoton: "Comprar",
    img: "https://vitaintegral.co/wp-content/uploads/2026/09/14308-Sopa-de-verduras-x-400gr-Puro-Verde-Frente.jpg-595x693.jpg",
  },
  {
    id: "NOTCO",
    nombre: "Bebida vegetal NOTCO Zero",
    peso: "1 LT",
    precio: 16320,
    anterior: 20400,
    badge: "Oferta",
    textoBoton: "Comprar",
    img: "https://vitaintegral.co/wp-content/uploads/2026/04/13720-Bebida-vegetal-zero-x-1LT-NOTCO-Frente.jpg-595x744.png",
  },
  {
    id: "ES UN BALANCE",
    nombre: "Blondie Arequipe y Chocolate 60gr Es Un Balance",
    peso: "60 g",
    precio: 9900,
    anterior: 12900,
    badge: "Oferta",
    textoBoton: "Comprar",
    img: "https://vitaintegral.co/wp-content/uploads/2026/10/14319-Blondie-Arequipe-y-Chocolate-60gr-Es-Un-Balance-Frente.jpg-595x595.jpeg",
  },
  {
    id: "PUROVERDE_AJIACO",
    nombre: "Ajiaco con pollo 400gr Puro Verde",
    peso: "400 gr",
    precio: 16200,
    anterior: 19900,
    badge: "Oferta",
    textoBoton: "Comprar",
    img: "https://vitaintegral.co/wp-content/uploads/2026/09/14309-Ajiaco-con-pollo-400gr-Puro-Verde-Frente.jpg-595x595.jpg",
  },
  {
    id: "BI-PRO_COOKIES_225",
    nombre: "Whey protein cookies 225gr Radical Nutrition",
    peso: "225 g",
    precio: 18900,
    anterior: 21900,
    badge: "Oferta",
    textoBoton: "Comprar",
    img: "https://vitaintegral.co/wp-content/uploads/2026/09/14280-Whey-protein-cookies-225gr-Radical-Nutrition-Frente.jpg-595x793.jpeg",
  },
  {
    id: "BI-PRO_COOKIES_900",
    nombre: "Whey protein cookies 900gr Radical Nutrition",
    peso: "1 kg",
    precio: 82900,
    anterior: 105900,
    badge: "Oferta",
    textoBoton: "Comprar",
    img: "https://vitaintegral.co/wp-content/uploads/2026/09/14281-Whey-protein-cookies-900gr-Radical-Nutrition-Frente.jpg-595x793.jpeg",
  },

];

const PASOS = [
  {
    titulo: "Elige tus productos",
    texto: "Explora el catálogo y agrega tus favoritos al carrito.",
    icono: (
      <>
        <circle cx="9" cy="21" r="1.6" />
        <circle cx="18" cy="21" r="1.6" />
        <path d="M2 3h3l2.4 12.4a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.6L22 7H6" />
      </>
    ),
  },
  {
    titulo: "Realiza el pago",
    texto: "Paga de forma segura con los métodos que prefieras.",
    icono: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </>
    ),
  },
  {
    titulo: "Recibe en casa",
    texto: "Enviamos a todo el país con empaque responsable.",
    icono: (
      <>
        <path d="M3 9 12 3l9 6v11H3z" />
        <path d="M9 21v-7h6v7" />
      </>
    ),
  },
  {
    titulo: "Disfruta",
    texto: "Aliméntate rico y balanceado cada día. ¡Buen provecho!",
    icono: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <path d="M9 9h.01M15 9h.01" />
      </>
    ),
  },
];

const CONSEJOS = [
  {
    icono: (
      <>
        <path d="M12 2v20" />
        <path d="M4.9 7.1A13.4 13.4 0 0 1 12 5c2.6 0 5.1.7 7.1 2.1" />
        <path d="M4.9 16.9A13.4 13.4 0 0 0 12 19c2.6 0 5.1-.7 7.1-2.1" />
      </>
    ),
    titulo: "Come con color",
    texto:
      "Llena tu plato de frutas y verduras variadas. Cada color aporta vitaminas y antioxidantes distintos que tu cuerpo agradece.",
  },
  {
    icono: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    titulo: "Hidrátate y respeta horarios",
    texto:
      "Beber agua y comer a horas regulares mantiene tu energía estable y ayuda a tu metabolismo a trabajar mejor cada día.",
  },
  {
    icono: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1L12 21l7.7-7.6 1.1-1a5.5 5.5 0 0 0 0-7.8Z" />
    ),
    titulo: "Cuida tu bienestar",
    texto:
      "Una alimentación equilibrada reduce el riesgo de enfermedades y mejora tu ánimo, tu sueño y tu concentración.",
  },
];

const formatoPrecio = (valor) =>
  new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(valor);

function Home() {
  const { agregarProducto, setCarritoAbierto } = useCart();
  const [slide, setSlide] = useState(0);
  const destacadosRef = useRef(null);
  const categoriasRef = useRef(null);

  useEffect(() => {
    const id = setInterval(
      () => setSlide((prev) => (prev + 1) % HEROES.length),
      6500
    );
    return () => clearInterval(id);
  }, []);

  // Auto-scroll infinito del carrusel de categorías
  useEffect(() => {
    const track = categoriasRef.current;
    if (!track) return undefined;

    const paso = () => {
      const tarjeta = track.querySelector(".categoria-card");
      const estilo = getComputedStyle(track);
      const gap = parseFloat(estilo.columnGap || estilo.gap) || 24;
      return tarjeta ? tarjeta.offsetWidth + gap : track.clientWidth * 0.9;
    };

    const id = setInterval(() => {
      const hayScroll = track.scrollWidth - track.clientWidth > 8;
      if (!hayScroll) return;
      const fin = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      if (fin) {
        track.scrollTo({ left: 0, behavior: "auto" });
      } else {
        track.scrollBy({ left: paso(), behavior: "smooth" });
      }
    }, 2800);

    return () => clearInterval(id);
  }, []);

  const hero = HEROES[slide];

  const desplazarDestacados = (direccion) => {
    const track = destacadosRef.current;
    if (!track) return;
    const tarjeta = track.querySelector(".producto-card");
    const paso = tarjeta ? tarjeta.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: direccion * paso, behavior: "smooth" });
  };

  const manejarAgregar = (producto) => {
    agregarProducto({
       ...producto,
       imagen: producto.img,
        precio: producto.precio,
        cantidad: 1 
      });
    setCarritoAbierto(true);
  };

  return (
    <div className="home-nutrik">
      {/* 1 & 2 · HERO CARRUSEL */}
      <section
        className="hero-banner"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(9,32,20,0.62) 0%, rgba(9,32,20,0.74) 55%, rgba(9,32,20,0.86) 100%), url(${hero.img})`,
        }}
      >
        <div className="hero-content" key={slide}>
          <span className="hero-kicker">{hero.kicker}</span>
          <h1 className="hero-titulo">
            <span>{hero.titulo}</span>
            <span>{hero.titulo2}</span>
          </h1>
          <p className="hero-subtitulo">{hero.sub}</p>
          <div className="hero-ctas">
            <Link to="/productos" className="home-cta home-cta--primario">
              EXPLORAR PRODUCTOS
            </Link>
            <Link to="/discount" className="home-cta home-cta--secundario">
              DESCUENTOS
            </Link>
          </div>
        </div>

        <div className="hero-dots" role="tablist" aria-label="Diapositivas">
          {HEROES.map((h, i) => (
            <button
              key={h.titulo}
              type="button"
              role="tab"
              aria-selected={slide === i}
              aria-label={`Ir a la diapositiva ${i + 1}`}
              className={`hero-dot ${slide === i ? "activo" : ""}`}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>

        <span className="hero-copyright">© NUTRIK 2026</span>
      </section>

      {/* 3 · FRANJA DE BENEFICIOS */}
      <section className="features-strip">
        <ul className="features-list">
          {BENEFICIOS.map((item) => (
            <li key={item.texto}>
              <span className="feature-icon">
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
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
              <span className="feature-texto">{item.texto}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 4 · CATEGORÍAS */}
      <section className="home-seccion" id="categorias">
        <div className="seccion-head">
          <div>
            <span className="seccion-kicker">EXPLORA</span>
            <h2>Encuentra lo mejor para ti</h2>
          </div>
          <Link to="/catalog/frozen" className="seccion-ver">
            Ver todas las categorías →
          </Link>
        </div>

        <div className="categorias-track" ref={categoriasRef}>
          {CATEGORIAS.map((cat) => (
            <Link
              to="/catalog/frozen"
              className="categoria-card"
              key={cat.nombre}
            >
              <img
                src={cat.img}
                alt={cat.nombre}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = FALLBACK;
                }}
              />
              <span className="categoria-nombre">{cat.nombre}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4.5 · SOBRE NOSOTROS / CONSEJOS PARA TU DIETA */}
      <section className="home-seccion home-seccion--crema" id="sobre-nosotros">
        <div className="sobre-layout">
          <div className="sobre-intro">
            <span className="seccion-kicker">SOBRE NOSOTROS</span>
            <h2>Comer bien también es cuidarte</h2>
            <p className="sobre-parrafo">
              En Nutrik creemos que la salud no se improvisa: se cultiva día a
              día, bocado a bocado. Por eso seleccionamos alimentos frescos,
              naturales y de origen local, revisando cada producto para que
              llegue a tu mesa con el sabor y los nutrientes intactos.
            </p>
            <p className="sobre-parrafo">
              Más que una tienda, somos tu aliado para armar una dieta
              balanceada sin complicaciones. Te acompañamos con opciones
              accesibles, consejos prácticos y productos pensados para toda la
              familia, para que comer sano sea fácil, rico y sostenible en el
              tiempo.
            </p>

            <ul className="sobre-stats">
              <li>
                <strong>+120</strong>
                <span>productos naturales</span>
              </li>
              <li>
                <strong>100%</strong>
                <span>origen local</span>
              </li>
              <li>
                <strong>4.9★</strong>
                <span>clientes felices</span>
              </li>
            </ul>
          </div>

          <div className="consejos-panel">
            <span className="consejos-panel-titulo">Consejos para tu dieta</span>
            <ul className="consejos-grid">
              {CONSEJOS.map((consejo) => (
                <li className="consejo-card" key={consejo.titulo}>
                  <span className="consejo-icono">
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
                      {consejo.icono}
                    </svg>
                  </span>
                  <div className="consejo-texto">
                    <h3>{consejo.titulo}</h3>
                    <p>{consejo.texto}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5 · PRODUCTOS DESTACADOS */}
      <section className="home-seccion home-seccion--blanca">
        <div className="seccion-head">
          <div>
            <span className="seccion-kicker">OFERTAS ESPECIALES</span>
            <h2>Productos con Descuento</h2>
          </div>
          <div className="destacados-controles">
            <button
              type="button"
              className="destacados-flecha"
              onClick={() => desplazarDestacados(-1)}
              aria-label="Ver productos anteriores"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path
                  d="M15 6l-6 6 6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className="destacados-flecha"
              onClick={() => desplazarDestacados(1)}
              aria-label="Ver siguientes productos"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path
                  d="M9 6l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <Link to="/productos" className="seccion-ver">
              Ver todo el catálogo →
            </Link>
          </div>
        </div>

        <div className="destacados-track" ref={destacadosRef}>
          {DESTACADOS.map((producto) => (
            <article className="producto-card" key={producto.id}>
              <span
                className={`producto-badge producto-badge--${producto.badge
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                {producto.badge}
              </span>
              <div className="producto-media">
                <img
                  src={producto.img}
                  alt={producto.nombre}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK;
                  }}
                />
              </div>
              <div className="producto-info">
                <h3>{producto.nombre}</h3>
                <span className="producto-peso">{producto.peso}</span>
                <div className="producto-precios">
                  <strong className="producto-precio">
                    ${formatoPrecio(producto.precio)}
                  </strong>
                  {producto.anterior ? (
                    <span className="producto-precio-original">
                      ${formatoPrecio(producto.anterior)}
                    </span>
                  ) : null}
                </div>
                <button
                  type="button"
                  className="producto-agregar"
                  onClick={() => manejarAgregar(producto)}
                >
                  AGREGAR
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6 · BANNER RECETAS Y CONSEJOS */}
      <section className="recetas-banner">
        <div className="recetas-overlay" />
        <div className="recetas-contenido">
          <span className="recetas-kicker">RECETAS Y CONSEJOS</span>
          <h2>DISFRUTA DE UNA ALIMENTACIÓN BALANCEADA</h2>
          <p>
            Ideas, recetas e inspiración para comer rico y saludable todos los
            días.
          </p>
          <Link to="/productos" className="recetas-cta">
            VER RECETAS →
          </Link>
        </div>
        <span className="recetas-hoja recetas-hoja--1" aria-hidden="true" />
        <span className="recetas-hoja recetas-hoja--2" aria-hidden="true" />
      </section>

      {/* 7 · CÓMO FUNCIONA */}
      <section className="home-seccion" id="nosotros">
        <div className="seccion-head seccion-head--centrado">
          <div>
            <span className="seccion-kicker">ASÍ DE FÁCIL</span>
            <h2>Tu compra en 4 pasos</h2>
          </div>
        </div>

        <ol className="pasos-grid">
          {PASOS.map((paso, i) => (
            <li className="paso-card" key={paso.titulo}>
              <span className="paso-numero">{i + 1}</span>
              <span className="paso-icono">
                <svg
                  viewBox="0 0 24 24"
                  width="26"
                  height="26"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {paso.icono}
                </svg>
              </span>
              <h3>{paso.titulo}</h3>
              <p>{paso.texto}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

export default Home;
