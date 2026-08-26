import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../Product.css";

const productosFrozen = [
  { id: 1, nombre: "Silk - almendra sin azúcar", imagen: "https://i.pinimg.com/1200x/59/7a/da/597ada481273c9ecc7b001456412b3c4.jpg", ruta: "/catalog/frozen/silk-almendra" },
  { id: 2, nombre: "Yogurt Smoothie", imagen: "https://i.pinimg.com/736x/98/f5/df/98f5dff3ee7d44b0d7df193a046eb42e.jpg", ruta: "/catalog/frozen/yogurt-smoothie" },
];

function Frozen() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="productos-section">
      <div className="productos-header">
        <h1>Congelados</h1>
        <p>Descubre nuestra selección de productos congelados saludables y listos para disfrutar.</p>
      </div>

      <div className="productos-grid">
        {productosFrozen.map((producto) => (
          <div className="producto-card" key={producto.id}>
            <img src={producto.imagen} alt={producto.nombre} />
            <div className="producto-info">
              <h3>{producto.nombre}</h3>
              <Link to={producto.ruta}>
                <button className="btn-producto">Ver producto</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Frozen;