import "./Home.css";
import { Link } from "react-router-dom";

// Recibimos la función modificadora desde el padre (App.jsx) para poder abrir el menú desde aquí
function Home({ setMenuAbierto }) {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-texto">

          <h1>
            Alimentación saludable <br />
            <span>sin esfuerzo</span>
          </h1>

          <p className="hero-desc">
            Descubre comidas nutritivas, deliciosas y listas para mejorar tu
            estilo de vida sin complicaciones.
          </p>

          <div className="hero-botones">
            <Link to="/productos" className="btn-primary btn-link">
              Explorar productos
            </Link>
            <Link to="/newproduct" className="btn-outline btn-link">
              Ver planes
            </Link>
          </div>
        </div>

        <div className="hero-img">
          <div className="circulo">
            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600"
              alt="comida saludable"
            />
          </div>

          <div className="card card1">🥑 100% natural</div>
          <div className="card card2">🚚 Entrega segura</div>
          <div className="card card3">💪 Vida saludable</div>
        </div>
      </section>


      {/* estos son los BENEFICIOS */}
      <section className="beneficios">
        <h2>¿Por qué elegirnos?</h2>

        <div className="beneficios-grid">
          <div className="beneficio">
            <h3>🌱 Ingredientes frescos</h3>
            <p>Seleccionamos productos naturales de la mejor calidad.</p>
          </div>

          <div className="beneficio">
            <h3>⚡ Rápido y fácil</h3>
            <p>Compra en minutos y recibe en la puerta de tu casa.</p>
          </div>

          <div className="beneficio">
            <h3>❤️ Cuida tu salud</h3>
            <p>Alimentos diseñados para mejorar tu bienestar diario.</p>
          </div>
        </div>
      </section>


      {/* SECCIÓN LO NUEVO: Showcase de productos destacados del catálogo */}
      <section className="productos">
        <h2>Nuevo</h2>
        <div className="productos-grid">
          {/* Card de Producto: Imagen + Título + Descripción corta */}
          <div className="producto-card">
            <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500" alt="Ensalada Fresh" />
            <h3>Ensalada Fresh</h3>
            <p>Ingredientes naturales y frescos listos para consumir.</p>
            <Link to="/cart">
              <button className="btn-ver-mas">Ver más</button>
            </Link>
          </div>
          <div className="producto-card">
            <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500" alt="Bowl Nutritivo" />
            <h3>Bowl Nutritivo</h3>
            <p>Mezcla balanceada de granos y vegetales para mantener tu energía.</p>
            <Link to="/cart">
              <button className="btn-ver-mas">Ver más</button>
            </Link>
          </div>
          <div className="producto-card">
            <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500" alt="Desayuno Fit" />
            <h3>Desayuno Fit</h3>
            <p>Opciones ligeras y nutritivas para empezar bien el día.</p>
            <Link to="/cart">
              <button className="btn-ver-mas">Ver más</button>
            </Link>
          </div>
        </div>
      </section>

      {/* SECCIÓN PASOS: Proceso de compra simplificado para el usuario */}
      {/* SECCIÓN PASOS */}
      <section className="pasos">

        <div className="pasos-header">
          <span>⚡ Fácil y rápido</span>
          <h2>Compra fácil y saludable</h2>

          <p>
            En pocos pasos podrás encontrar productos saludables
            y recibirlos directamente en tu hogar.
          </p>
        </div>

        <div className="pasos-grid">

          <div className="paso">
            <div className="paso-numero">1</div>

            <h3>Explora el catálogo</h3>

            <p>
              Navega entre nuestras categorías y encuentra
              productos naturales y saludables.
            </p>
          </div>

          <div className="paso">
            <div className="paso-numero">2</div>

            <h3>Llena tu carrito</h3>

            <p>
              Agrega snacks, superalimentos y productos
              favoritos con un solo clic.
            </p>
          </div>

          <div className="paso">
            <div className="paso-numero">3</div>

            <h3>Recibe en casa</h3>

            <p>
              Realiza tu pago seguro y recibe tu pedido
              rápidamente en tu hogar.
            </p>
          </div>

        </div>
      </section>

      {/* SECCIÓN STATS: Indicadores de confianza de la marca */}
      <section className="stats">
        <div className="stat">
          <h2>+500</h2>
          <p>Clientes felices</p>
        </div>
        <div className="stat">
          <h2>+120</h2>
          <p>Productos de catálogo</p>
        </div>
        <div className="stat">
          <h2>24/7</h2>
          <p>Soporte en línea</p>
        </div>
      </section>

      {/* SECCIÓN NEWSLETTER: Captación de correos para marketing */}
      <section className="newsletter">
        <div className="newsletter-content">

          <span className="newsletter-tag">
            🌱 Comunidad saludable
          </span>

          <h2>
            ¿Quieres consejos de salud?
          </h2>

          <p>
            Suscríbete para recibir promociones exclusivas,
            recetas saludables y tips de nutrición.
          </p>

          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Ingresa tu correo electrónico"
            />

            <button className="btn-newsletter">
              Suscribirme
            </button>
          </div>

        </div>
      </section>

      {/* CTA FINAL */}
      <section className="cta">

        <div className="cta-content">

          <span className="cta-tag">
            🌱 Empieza una vida más saludable
          </span>

          <h2>
            Empieza hoy tu cambio
          </h2>

          <p>
            Descubre productos naturales, nutritivos y deliciosos
            que te ayudarán a sentirte mejor cada día.
          </p>

          <div className="cta-botones">
            <button className="btn-primary btn-grande">Comenzar compra</button>
            <button className="btn-outline btn-grande-outline">Ver catálogo</button>
          </div>

        </div>

      </section>
    </>
  );
}

export default Home;