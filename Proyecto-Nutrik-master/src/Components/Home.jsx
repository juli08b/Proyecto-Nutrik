import "./Home.css";

function Home() {
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
            <button className="btn-primary">Explorar productos</button>
            <button className="btn-outline">Ver planes</button>
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
          <div className="card card2">🚚 Entrega rápida</div>
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

      {/* CTA FINAL */}
      <section className="cta">
        <h2>Empieza hoy tu cambio</h2>
        <p>Tu cuerpo te lo va a agradecer.</p>

        
        <button className="btn-primary btn-grande">
          Comenzar ahora
        </button>

      </section>
    </>
  );
}

export default Home;

